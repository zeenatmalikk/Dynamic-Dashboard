import { Card, CardContent, Typography } from "@mui/material";
import { Widgets } from "../../../types/types";
import styles from "./WidgetCard.module.less";
import { BarChart, Cancel, Close } from "@mui/icons-material";
import { removeWidget } from "../../../store/WidgetSlice";
import { useDispatch } from "react-redux";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
type Props = {
  widget: Widgets;
  categoryId: string;
};

const WidgetCard = (props: Props) => {
  const { widget, categoryId } = props;
  console.log(widget, "widget");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const dispatch = useDispatch();
  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const renderLegendText = (
    name: string,
    entry: { payload?: { value?: number } }
  ) => {
    const value = entry.payload?.value;
    return `${name} (${value !== undefined ? value : 0})`;
  };

  return (
    <Card className={styles.widgetCard} variant="outlined">
      <CardContent className={styles.cardContent}>
        <Cancel
          className={styles.remove}
          onClick={() => handleRemoveWidget(categoryId, widget.id)}
        />
        <div
          className={
            widget.type !== "chart"
              ? styles.noChartContainer
              : styles.chartContainer
          }
        >
          <Typography variant="body1" className={styles.widgetName}>
            {widget.name}
          </Typography>
          {widget.type !== "chart" && (
            <div className={styles.descContainer}>
              <BarChart className={styles.barChart} />
              <Typography variant="body2" className={styles.widgetDesc}>
                No Graph data available!
              </Typography>
            </div>
          )}
        </div>

        {widget.type === "chart" && widget.chartType === "pie" && (
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={widget.chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40} // Optional: to create a donut chart effect
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={false} // Disable labels completely
              >
                {widget?.chartData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType={"rect"}
                formatter={renderLegendText}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
