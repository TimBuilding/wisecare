import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getBillingStatementInputs from '@/queries/get-billing-statement-inputs'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Tables } from '@/types/database.types'
import getTypes from '@/queries/get-types'
import { format } from 'date-fns'
import getBillingStatements from '@/queries/get-billing-statements'

interface Props {
  data: Tables<'billing_statements'>
}

const BillingInformation: FC<Props> = ({ data }) => {
  return (
    <>
      <div className="col-span-3 flex grid-cols-12 flex-col pt-4 lg:grid lg:p-2">
        <div className="flex flex-col gap-2 lg:col-span-3">
          <span className="text-md font-semibold text-[#161a1d]">
            {data.mode_of_payment_id || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            MODE OF PAYMENT
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {format(new Date(data?.due_date || 'N/A'), 'MMMM d, yyyy')}
          </span>
          <span className="text-sm font-medium text-[#64748b]">DUE DATE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.or_number || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">OR NUMBER</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {format(new Date(data?.or_date || 'N/A'), 'MMMM d, yyyy')}
          </span>
          <span className="text-sm font-medium text-[#64748b]">OR DATE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.sa_number || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">SA NUMBER</span>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-3">
          <span className="text-md font-semibold text-[#161a1d]">
            {data.amount || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">AMOUNT</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.total_contract_value || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            TOTAL CONTRACT VALUE
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.balance || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">BALANCE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.billing_period || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            BILLING PERIOD
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.amount_billed || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            AMOUNT BILLED
          </span>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-3">
          <span className="text-md font-semibold text-[#161a1d]">
            {data.amount_paid || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            AMOUNT PAID
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.commission_rate || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            COMMISSION RATE
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.commission_earned || 'N/A'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            COMMISSION EARNED
          </span>
        </div>
      </div>
    </>
  )
}

export default BillingInformation
