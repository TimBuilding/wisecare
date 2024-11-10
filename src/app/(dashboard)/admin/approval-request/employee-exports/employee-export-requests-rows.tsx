import React from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { ColumnDef, flexRender, Table } from '@tanstack/react-table'

interface EmployeeExportRequestsRowsProps<TData> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
}

const EmployeeExportRequestsRows = <TData,>({
  table,
  columns,
}: EmployeeExportRequestsRowsProps<TData>) => {
  return (
    <>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="cursor-pointer hover:!bg-muted"
            // onClick={() => handleOnClick(row.original)}
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

export default EmployeeExportRequestsRows
