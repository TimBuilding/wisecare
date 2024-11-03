import { useBillingStatementsRequestContext } from '@/app/(dashboard)/admin/approval-request/billing-statements/billing-statements-request-provider'
import { TableCell, TableRow } from '@/components/ui/table'
import { ColumnDef, Table, flexRender } from '@tanstack/react-table'

interface PendingBillingStatementDataTableRowProps<TData> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
}

const PendingBillingStatementDataTableRow = <TData,>({
  table,
  columns,
}: PendingBillingStatementDataTableRowProps<TData>) => {
  const { setIsModalOpen, setSelectedData } =
    useBillingStatementsRequestContext()

  const handleOnClick = (originalData: TData) => {
    setIsModalOpen(true)
    setSelectedData(originalData)
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
    </>
  )
}

export default PendingBillingStatementDataTableRow
