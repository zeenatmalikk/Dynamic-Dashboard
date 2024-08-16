import {
  Box,
  Drawer,
  Tab,
  Tabs,
  Typography,
  TextField,
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
import { RootState } from "../../store/store"; // Adjust the import according to your project structure
import { addWidget, toggleWidgetVisibility } from "../../store/WidgetSlice"; // Adjust the import according to your project structure
import { Category, Widgets } from "../../types/types";
type Props = {
  openDrawer: boolean;
  handleCloseDrawer: () => void;
  drawerCategoryIndex: number;
};
const WidgetDrawer = (props: Props) => {
  const { openDrawer, handleCloseDrawer, drawerCategoryIndex } = props;
  const [value, setValue] = useState(0);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.widgets.categories
  );
  useEffect(() => {
    setValue(drawerCategoryIndex);
  }, [drawerCategoryIndex]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const handleAddWidget = () => {
  //   const newWidget: Widgets = {
  //     id: `w${Date.now()}`, // Unique ID for the widget
  //     name: widgetName,
  //     text: widgetText,
  //     type: categories[value].title.toLowerCase(),
  //     visible: true, // Add a visibility flag
  //   };
  //   dispatch(
  //     addWidget({ categoryId: categories[value].id, widget: newWidget })
  //   );
  //   setWidgetName("");
  //   setWidgetText("");
  // };

  const handleToggleVisibility = (categoryId: string, widgetId: string) => {
    dispatch(toggleWidgetVisibility({ categoryId, widgetId }));
  };

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
          {/* <div className={styles.tabContent}>
          <TextField
            label="Widget Title"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Widget Text"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ marginTop: 2 }}
          />
          <Button variant="contained" onClick={handleAddWidget} sx={{ marginTop: 2 }}>
            Add Widget
          </Button>
        </div> */}
          {/* <Typography variant="h6">Existing Widgets</Typography> */}
          <List className={styles.widgetList}>
            {categories[value].widgets.map((widget) => (
               <ListItem key={widget.id} className={styles.widgetItem}>
               <ListItemButton
               className={styles.widgetBtn}
               disableTouchRipple
               disableRipple
               disableGutters
                 onClick={() =>
                   handleToggleVisibility(categories[value].id, widget.id)
                 }
               >
                 <Checkbox
                   checked={widget.visible}
                   onChange={() =>
                     handleToggleVisibility(categories[value].id, widget.id)
                   }
                 />
                 <Typography>{widget.name}</Typography>
               </ListItemButton>
             </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </Drawer>
  );
};

export default WidgetDrawer;
