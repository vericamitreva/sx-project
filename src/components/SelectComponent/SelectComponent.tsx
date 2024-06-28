import { Select } from "antd"
import { searchPersonsApi } from "../../assets/helper"
import styles from "./selectComponent.module.css"
import React, { useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import Person from "../../assets/types"

/**
 * SelectComponent is a React functional component that renders a searchable Select dropdown.
It fetches data from a backend service and supports infinite scrolling to load more data.
 * @component
 * @example
 *   <SelectComponent/>
 *
 * Select is a component from the Ant Design Library with custom search, scroll handlers and customizable options.
 * @component
 * @prop {boolean} showSearch - Enables the search functionality within the dropdown.
 * @prop {string} placeholder - Placeholder text to be displayed when no option is selected.
 * @prop {string} notFoundContent - Content to display when no results are found.
 * @prop {function} onSearch - Function to handle the search input changes.
 * @prop {function} onPopupScroll - Function to handle the scroll event within the dropdown.
 * @prop {Array<{value: string, label: string}>} options - Array of options to be displayed in the dropdown.
 * @prop {boolean} filterOption - Disables the default filtering to allow custom search handling.
 * @prop {string} className - CSS class to style the Select component.
 * @prop {string} value - The value that is selected.
 * @example
 *   <Select 
        showSearch
        placeholder="Select a person"
        notFoundContent="No results found"
        onSearch={handleSearch}
        onPopupScroll={handleScroll}
        options={personsList.map((person) => ({
            value: `${person.firstName} ${person.lastName}`,
            label: `${person.firstName} ${person.lastName}`,
        }))}
        filterOption={false}
        className={styles.select}
    />
 */

const SelectComponent: React.FC = () => {
    const [search, setSearch] = useState("")

    const size = 10

    const getPersons = async ({ page = 1 }) => {
        const result = await searchPersonsApi(search, page, size)
        return result as Person[]
    }

    const {
        data: persons,
        fetchNextPage,
        hasNextPage,
        error,
    } = useInfiniteQuery<Person[]>({
        queryKey: ["persons", search],
        queryFn: ({ pageParam }) => getPersons({ page: pageParam as number }), 
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length === size ? allPages.length + 1 : undefined,
        initialPageParam: 1
    })

    const personsList = persons?.pages.map((page) => page).reduce((initial, value) => initial.concat(value), []) ?? []


    const handleSearch = (value: string) => {
        setSearch(value)
    }


    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget

        if (scrollTop + offsetHeight === scrollHeight && hasNextPage) {
            fetchNextPage()
        }
    }

    return (
        <div className={styles.componentContainer}>
            <Select
                showSearch
                placeholder="Select a person"
                notFoundContent="No results found"
                onSearch={handleSearch}
                onPopupScroll={handleScroll}
                options={personsList.map((person) => ({
                    value: `${person.firstName} ${person.lastName}`,
                    label: `${person.firstName} ${person.lastName}`,
                }))}
                filterOption={false}
                className={styles.select}
            />
            {error && <div> Error fetching data: {error.message}</div>}
        </div>
    )
}

export default SelectComponent
