import { ColumnDef } from '@tanstack/react-table'
import TableHeader from '@/components/table-header'
import { format } from 'date-fns'
import { Tables } from '@/types/database.types'

const billingStatementsColumns: ColumnDef<Tables<'billing_statements'>>[] = [
  {
    accessorKey: 'account.company_name',
    header: ({ column }) => <TableHeader column={column} title="Account" />,
  },
  {
    accessorKey: 'mode_of_payment.name',
    header: ({ column }) => (
      <TableHeader column={column} title="Mode of Payment" />
    ),
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => <TableHeader column={column} title="Due Date" />,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.due_date
            ? format(row.getValue('due_date'), 'MMMM dd, yyyy')
            : 'N/A'}
        </div>
      )
    },
  },
  {
    accessorKey: 'or_number',
    header: ({ column }) => <TableHeader column={column} title="OR Number" />,
  },
  {
    accessorKey: 'or_date',
    header: ({ column }) => <TableHeader column={column} title="OR Date" />,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.or_date
            ? format(row.getValue('or_date'), 'MMMM dd, yyyy')
            : 'N/A'}
        </div>
      )
    },
  },
  {
    accessorKey: 'sa_number',
    header: ({ column }) => <TableHeader column={column} title="SA Number" />,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <TableHeader column={column} title="Amount" />,
  },
  {
    accessorKey: 'total_contract_value',
    header: ({ column }) => (
      <TableHeader column={column} title="Total Contract Value" />
    ),
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <TableHeader column={column} title="Balance" />,
  },
  {
    accessorKey: 'billing_period',
    header: ({ column }) => (
      <TableHeader column={column} title="Billing Period" />
    ),
  },
  {
    accessorKey: 'amount_billed',
    header: ({ column }) => (
      <TableHeader column={column} title="Amount Billed" />
    ),
  },
  {
    accessorKey: 'amount_paid',
    header: ({ column }) => <TableHeader column={column} title="Amount Paid" />,
  },
  {
    accessorKey: 'commission_rate',
    header: ({ column }) => (
      <TableHeader column={column} title="Commission Rate" />
    ),
  },
  {
    accessorKey: 'commission_earned',
    header: ({ column }) => (
      <TableHeader column={column} title="Commission Earned" />
    ),
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <TableHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      return <div>{format(row.getValue('created_at'), 'MMMM dd, yyyy p')}</div>
    },
  },
]

export default billingStatementsColumns
