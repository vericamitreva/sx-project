import { Select } from "antd"
import { searchPersons } from "../../assets/helper"
import styles from "./selectComponent.module.css"
import React, { useEffect, useState } from "react"

const SelectComponent  = () => {
    const [search, setSearch] = useState("")
    const [personsList, setPersonsList] = useState<{ id: string; firstName: string; lastName: string; }[]>([])
    const [page, setPage] = useState(1)
    const [load, setLoad] = useState(true)

    const size: number = 10

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