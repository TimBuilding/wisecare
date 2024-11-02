import { useApprovalRequestContext } from '@/app/(dashboard)/admin/approval-request/accounts/approval-request-provider'
import { TableCell, TableRow } from '@/components/ui/table'
import { Tables } from '@/types/database.types'
import { ColumnDef, Table, flexRender } from '@tanstack/react-table'
import { useState } from 'react'

interface ApprovalRequestDataTableRowProps<TData> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
}

const ApprovalRequestDataTableRow = <TData,>({
  table,
  columns,
}: ApprovalRequestDataTableRowProps<TData>) => {
  const { setIsModalOpen, setSelectedData } = useApprovalRequestContext()

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

export default ApprovalRequestDataTableRow
