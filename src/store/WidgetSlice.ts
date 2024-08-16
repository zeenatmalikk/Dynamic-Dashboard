import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Widgets, Category } from "../types/types";

type WidgetState = {
  categories: Category[];
};

const initialState: WidgetState = {
  categories: [
    {
      id: "c1",
      title: "CSPM",
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: "1", name: "Cloud Accounts", text: "", visible: true },
        {
          id: "2",
          name: "Cloud Account Risk Assessment",
          text: "",
          visible: false,
        },
        {
          id: "3",
          name: "Cloud Resource Inventory",
          text: "",
          visible: false,
        },
        {
          id: "4",
          name: "Policy Violation Summary",
          text: "",
          visible: false,
        },
      ],
    },
    {
      id: "c2",
      title: "CWPP",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "1",
          name: "Workload Security Overview",
          text: "",
          visible: true,
        },
        {
          id: "2",
          name: "Threat Detection Dashboard",
          text: "",
          visible: false,
        },
        {
          id: "3",
          name: "Container Security Insights",
          text: "",
          visible: false,
        },
        {
          id: "4",
          name: "Real-Time Incident Monitoring",
          text: "",
          visible: false,
        },
      ],
    },
    {
      id: "c3",
      title: "Image",
      name: "Registry Scan",
      widgets: [
        {
          id: "1",
          name: "Registry Compliance Check",
          text: "",
          visible: true,
        },
        {
          id: "2",
          name: "Container Image Security",
          text: "",
          visible: false,
        },
        {
          id: "3",
          name: "Vulnerability Scan Overview",
          text: "",
          visible: false,
        },
        {
          id: "4",
          name: "Image Vulnerability Report",
          text: "",
          visible: false,
        },
      ],
    },
    {
      id: "c4",
      title: "tickets",
      name: "Tickets",
      widgets: [
        {
          id: "1",
          name: "High-Priority Tickets",
          text: "",
          visible: true,
        },
        {
          id: "2",
          name: "Ticket Resolution Time",
          text: "",
          visible: false,
        },
        {
          id: "3",
          name: "Assigned Tickets Summary",
          text: "",
          visible: false,
        },
        {
          id: "4",
          name: "Escalated Tickets",
          text: "",
          visible: false,
        },
      ],
    },
  ],
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (
      state,
      action: PayloadAction<{ categoryId: string; widget: Widgets }>
    ) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    toggleWidgetVisibility: (
      state,
      action: PayloadAction<{ categoryId: string; widgetId: string }>
    ) => {
      const category = state.categories.find(
        (cat) => cat.id === action.payload.categoryId
      );
      if (category) {
        const widget = category.widgets.find(
          (w) => w.id === action.payload.widgetId
        );
        if (widget) {
          widget.visible = !widget.visible;
        }
      }
    },
  },
});

export const { addWidget, toggleWidgetVisibility } = widgetSlice.actions;
export default widgetSlice.reducer;
