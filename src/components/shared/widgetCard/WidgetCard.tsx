import { Card, CardContent, Typography } from "@mui/material";
import { Widgets } from "../../../types/types";
import styles from "./WidgetCard.module.less";
type Props = {
  widget: Widgets;
};

const WidgetCard = (props: Props) => {
  const { widget } = props;
  return (
    <Card className={styles.widgetCard} variant="outlined">
      <CardContent className={styles.cardContent}>
        <Typography variant="body2">{widget.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
