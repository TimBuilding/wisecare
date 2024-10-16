import { ColumnDef } from '@tanstack/react-table'
import TableHeader from '@/components/table-header'
import { format } from 'date-fns'
import { Tables } from '@/types/database.types'

const pendingColumns: ColumnDef<Tables<'billing_statements'>>[] = [
  {
    accessorKey: 'company_name',
    header: ({ column }) => (
      <TableHeader column={column} title="Company Name" />
    ),
  },
  {
    accessorKey: 'agent.first_name',
    header: ({ column }) => <TableHeader column={column} title="Agent" />,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <TableHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      return <div>{format(row.getValue('created_at'), 'MMMM dd, yyyy p')}</div>
    },
  },
]

export default pendingColumns
