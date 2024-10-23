'use client'
import TableHeader from '@/components/table-header'
import getAccounts from '@/queries/get-accounts'
import { Tables } from '@/types/database.types'
import { ColumnDef } from '@tanstack/react-table'

const accountsColumns: ColumnDef<Tables<'accounts'>>[] = [
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
    accessorKey: 'agent',
    header: ({ column }) => <TableHeader column={column} title="Agent" />,
    cell: ({ row }) =>
      // @ts-ignore
      `${row.original.agent.first_name} ${row.original.agent.last_name}`,
  },
  {
    accessorKey: 'company_address',
    header: ({ column }) => (
      <TableHeader column={column} title="Company Address" />
    ),
  },
  {
    accessorKey: 'nature_of_business',
    header: ({ column }) => (
      <TableHeader column={column} title="Nature of Business" />
    ),
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
    accessorKey: 'total_utilization',
    header: ({ column }) => (
      <TableHeader column={column} title="Total Utilization" />
    ),
  },
  {
    accessorKey: 'total_premium_paid',
    header: ({ column }) => (
      <TableHeader column={column} title="Total Premium Paid" />
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
    accessorKey: 'coc_issue_date',
    header: ({ column }) => (
      <TableHeader column={column} title="COC Issue Date" />
    ),
  },
  {
    accessorKey: 'expiration_date',
    header: ({ column }) => (
      <TableHeader column={column} title="Expiration Date" />
    ),
  },
  {
    accessorKey: 'delivery_date_of_membership_ids',
    header: ({ column }) => (
      <TableHeader column={column} title="Delivery Date of Membership IDs" />
    ),
  },
  {
    accessorKey: 'orientation_date',
    header: ({ column }) => (
      <TableHeader column={column} title="Orientation Date" />
    ),
  },
  {
    accessorKey: 'initial_contract_value',
    header: ({ column }) => (
      <TableHeader column={column} title="Initial Contract Value" />
    ),
  },
  {
    accessorKey: 'mode_of_payment.name',
    header: ({ column }) => (
      <TableHeader column={column} title="Mode of Payment" />
    ),
  },
  {
    accessorKey: 'wellness_lecture_date',
    header: ({ column }) => (
      <TableHeader column={column} title="Wellness Lecture Date" />
    ),
  },
  {
    accessorKey: 'annual_physical_examination_date',
    header: ({ column }) => (
      <TableHeader column={column} title="Annual Physical Examination Date" />
    ),
  },
  {
    accessorKey: 'commision_rate',
    header: ({ column }) => (
      <TableHeader column={column} title="Commission Rate" />
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
    accessorKey: 'created_at',
    header: ({ column }) => <TableHeader column={column} title="Created At" />,
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => <TableHeader column={column} title="Updated At" />,
  },
  {
    accessorKey: 'name_of_signatory',
    header: ({ column }) => (
      <TableHeader column={column} title="Name of Signatory" />
    ),
  },
  {
    accessorKey: 'designation_of_contact_person',
    header: ({ column }) => (
      <TableHeader column={column} title="Designation of Contact Person" />
    ),
  },
  {
    accessorKey: 'email_address_of_contact_person',
    header: ({ column }) => (
      <TableHeader column={column} title="Email Address of Contact Person" />
    ),
  },
]

export default accountsColumns
