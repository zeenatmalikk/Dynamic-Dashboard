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
  // state to track the currently selected tab (category)
  const [value, setValue] = useState(0);
  // state to track selected widgets for each category
  const [selectedWidgets, setSelectedWidgets] = useState<{
    [categoryId: string]: { [widgetId: string]: boolean };
  }>({});

  // handles the checkbox change for selecting/unselecting widgets

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
  // sets the current tab based on the drawerCategoryIndex prop
  useEffect(() => {
    setValue(drawerCategoryIndex);
  }, [drawerCategoryIndex]);

  // handles the change of tabs
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // confirms the visibility of selected widgets and updates the Redux state
  const handleConfirmVisibility = () => {
    categories.forEach((category) => {
      const categoryId = category.id;
      const updatedWidgets = { ...selectedWidgets[categoryId] };

      Object.keys(updatedWidgets).forEach((widgetId) => {
        const widgetVisible = updatedWidgets[widgetId];
        const currentWidget = category.widgets.find((w) => w.id === widgetId);

        if (currentWidget && currentWidget.visible !== widgetVisible) {
          dispatch(toggleWidgetVisibility({ categoryId, widgetId }));
        }

        updatedWidgets[widgetId] = currentWidget
          ? currentWidget.visible
          : false;
      });

      setSelectedWidgets((prevSelectedWidgets) => ({
        ...prevSelectedWidgets,
        [categoryId]: updatedWidgets,
      }));
    });

    handleCloseDrawer();
  };
  // initialize the selectedWidgets state when the tab  changes

  useEffect(() => {
    const currentCategoryId = categories[value].id;
    if (!selectedWidgets[currentCategoryId]) {
      const initialSelectedWidgets: { [key: string]: boolean } = {};
      categories[value].widgets.forEach((widget) => {
        initialSelectedWidgets[widget.id] = widget.visible;
      });
      setSelectedWidgets((prevSelectedWidgets) => ({
        ...prevSelectedWidgets,
        [currentCategoryId]: initialSelectedWidgets,
      }));
    }
  }, [value, categories]);

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
              {/* Render tabs for each category */}

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
          {/* cancel button to close the drawer without saving changes */}

          <Button
            variant="outlined"
            className={styles.close}
            onClick={handleCloseDrawer}
            sx={{ marginTop: 2 }}
          >
            Cancel
          </Button>
          {/* confirm button to save the selected widgets and close the drawer */}

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
