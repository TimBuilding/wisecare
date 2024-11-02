import { Tables } from '@/types/database.types'
import { ColumnDef } from '@tanstack/react-table'
import TableHeader from '@/components/table-header'
import { formatDate, formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

const approvalRequestColumns: ColumnDef<Tables<'pending_accounts'>>[] = [
  {
    accessorKey: 'operation_type',
    header: ({ column }) => <TableHeader column={column} title="Action" />,
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.operation_type}</div>
    },
  },
  {
    accessorKey: 'company_name',
    header: ({ column }) => <TableHeader column={column} title="Account" />,
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button size={'icon'} variant="ghost" className="">
            <Check className="h-4 w-4" />
          </Button>
          <Button size={'icon'} variant="ghost" className="">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

export default approvalRequestColumns
