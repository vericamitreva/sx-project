import { Node } from "reactflow";
interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

interface CustomNode extends Node<NodeData> {
  id: string;
  data: NodeData;
  position: { x: number; y: number };
  style: object;
  type: string;
}

interface SelectComponentProps {
  showSearch: boolean;
  placeholder: string;
  notFoundContent: string;
  filterOption: boolean;
  className: string;
  value?: string;
  strValue?: string;
  onChange: (value: string) => void;
  useQueryFunction: (search: string, page: number) => Promise<Person[]>;
  search: string;
  setSearch: (value: string) => void;
  mode?: "multiple" | "tags" | undefined;
}

export type TaskType = "task" | "condition"
interface NodeData {
  id: string;
  label: string;
  borderColor: string;
  shape: string;
  taskModule: string;
  startTasks: number[];
  backgroundColor: string;
  taskName: string;
  taskType: TaskType;
  attachmentType: string;
  hasAttachment: boolean;
  timeToCompleteInDays: number;
  taskOrder: number;
  responsibleUser: number[];
  responsibleGroup: number[];
  icon?: any;
}

interface EditComponentProps {
  nodeName: string
  nodeData: NodeData
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  setNodeData: (nodeData: NodeData) => void
}

export type { Person, CustomNode, SelectComponentProps, NodeData, EditComponentProps } 