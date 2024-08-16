export type Widgets = {
  id: string;
  
  name: string;
  text: string;
  visible: boolean;
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
