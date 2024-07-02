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
    onChange: (value: string) => void;
    useQueryFunction: (search: string, page: number) => Promise<Person[]>;
}

export type { Person, SelectComponentProps } 