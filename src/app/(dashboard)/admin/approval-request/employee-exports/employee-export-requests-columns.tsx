import React from 'react'
import TableHeader from '@/components/table-header'
import { Tables } from '@/types/database.types'
import { ColumnDef } from '@tanstack/react-table'
import { formatDistanceToNow } from 'date-fns'

const employeeExportRequestsColumns: ColumnDef<
  Tables<'pending_export_requests'>
>[] = [
  {
    accessorKey: 'account_id',
    header: ({ column }) => <TableHeader column={column} title="Account" />,
    accessorFn: (row) => {
      ;(row.account_id as any)?.company_name
    },
    cell: ({ row }) => {
      return <div>{(row.original.account_id as any)?.company_name}</div>
    },
  },
  {
    accessorKey: 'created_by',
    header: ({ column }) => (
      <TableHeader column={column} title="Requested By" />
    ),
    accessorFn: (row) =>
      `${(row.created_by as any)?.first_name} ${
        (row.created_by as any)?.last_name
      }`,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <TableHeader column={column} title="Requested At" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {formatDistanceToNow(new Date(row.original.created_at), {
            addSuffix: true,
          })}
        </div>
      )
    },
  },
]

export default employeeExportRequestsColumns
