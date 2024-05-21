'use client'
import getAccounts from '@/queries/get-accounts'
import { Tables } from '@/types/database.types'
import { QueryData } from '@supabase/supabase-js'
import { ColumnDef } from '@tanstack/react-table'

export type getAccountsResponse = Awaited<ReturnType<typeof getAccounts>>

const marketingColumns: ColumnDef<getAccountsResponse>[] = [
  {
    accessorKey: 'company_name',
    header: 'Company Name',
  },
  {
    accessorKey: 'account_type.name',
    header: 'Account Type',
  },
  {
    accessorKey: 'agent.first_name',
    header: 'Agent',
  },
  {
    accessorKey: 'is_active',
    header: 'Active Status',
  },
  {
    accessorKey: 'company_address',
    header: 'Company Address',
  },
  {
    accessorKey: 'nature_of_business',
    header: 'Nature of Business',
  },
  {
    accessorKey: 'hmo_provider.name',
    header: 'HMO Provider',
  },
  {
    accessorKey: 'previous_hmo_provider.name',
    header: 'Previous HMO Provider',
  },
  {
    accessorKey: 'current_hmo_provider.name',
    header: 'Current HMO Provider',
  },
  {
    accessorKey: 'total_utilization',
    header: 'Total Utilization',
  },
  {
    accessorKey: 'total_premium_paid',
    header: 'Total Premium Paid',
  },
  {
    accessorKey: 'signatory_designation',
    header: 'Signatory Designation',
  },
  {
    accessorKey: 'contact_person',
    header: 'Contact Person',
  },
  {
    accessorKey: 'contact_number',
    header: 'Contact Number',
  },
  {
    accessorKey: 'principal_plan_type.name',
    header: 'Principal Plan Type',
  },
  {
    accessorKey: 'dependent_plan_type.name',
    header: 'Dependent Plan Type',
  },
  {
    accessorKey: 'initial_head_count',
    header: 'Initial Head Count',
  },
  {
    accessorKey: 'effectivity_date',
    header: 'Effectivity Date',
  },
  {
    accessorKey: 'coc_issue_date',
    header: 'COC Issue Date',
  },
  {
    accessorKey: 'effective_date',
    header: 'Effective Date',
  },
  {
    accessorKey: 'renewal_date',
    header: 'Renewal Date',
  },
  {
    accessorKey: 'expiration_date',
    header: 'Expiration Date',
  },
  {
    accessorKey: 'delivery_date_of_membership_ids',
    header: 'Delivery Date of Membership IDs',
  },
  {
    accessorKey: 'orientation_date',
    header: 'Orientation Date',
  },
  {
    accessorKey: 'initial_contract_value',
    header: 'Initial Contract Value',
  },
  {
    accessorKey: 'mode_of_payment.name',
    header: 'Mode of Payment',
  },
  {
    accessorKey: 'wellness_lecture_date',
    header: 'Wellness Lecture Date',
  },
  {
    accessorKey: 'annual_physical_examination_date',
    header: 'Annual Physical Examination Date',
  },
  {
    accessorKey: 'commision_rate',
    header: 'Commission Rate',
  },
  {
    accessorKey: 'additional_benefits',
    header: 'Additional Benefits',
  },
  {
    accessorKey: 'special_benefits',
    header: 'Special Benefits',
  },
  {
    accessorKey: 'mode_of_premium.name',
    header: 'Mode of Premium',
  },
  {
    accessorKey: 'due_date',
    header: 'Due Date',
  },
  {
    accessorKey: 'or_number',
    header: 'OR Number',
  },
  {
    accessorKey: 'or_date',
    header: 'OR Date',
  },
  {
    accessorKey: 'sa_number',
    header: 'SA Number',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'total_contract_value',
    header: 'Total Contract Value',
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
  },
  {
    accessorKey: 'billing_period',
    header: 'Billing Period',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At',
  },
]

export default marketingColumns
