import { Table, ColumnDef, flexRender } from '@tanstack/react-table'
import { TableCell, TableRow } from '@/components/ui/table'

interface PendingEmployeesRowProps<TData> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
}

const PendingEmployeesRow = <TData,>({
  table,
  columns,
}: PendingEmployeesRowProps<TData>) => {
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

export default PendingEmployeesRow
