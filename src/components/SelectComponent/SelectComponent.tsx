import { Select } from "antd"
import styles from "./selectComponent.module.css"
import React, { useState, useEffect, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
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
    const [page, setPage] = useState(1)
    const [personsList, setPersonsList] = useState<Person[]>([])
    const [hasMore, setHasMore] = useState(true)

    const {
        data: persons,
        isLoading,
        error,
        refetch
    } = useQuery<Person[]>({
        queryKey: ["persons", search, page],
        queryFn: () => useQueryFunction(search, page),
        placeholderData: [],
        enabled: !!search 
    })

    useEffect(() => {
        if (persons) {
            setPersonsList(prevPersons => {
                if (page === 1) {
                    return persons 
                } else {
                    return [...prevPersons, ...persons]
                }
            })
            setHasMore(persons.length === 10)
        }
    }, [persons, page])

    const handleSearch = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    const handleChange = (value: string) => {
        setValue(value)
        onChange(value)
    }

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget

        if (scrollTop + offsetHeight === scrollHeight && hasMore) {
            setPage(prevPage => prevPage + 1)
        }
    }, [hasMore])

    useEffect(() => {
        setValue(selectedValue)
    }, [selectedValue])

    useEffect(() => {
        refetch()
    }, [page])

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
