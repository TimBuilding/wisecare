'use client'
import { Input } from '@/components/ui/input'
import { useTableContext } from '@/providers/TableProvider'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { useDebounceValue } from 'usehooks-ts'

const TableSearch = () => {
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
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default TableSearch
