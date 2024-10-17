import { TableCell, TableRow } from '@/components/ui/table'
import { ColumnDef, Table, flexRender } from '@tanstack/react-table'
import { useState } from 'react'

interface TableRowProps<TData> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
}

const DataTableRow = <TData,>({ table, columns }: TableRowProps<TData>) => {
  const [openForm, setOpenForm] = useState<string | null>(null)

  return (
    <>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            onClick={() => setOpenForm(row.id)}
            className="hover:!bg-muted"
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
    </>
  )
}

export default DataTableRow
