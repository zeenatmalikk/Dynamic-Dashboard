import { Button, Typography } from "@mui/material";
import styles from "./Dashboard.module.less";
import { Loop, MoreVert } from "@mui/icons-material";
import Categories from "../../components/categories/Categories";
import { useState } from "react";
import WidgetDrawer from "../../components/drawer/WidgetDrawer";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
type Props = {
  searchQuery: string; // Add searchQuery prop
};
const Dashboard = ({ searchQuery }: Props) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [drawerCategoryIndex, setDrawerCategoryIndex] = useState(0);

  const handleAddWidget = (categoryIndex: number) => {
    setDrawerCategoryIndex(categoryIndex);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const categories = useSelector(
    (state: RootState) => state.widgets.categories
  );
  const filteredCategories = categories.filter((category) => {
    if (searchQuery) {
      // Show category if it has at least one visible widget matching the search query
      return category.widgets.some(
        (widget) =>
          widget.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          widget.visible
      );
    } else {
      // Show category regardless of widget visibility if no search query
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
          <Button className={styles.iconBtn}>
            <Loop />
          </Button>
          <Button className={styles.iconBtn}>
            <MoreVert />
          </Button>
        </div>
      </header>
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category, index) => (
          <Categories
            key={category.id}
            category={category}
            onAddWidget={() => handleAddWidget(index)}
          />
        ))
      ) : (
        <Typography className={styles.noWidgetFound}>
          No widgets found for the given search query.
        </Typography>
      )}

      <WidgetDrawer
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        drawerCategoryIndex={drawerCategoryIndex}
      />
    </div>
  );
};

export default Dashboard;
