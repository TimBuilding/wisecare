import { ColumnDef } from '@tanstack/react-table'
import { getAccountsResponse } from './marketing-columns'
import TableHeader from '@/components/table-header'

const afterSalesColumns: ColumnDef<getAccountsResponse>[] = [
  {
    accessorKey: 'company_name',
    header: ({ column }) => (
      <TableHeader column={column} title="Company Name" />
    ),
  },
  {
    accessorKey: 'account_type.name',
    header: ({ column }) => (
      <TableHeader column={column} title="Account Type" />
    ),
  },
  {
    accessorKey: 'agent.first_name',
    header: ({ column }) => <TableHeader column={column} title="Agent" />,
  },
  {
    accessorKey: 'hmo_provider.name',
    header: ({ column }) => (
      <TableHeader column={column} title="HMO Provider" />
    ),
  },
  {
    accessorKey: 'previous_hmo_provider.name',
    header: ({ column }) => (
      <TableHeader column={column} title="Previous HMO Provider" />
    ),
  },
  {
    accessorKey: 'current_hmo_provider.name',
    header: ({ column }) => (
      <TableHeader column={column} title="Current HMO Provider" />
    ),
  },
  {
    accessorKey: 'signatory_designation',
    header: ({ column }) => (
      <TableHeader column={column} title="Signatory Designation" />
    ),
  },
  {
    accessorKey: 'contact_person',
    header: ({ column }) => (
      <TableHeader column={column} title="Contact Person" />
    ),
  },
  {
    accessorKey: 'contact_number',
    header: ({ column }) => (
      <TableHeader column={column} title="Contact Number" />
    ),
  },
  {
    accessorKey: 'principal_plan_type.name',
    header: ({ column }) => (
      <TableHeader column={column} title="Principal Plan Type" />
    ),
  },
  {
    accessorKey: 'dependent_plan_type.name',
    header: ({ column }) => (
      <TableHeader column={column} title="Dependent Plan Type" />
    ),
  },
  {
    accessorKey: 'initial_head_count',
    header: ({ column }) => (
      <TableHeader column={column} title="Initial Head Count" />
    ),
  },
  {
    accessorKey: 'effectivity_date',
    header: ({ column }) => (
      <TableHeader column={column} title="Effectivity Date" />
    ),
  },
  {
    accessorKey: 'effective_date',
    header: ({ column }) => (
      <TableHeader column={column} title="Effective Date" />
    ),
  },
  {
    accessorKey: 'renewal_date',
    header: ({ column }) => (
      <TableHeader column={column} title="Renewal Date" />
    ),
  },
  {
    accessorKey: 'expiration_date',
    header: ({ column }) => (
      <TableHeader column={column} title="Expiration Date" />
    ),
  },
  {
    accessorKey: 'mode_of_payment.name',
    header: ({ column }) => (
      <TableHeader column={column} title="Mode of Payment" />
    ),
  },
  {
    accessorKey: 'additional_benefits',
    header: ({ column }) => (
      <TableHeader column={column} title="Additional Benefits" />
    ),
  },
  {
    accessorKey: 'special_benefits',
    header: ({ column }) => (
      <TableHeader column={column} title="Special Benefits" />
    ),
  },
  {
    accessorKey: 'mode_of_premium.name',
    header: ({ column }) => (
      <TableHeader column={column} title="Mode of Premium" />
    ),
  },
]

export default afterSalesColumns
