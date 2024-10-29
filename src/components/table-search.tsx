'use client'
import { Input } from '@/components/ui/input'
import { Table } from '@tanstack/react-table'
import { Search } from 'lucide-react'

interface TableSearchProps<TData> {
  table: Table<TData>
}

const TableSearch = <TData,>({ table }: TableSearchProps<TData>) => {
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
