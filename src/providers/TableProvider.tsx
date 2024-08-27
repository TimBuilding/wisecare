'use client'
import { PaginationState } from '@tanstack/react-table'
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
  pagination: {} as PaginationState,
  setPagination: (() => {}) as Dispatch<SetStateAction<PaginationState>>,
})

const TableProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<string>('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  })

  return (
    <TableContext.Provider
      value={{ filter, setFilter, pagination, setPagination }}
    >
      {children}
    </TableContext.Provider>
  )
}

export default TableProvider
export { useTableContext }
