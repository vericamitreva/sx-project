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

export type { Person, SelectComponentProps } 