import styles from "./App.module.css"
import { searchPersonsApi } from "./assets/helper"
import SelectComponent from './components/SelectComponent/SelectComponent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Person } from "./assets/types"
import useDebounce from "./components/SelectComponent/useDebounce"

const queryClient = new QueryClient()

const useQueryFunction = async (search: string, page: number): Promise<Person[]> => {
    const size = 10
    return await searchPersonsApi(search, page, size)
}

function App() {

    const [selectedValue, setSelectedValue] = useState<string>("")
    const [search, setSearch] = useState<string>("")

    const handleChange = (value: string) => {
        setSelectedValue(value)
    }

    const debouncedSearch = useDebounce(search, 500)

    return (
        <QueryClientProvider client={queryClient}>
            <SelectComponent 
                showSearch={true}
                placeholder="Select a person"
                notFoundContent="No results found"
                filterOption={false}
                className={styles.select}
                value={selectedValue} 
                onChange={handleChange} 
                useQueryFunction={useQueryFunction}
                search={debouncedSearch}
                setSearch={setSearch}
                mode="multiple"
            />
        </QueryClientProvider>
    )
}

export default App
