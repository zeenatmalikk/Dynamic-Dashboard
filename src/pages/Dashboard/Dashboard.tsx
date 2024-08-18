import { Button, Typography, Menu, MenuItem, Divider } from "@mui/material";
import styles from "./Dashboard.module.less";
import {
  ArrowDropDown,
  Loop,
  MoreVert,
  AccessTimeFilled,
} from "@mui/icons-material";
import Categories from "../../components/categories/Categories";
import { useState } from "react";
import WidgetDrawer from "../../components/drawer/WidgetDrawer";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
type Props = {
  searchQuery: string;
};
const Dashboard = ({ searchQuery }: Props) => {
  const categories = useSelector(
    (state: RootState) => state.widgets.categories
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerCategoryIndex, setDrawerCategoryIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAddWidget = (categoryIndex: number) => {
    setDrawerCategoryIndex(categoryIndex);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // filter categories according to search query or show all categories
  const filteredCategories = categories.filter((category) => {
    if (searchQuery) {
      // show category if it has at least one visible widget matching the search query
      return category.widgets.some(
        (widget) =>
          widget.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          widget.visible
      );
    } else {
      // show category regardless of widget visibility if no search query
      return true;
    }
  });

  return (
    <div className={styles.dashboard}>
      <header className={styles.headerContainer}>
        <Typography className={styles.heading}>CNAPP Dashboard</Typography>
        <div className={styles.headerCta}>
          <Button
            className={styles.addWidget}
            disableRipple
            onClick={() => handleAddWidget(0)}
          >
            Add Widget +
          </Button>{" "}
          {/* Static Buttons */}
          <Button className={styles.iconBtn}>
            <Loop />
          </Button>
          <Button className={styles.iconBtn}>
            <MoreVert />
          </Button>
          <Button
            variant="outlined"
            startIcon={<AccessTimeFilled className={styles.clock} />}
            endIcon={<ArrowDropDown />}
            onClick={handleClick}
            className={styles.dropdown}
          >
            <Divider
              orientation="vertical"
              flexItem
              className={styles.divider}
            />{" "}
            Last 2 days
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
            <MenuItem onClick={handleClose}>Last 14 days</MenuItem>
            <MenuItem onClick={handleClose}>Last 30 days</MenuItem>
          </Menu>
          {/* Static Buttons */}
        </div>
      </header>
      {/* Filtered List */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category, index) => (
          <Categories
            key={category.id}
            category={category}
            onAddWidget={() => handleAddWidget(index)}
            searchQuery={searchQuery}
          />
        ))
      ) : (
        // If no widget name matches the search query
        <Typography className={styles.noWidgetFound}>
          No widgets found for the given search query.
        </Typography>
      )}
      {/* Drawer to handle the widgets dynamically */}
      <WidgetDrawer
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        drawerCategoryIndex={drawerCategoryIndex}
      />
    </div>
  );
};

export default Dashboard;
