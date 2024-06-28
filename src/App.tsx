import './App.css'
import SelectComponent from './components/SelectComponent/SelectComponent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <SelectComponent/>
    </QueryClientProvider>
  )
}

export default App
