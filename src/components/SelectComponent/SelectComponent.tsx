import { Select } from "antd"
import styles from "./selectComponent.module.css"
import React, { useState, useEffect, useCallback } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import type { Person, SelectComponentProps } from "../../assets/types"

/**
 * SelectComponent is a React functional component that renders a searchable Select dropdown.
 * It fetches data from a backend service and supports infinite scrolling to load more data.
 *
 * @prop {boolean} showSearch - Enables the search functionality within the dropdown.
 * @prop {string} placeholder - Placeholder text to be displayed when no option is selected.
 * @prop {string} notFoundContent - Text to be displayed when no results are found.
 * @prop {boolean} filterOption - Boolean used to customize how options are filtered in a searchable dropdown. False will disable the default filtering.
 * @prop {string} className - CSS class to style the Select component.
 * @prop {string} value - The selected value from the dropdown.
 * @prop {function} onChange - Function to handle the selection change.
 * @prop {function} useQueryFunction - Function to fetch the data.
 * @prop {string} searchValue - The debounced search value.
 * @prop {function} setSearch - Function to update the search value.
 * @prop {string} mode - Determines the mode of the Select component. When set to "multiple", it is allowing selection of multiple items.
 * 
 * @example
 * <SelectComponent
 *   showSearch={true}
 *   placeholder="Select a person"
 *   notFoundContent="No results found"
 *   filterOption={false}
 *   className="someClassName"
 *   value={selectedValue}
 *   onChange={handleChange}
 *   useQueryFunction={fetchPersons}
 * />
 */

const SelectComponent: React.FC<SelectComponentProps> = ({
    showSearch,
    placeholder,
    notFoundContent,
    filterOption,
    className,
    value: selectedValue,
    onChange,
    useQueryFunction,
    search,
    setSearch,
    mode
}) => {
    const [value, setValue] = useState(selectedValue)
    const [personsList, setPersonsList] = useState<Person[]>([])
    const size = 10

    const {
        data: persons,
        fetchNextPage,
        isLoading,
        hasNextPage,
        error
    } = useInfiniteQuery<Person[]>({
        queryKey: ["persons", search],
        queryFn: ({ pageParam = 1 }) => useQueryFunction( search, pageParam as number ),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length === size ? allPages.length + 1 : undefined,
        initialPageParam: 1
    })

    useEffect(() => {
        if (persons) {
            const allPersons = persons.pages.flat()
            setPersonsList(allPersons as Person[])
        }
    }, [persons])

    const handleSearch = (value: string) => {
        setSearch(value)

        if (value === "") {
            setValue(undefined)
            onChange("")
        }
    }

    const handleChange = (value: string) => {
        setValue(value)
        onChange(value)
    }

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget

        if (scrollTop + offsetHeight === scrollHeight && hasNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, fetchNextPage])

    useEffect(() => {
        setValue(selectedValue)
    }, [selectedValue])

    return (
        <div className={styles.componentContainer}>
            <Select
                showSearch={showSearch}
                placeholder={placeholder}
                notFoundContent={isLoading ? "Loading..." : notFoundContent}
                onSearch={handleSearch}
                onPopupScroll={handleScroll}
                options={personsList.map((person) => ({
                    value: `${person.firstName} ${person.lastName}`,
                    label: `${person.firstName} ${person.lastName}`,
                }))}
                filterOption={filterOption}
                className={className}
                value={value || undefined}
                onChange={handleChange}
                mode={mode}
            />
            {error && <div>Error fetching data: {error.message}</div>}
        </div>
    )
}

export default SelectComponent
