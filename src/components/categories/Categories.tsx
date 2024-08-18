import { Grid, Typography, Button, Card, CardContent } from "@mui/material";
import WidgetCard from "../shared/widgetCard/WidgetCard";
import { Category } from "../../types/types";
import styles from "./Categories.module.less";

type Props = {
  category: Category;
  onAddWidget: () => void;
  searchQuery:string;
};

const Categories = ({ category, onAddWidget,searchQuery }: Props) => {
  const filteredWidgets = category.widgets.filter(
    (widget) =>
      widget.visible &&
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.categoryContainer}>
      <Typography className={styles.categoryName}>{category.name}</Typography>
      <Grid container className={styles.widgets}>
      {filteredWidgets.length > 0 ? (
          filteredWidgets.map((widget) => (
            <Grid item key={widget.id} md={4} xs={12} sm={6} px={1}>
              <WidgetCard widget={widget} categoryId={category.id} />
            </Grid>
          ))
        ) : (
          <Typography className={styles.noWidgetFound}>
          No widgets found for the given search query.
          </Typography>
        )}
        <Grid item md={4} xs={12} sm={6} px={1}>
          <Card className={styles.addWidgetCard} variant="outlined">
            <CardContent className={styles.cardContent}>
              <Button
                onClick={onAddWidget}
                variant="outlined"
                className={styles.noWidget}
              >
                + Add Widget
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;
