import { Select } from "antd"
import { searchPersons } from "../../assets/helper"
import styles from "./selectComponent.module.css"
import React, { useEffect, useState } from "react"

/**
 * SelectComponent is a React functional component that renders a searchable Select dropdown.
It fetches data from a backend service and supports infinite scrolling to load more data.
 
 * @component
 * @example
 *   <SelectComponent/>

 * Person interface representing the structure of a person object.
 * @type {Object} Person
 * @property {string} id - Unique identifier for the person.
 * @property {string} firstName - First name of the person.
 * @property {string} lastName - Last name of the person.

 * Select is a component from the Ant Design Library with custom search and scroll handlers, and customizable options.

 * @component
 * @prop {boolean} showSearch - Enables the search functionality within the dropdown.
 * @prop {string} placeholder - Placeholder text to be displayed when no option is selected.
 * @prop {string} notFoundContent - Content to display when no results are found.
 * @prop {function} onSearch - Function to handle the search input changes.
 * @prop {function} onPopupScroll - Function to handle the scroll event within the dropdown.
 * @prop {Array<{value: string, label: string}>} options - Array of options to be displayed in the dropdown.
 * @prop {boolean} filterOption - Disables the default filtering to allow custom search handling.
 * @prop {string} className - CSS class to style the Select component.
 * @example 
 * <Select
        showSearch
        placeholder="Select a person"
        notFoundContent="No results found"
        onSearch={handleSearch}
        onPopupScroll={handleScroll}
        options={personsList.map((person)=> ({
            value: `${person.firstName} ${person.lastName}`,
            label: `${person.firstName} ${person.lastName}`
        }))}
        filterOption={false}
        className={styles.select}
    />
 */

const SelectComponent  = () => {
    const [search, setSearch] = useState("")
    const [personsList, setPersonsList] = useState<Person[]>([])
    const [page, setPage] = useState(1)
    const [load, setLoad] = useState(true)

    const size = 10
    interface Person {
        id: string
        firstName: string
        lastName: string
    }

    useEffect(() => {
        const fetchPersonsData = async () => {
            try {
                const result = await searchPersons(search, page, size)
                setPersonsList((prev) => (page === 1 ? result : [...prev, ...result])) 
                setLoad(result.length === size)
            } catch (error) {
                console.error("Error fetching the persons data:", error)
            }
        }
    
        fetchPersonsData()

    }, [search, page])

    const handleSearch = (value: string) => {
        setSearch(value)
        setPage(1)
        setPersonsList([])
        setLoad(true)
    }

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget

        if (scrollTop + offsetHeight === scrollHeight && load) {
            setPage((prev) => prev + 1)
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
                options={personsList.map((person)=> ({
                    value: `${person.firstName} ${person.lastName}`,
                    label: `${person.firstName} ${person.lastName}`
                }))}
                filterOption={false}
                className={styles.select}
            />
        </div>
    )
}

export default SelectComponent