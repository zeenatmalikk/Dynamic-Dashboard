import {
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Typography,
} from "@mui/material";
import { Widgets } from "../../../types/types";
import styles from "./WidgetCard.module.less";
import { BarChart, Delete, MoreVert } from "@mui/icons-material";
import { removeWidget } from "../../../store/WidgetSlice";
import { useDispatch } from "react-redux";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useState } from "react";
type Props = {
  widget: Widgets;
  categoryId: string;
};

const WidgetCard = (props: Props) => {
  const { widget, categoryId } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  console.log(widget, "widget");
  // colors used for the segments in the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const dispatch = useDispatch();
  // function to handle the removal of a widget
  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    // dispatches an action to remove the widget from the specified category
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  // function to format the text in the pie chart legend

  const renderLegendText = (
    name: string,
    entry: { payload?: { value?: number } }
  ) => {
    // displays the name of the data along with its value (defaults to 0 if not available)

    const value = entry.payload?.value;
    return `${name} (${value !== undefined ? value : 0})`;
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "widget-action-popover" : undefined;

  return (
    <Card className={styles.widgetCard} variant="outlined">
      <CardContent className={styles.cardContent}>
        {/* button to remove the widget */}

        <div className={styles.remove}>
          <IconButton onClick={handleClick} size="small">
            <MoreVert />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <List>
              <ListItem
                onClick={() => handleRemoveWidget(categoryId, widget.id)}
              >
                <ListItemButton
                  className={styles.removeBtn}
                  disableRipple
                  disableTouchRipple
                  sx={{color:'red',fontWeight:600,padding:'0.5rem 1rem'}}
                >
               <Delete/>   Delete
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </div>
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
          {/* if the widget is not a chart, display a placeholder message */}

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
                innerRadius={40} 
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={false} 
              >
                {widget?.chartData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {/* legend to display the names and values of each pie segment */}

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
