import BillingStatementModal from '@/components/billing-statement/billing-statement-modal'
import { TableCell, TableRow } from '@/components/ui/table'
import { Tables } from '@/types/database.types'
import { ColumnDef, Table, flexRender } from '@tanstack/react-table'
import { useState } from 'react'

interface TableRowProps<TData> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
}

const DataTableRow = <TData,>({ table, columns }: TableRowProps<TData>) => {
  const [originalData, setOriginalData] = useState<TData | undefined>(undefined)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleOnClick = (originalData: TData) => {
    setOriginalData(originalData)
    setIsEditModalOpen(true)
  }

  return (
    <>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="cursor-pointer hover:!bg-muted"
            onClick={() => handleOnClick(row.original)}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-16 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
      <BillingStatementModal
        originalData={originalData as TData & Tables<'billing_statements'>}
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
      />
    </>
  )
}

export default DataTableRow
