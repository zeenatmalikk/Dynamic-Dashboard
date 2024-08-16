import { Button, Typography } from "@mui/material";
import styles from "./Dashboard.module.less";
import { Loop, MoreVert } from "@mui/icons-material";
import Categories from "../../components/categories/Categories";
import { useState } from "react";
import WidgetDrawer from "../../components/drawer/WidgetDrawer";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
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
      {categories.map((category, index) => (
        <Categories
          key={category.id}
          category={category}
          onAddWidget={() => handleAddWidget(index)}
        />
      ))}

      <WidgetDrawer
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        drawerCategoryIndex={drawerCategoryIndex}
      />
    </div>
  );
};

export default Dashboard;
