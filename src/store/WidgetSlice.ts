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
        {
          id: "1",
          name: "Cloud Accounts",
          text: "Overview of cloud accounts with usage distribution.",
          visible: true,
          type: "chart",
          chartType: "pie",
          chartData: [
            { name: "AWS", value: 50 },
            { name: "Azure", value: 30 },
            { name: "Google Cloud", value: 15 },
            { name: "Others", value: 5 },
          ],
        },
        {
          id: "2",
          name: "Cloud Account Risk Assessment",
          text: "Dashboard for detecting potential threats.",
          visible: false,
          type: "chart",
          chartType: "pie",
          chartData: [
            { name: "Low Risk", value: 40 },
            { name: "Medium Risk", value: 30 },
            { name: "High Risk", value: 20 },
            { name: "Critical Risk", value: 10 },
          ],
        },
        {
          id: "3",
          name: "Cloud Resource Inventory",
          text: "Inventory of cloud resources and their usage.",
          visible: false,
        },
        {
          id: "4",
          name: "Policy Violation Summary",
          text: "Summary of policy violations across cloud resources.",
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
          text: "Overview of security measures for workloads.",
          visible: true,
        },
        {
          id: "2",
          name: "Threat Detection Dashboard",
          text: "Dashboard for detecting potential threats.",
          visible: false,
        },
        {
          id: "3",
          name: "Container Security Insights",
          text: "Insights into the security of containers.",
          visible: false,
        },
        {
          id: "4",
          name: "Real-Time Incident Monitoring",
          text: "Monitoring of incidents in real-time.",
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
          text: "Checks for compliance in registry scans.",
          visible: true,
        },
        {
          id: "2",
          name: "Container Image Security",
          text: "Security overview of container images.",
          visible: false,
        },
        {
          id: "3",
          name: "Vulnerability Scan Overview",
          text: "Overview of vulnerabilities found in scans.",
          visible: false,
        },
        {
          id: "4",
          name: "Image Vulnerability Report",
          text: "Detailed report of vulnerabilities in images.",
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
          text: "List of tickets that are high priority.",
          visible: true,
        },
        {
          id: "2",
          name: "Ticket Resolution Time",
          text: "Analysis of time taken to resolve tickets.",
          visible: false,
        },
        {
          id: "3",
          name: "Assigned Tickets Summary",
          text: "Summary of tickets assigned to users.",
          visible: false,
        },
        {
          id: "4",
          name: "Escalated Tickets",
          text: "List of tickets that have been escalated",
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
    removeWidget: (
      state,
      action: PayloadAction<{ categoryId: string; widgetId: string }>
    ) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const widget = category.widgets.find((w) => w.id === widgetId);
        if (widget) {
          widget.visible = false;
        }
      }
    },
  },
});

export const { addWidget, toggleWidgetVisibility, removeWidget } =
  widgetSlice.actions;
export default widgetSlice.reducer;
