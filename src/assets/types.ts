import { Node, Position } from "reactflow";
interface Person {
  id: string;
  firstName: string;
  lastName: string;
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
  icon?: React.ReactNode
}
interface CustomNode extends Node {
  id: string;
  data: NodeData;
  position: { x: number; y: number };
  style: object;
  type: string;
  sourcePosition?: Position | undefined
  targetPosition?: Position | undefined
  height?: number
  width?: number
  selected?: boolean

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

interface EditComponentProps {
  nodeName: string
  nodeData: NodeData
  nodes: Node[]
  setNodes: (update: (prev: Node[]) => Node[]) => void
  setNodeData: (update: (prev: NodeData) => NodeData) => void
  selectedNodeId: string
}

export type { Person, CustomNode, SelectComponentProps, NodeData, EditComponentProps } 