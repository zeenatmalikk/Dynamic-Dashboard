import {
  Box,
  Drawer,
  Tab,
  Tabs,
  Typography,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
} from "@mui/material";
import styles from "./WidgetDrawer.module.less";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleWidgetVisibility } from "../../store/WidgetSlice";

type Props = {
  openDrawer: boolean;
  handleCloseDrawer: () => void;
  drawerCategoryIndex: number;
};

const WidgetDrawer = (props: Props) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.widgets.categories
  );
  const { openDrawer, handleCloseDrawer, drawerCategoryIndex } = props;
  const [value, setValue] = useState(0);
  const [selectedWidgets, setSelectedWidgets] = useState<{
    [categoryId: string]: { [widgetId: string]: boolean };
  }>({});

  const handleCheckboxChange = (
    categoryId: string,
    widgetId: string,
    checked: boolean
  ) => {

    setSelectedWidgets((prevSelectedWidgets) => ({
      ...prevSelectedWidgets,
      [categoryId]: {
        ...prevSelectedWidgets[categoryId],
        [widgetId]: checked,
      },
    }));
  };

  useEffect(() => {
    setValue(drawerCategoryIndex);
  }, [drawerCategoryIndex]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleConfirmVisibility = () => {
    categories.forEach((category) => {
      const categoryId = category.id;
      const updatedWidgets = selectedWidgets[categoryId] || {};

      Object.keys(updatedWidgets).forEach((widgetId) => {
        const widgetVisible = updatedWidgets[widgetId];
        const currentWidget = category.widgets.find((w) => w.id === widgetId);

        if (currentWidget && currentWidget.visible !== widgetVisible) {
          dispatch(toggleWidgetVisibility({ categoryId, widgetId }));
        }
      });
    });

    handleCloseDrawer();
  };

  const handleCancel = () => {
    // Reset selectedWidgets state to reflect the visibility in Redux
    const initialSelectedWidgets: {
      [categoryId: string]: { [widgetId: string]: boolean };
    } = {};

    categories.forEach((category) => {
      const categoryId = category.id;
      const widgetsVisibility: { [widgetId: string]: boolean } = {};
      category.widgets.forEach((widget) => {
        widgetsVisibility[widget.id] = widget.visible;
      });
      initialSelectedWidgets[categoryId] = widgetsVisibility;
    });

    setSelectedWidgets(initialSelectedWidgets);
    handleCloseDrawer();
  };

  useEffect(() => {
    if (openDrawer) {
      // Initialize `selectedWidgets` state when the drawer opens
      const initialSelectedWidgets: {
        [categoryId: string]: { [widgetId: string]: boolean };
      } = {};

      categories.forEach((category) => {
        const categoryId = category.id;
        const widgetsVisibility: { [widgetId: string]: boolean } = {};
        category.widgets.forEach((widget) => {
          widgetsVisibility[widget.id] = widget.visible;
        });
        initialSelectedWidgets[categoryId] = widgetsVisibility;
      });

      setSelectedWidgets(initialSelectedWidgets);
    }
  }, [openDrawer, categories]);

  return (
    <Drawer anchor={"right"} open={openDrawer} onClose={handleCloseDrawer}>
      <div className={styles.addWidgetDrawer}>
        <div className={styles.heading}>
          <Typography variant="body1">Add Widget</Typography>
          <Close onClick={handleCloseDrawer} />
        </div>
        <Typography variant="body2" className={styles.info}>
          Personalize your dashboard by adding the following widgets
        </Typography>
        <Box sx={{ width: "100%" }}>
          <div className={styles.tabWrapper}>
            <Tabs
              className={styles.tabContainer}
              value={value}
              onChange={handleChange}
              aria-label="widget categories"
            >
              {categories.map((category, index) => (
                <Tab
                  className={styles.categoryLabel}
                  key={category.id}
                  disableRipple
                  label={category.title}
                />
              ))}
            </Tabs>
          </div>
          <List className={styles.widgetList}>
            {categories[value].widgets.map((widget) => (
              <ListItem key={widget.id} className={styles.widgetItem}>
                <ListItemButton
                  className={styles.widgetBtn}
                  disableTouchRipple
                  disableRipple
                  disableGutters
                  onClick={() =>
                    handleCheckboxChange(
                      categories[value].id,
                      widget.id,
                      !selectedWidgets[categories[value].id]?.[widget.id]
                    )
                  }
                >
                  <Checkbox
                    checked={
                      selectedWidgets[categories[value].id]?.[widget.id] ||
                      false
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        categories[value].id,
                        widget.id,
                        e.target.checked
                      )
                    }
                  />
                  <Typography>{widget.name}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <div className={styles.btnGroup}>
          <Button
            variant="outlined"
            className={styles.close}
            onClick={handleCancel}
            sx={{ marginTop: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className={styles.confirm}
            onClick={handleConfirmVisibility}
            sx={{ marginTop: 2 }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default WidgetDrawer;
