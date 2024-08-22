interface Person {
    id: string;
    firstName: string;
    lastName: string;
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
interface NodeData {
  label: string
  borderColor: string
  shape: string
}

interface EditComponentProps {
  nodeName: string;
  nodeData: NodeData;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  setNodeData: (nodeData: NodeData) => void
}


export type { Person, SelectComponentProps, NodeData, EditComponentProps } 