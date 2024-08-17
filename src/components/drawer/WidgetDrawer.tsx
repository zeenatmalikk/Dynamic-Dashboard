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
  const { openDrawer, handleCloseDrawer, drawerCategoryIndex } = props;
  const [value, setValue] = useState(0);
  const [selectedWidgets, setSelectedWidgets] = useState<{
    [key: string]: boolean;
  }>({});

  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.widgets.categories
  );
  const handleCheckboxChange = (widgetId: string, checked: boolean) => {
    setSelectedWidgets((prevSelectedWidgets) => ({
      ...prevSelectedWidgets,
      [widgetId]: checked,
    }));
  };

  useEffect(() => {
    setValue(drawerCategoryIndex);
  }, [drawerCategoryIndex]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleConfirmVisibility = (categoryId: string) => {
    Object.keys(selectedWidgets).forEach((widgetId) => {
      const widgetVisible = selectedWidgets[widgetId];
      const currentWidget = categories[value].widgets.find(
        (w) => w.id === widgetId
      );

      if (currentWidget && currentWidget.visible !== widgetVisible) {
        dispatch(toggleWidgetVisibility({ categoryId, widgetId }));
      }
    });
  };
  useEffect(() => {
    const initialSelectedWidgets: { [key: string]: boolean } = {};
    categories[value].widgets.forEach((widget) => {
      initialSelectedWidgets[widget.id] = widget.visible;
    });
    setSelectedWidgets(initialSelectedWidgets);
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
                    handleCheckboxChange(widget.id, !selectedWidgets[widget.id])
                  }
                >
                  <Checkbox
                    checked={selectedWidgets[widget.id] || false}
                    onChange={(e) =>
                      handleCheckboxChange(widget.id, e.target.checked)
                    }
                  />
                  <Typography>{widget.name}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Button
          variant="contained"
          onClick={() => handleConfirmVisibility(categories[value].id)}
          sx={{ marginTop: 2 }}
        >
          Confirm
        </Button>
      </div>
    </Drawer>
  );
};

export default WidgetDrawer;
