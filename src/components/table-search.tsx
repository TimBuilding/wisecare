'use client'
import { Input } from '@/components/ui/input'
import { useTableContext } from '@/providers/TableProvider'
import { Table } from '@tanstack/react-table'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { useDebounceValue } from 'usehooks-ts'

interface TableSearchProps<TData> {
  table: Table<TData>
}

const TableSearch = <TData,>({ table }: TableSearchProps<TData>) => {
  const [debouncedValue, setValue] = useDebounceValue('', 300)
  const { setFilter } = useTableContext()

  useEffect(() => {
    setFilter(debouncedValue)
  }, [debouncedValue, setFilter])

  return (
    <div className="relative">
      <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-[#94a3b8]" />
      <Input
        className="max-w-xs rounded-full pl-10"
        placeholder="Search accounts"
        value={table.getState().globalFilter}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
      />
    </div>
  )
}

export default TableSearch
