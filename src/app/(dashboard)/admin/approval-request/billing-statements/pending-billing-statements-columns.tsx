import OperationBadge from '@/app/(dashboard)/admin/approval-request/components/operation-badge'
import TableHeader from '@/components/table-header'
import { Button } from '@/components/ui/button'
import { Tables } from '@/types/database.types'
import { ColumnDef } from '@tanstack/react-table'
import { formatDistanceToNow } from 'date-fns'
import { Eye } from 'lucide-react'

const pendingBillingStatementsColumns: ColumnDef<
  Tables<'pending_billing_statements'>
>[] = [
  {
    accessorKey: 'operation_type',
    header: ({ column }) => <TableHeader column={column} title="Action" />,
    accessorFn: (row) => row.operation_type,
    cell: ({ row }) => (
      <OperationBadge operationType={row.original.operation_type} />
    ),
  },
  {
    accessorKey: 'account.company_name',
    header: ({ column }) => <TableHeader column={column} title="Account" />,
  },
  {
    accessorKey: 'or_number',
    header: ({ column }) => <TableHeader column={column} title="OR Number" />,
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
  {
    id: 'actions',
    cell: () => {
      return (
        <Button size={'icon'} variant="ghost">
          <Eye className="h-4 w-4 cursor-pointer" />
        </Button>
      )
    },
  },
]

export default pendingBillingStatementsColumns
