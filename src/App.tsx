// import styles from "./App.module.css"
// import { fetchPersonById, searchPersonsApi } from "./assets/helper"
// import SelectComponent from './components/SelectComponent/SelectComponent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { useState } from 'react'
// import { Person } from "./assets/types"
// import useDebounce from "./assets/useDebounce"
import FlowComponent from './components/FlowComponent/FlowComponent'

const queryClient = new QueryClient()

// const useQueryFunction = async (search: string, page: number, id?: string): Promise<Person[]> => {
//     const size = 10

//     if (id) {
//         const person = await fetchPersonById(id)
//         return person ? [person] : []
//     }

//     return await searchPersonsApi(search, page, size)
// }

function App() {

    // const [selectedValue, setSelectedValue] = useState<string>("")
    // const [search, setSearch] = useState<string>("")

    // const handleChange = (value: string) => {
    //     setSelectedValue(value)
    // }

    // const debouncedSearch = useDebounce(search, 500)

    return (
        <>
            <QueryClientProvider client={queryClient}>
                    {/* <SelectComponent 
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
                    /> */}
                <div style={{height: "100%", width: "100%", position: "relative"}}>
                <FlowComponent/>
                </div>
            </QueryClientProvider>
        </>
    )
}

export default App
