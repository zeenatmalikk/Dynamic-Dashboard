export type ChartData = {
  name: string;
  value: number;
};
export type Widgets = {
  id: string;

  name: string;
  text: string;
  visible: boolean;
  type?: string;
  chartType?: string;
  chartData?: ChartData[];
};
export type Category = {
  id: string;
  title: string;
  name: string;
  widgets: Widgets[];
};

//Tab Props
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
