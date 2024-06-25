import { useEffect, useState } from "react"
import { searchPersons } from "../../assets/helper"
import styles from "./searchComponent.module.css"
import { Input } from "antd"
import persons from '../../assets/data/personsData.json'

const SearchComponent  = () => {
    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState<Person[]>(persons)
    const [page, setPage] = useState(1)
    const [load, setLoad] = useState(true)

    interface Person {
        id: string
        firstName: string
        lastName: string
    }

    useEffect(() => {
        const results = searchPersons(search, page, 10)
        setFiltered(prev => (page === 1 ? results : [...prev, ...results])) 
        setLoad(results.length === 10)
    }, [search, page])

    const onInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
        if (scrollTop + clientHeight == scrollHeight && load) {
            setPage((prev) => prev + 1)
            console.log("page:", (page + 1), "size:", ((page + 1) * 10))
        }
    }


    return (
        <div className={styles.componentContainer}>
            <Input className={styles.input} placeholder="Search for a person.." onInput={onInput} value={search}/>
            <div className={styles.cardsContainerWrapper} onScroll={onScroll}>
                <div className={styles.cardsContainer}>
                    {filtered.length === 0 ? (
                        <div className={styles.noResults}>No results found...</div>
                    ) : (
                        filtered.map((person) => (
                            <div key={person.id} className={styles.cardContainer}>
                                <div>First Name: {person.firstName}</div>
                                <div>Last Name: {person.lastName}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            
        </div>
    )
}

export default SearchComponent