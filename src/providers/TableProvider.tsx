'use client'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider')
  }
  return context
}

const TableContext = createContext({
  filter: '',
  setFilter: (() => {}) as Dispatch<SetStateAction<string>>,
})

const TableProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<string>('')

  return (
    <TableContext.Provider value={{ filter, setFilter }}>
      {children}
    </TableContext.Provider>
  )
}

export default TableProvider
export { useTableContext }
