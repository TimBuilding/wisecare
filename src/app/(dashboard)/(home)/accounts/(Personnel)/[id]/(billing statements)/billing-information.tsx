import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getBillingStatementByCompanyId from '@/queries/get-billing-statement-by-company-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Tables } from '@/types/database.types'
import getTypes from '@/queries/get-types'
import { format } from 'date-fns'
import getBillingStatements from '@/queries/get-billing-statements'
import {
  formatCurrency,
  formatPercentage,
} from '@/app/(dashboard)/(home)/accounts/columns/accounts-columns'

type ModeOfPayment = {
  id: string
  name: string
}

export interface BillingInfoProps {
  data: {
    id: string
    mode_of_payments: ModeOfPayment
    due_date: string
    or_number: string
    or_date: string
    sa_number: string
    amount: number
    total_contract_value: number
    balance: number
    billing_period: number
    amount_billed: number
    amount_paid: number
    commission_rate: number
    commission_earned: number
    created_at: string
  }
}

const BillingInformation: FC<BillingInfoProps> = ({ data }) => {
  return (
    <>
      <div className="col-span-3 flex grid-cols-12 flex-col pt-4 lg:grid lg:p-2">
        <div className="flex flex-col gap-2 lg:col-span-3">
          <span className="text-md font-semibold text-[#161a1d]">
            {data.mode_of_payments ? data.mode_of_payments.name : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            MODE OF PAYMENT
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.due_date
              ? format(new Date(data.due_date), 'MMMM d, yyyy')
              : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">DUE DATE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.or_number ? data.or_number : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">OR NUMBER</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.or_date
              ? format(new Date(data.or_date), 'MMMM d, yyyy')
              : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">OR DATE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.sa_number ? data.sa_number : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">SA NUMBER</span>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-3">
          <span className="text-md font-semibold text-[#161a1d]">
            {data.amount ? formatCurrency(data.amount) : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">AMOUNT</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.total_contract_value
              ? formatCurrency(data.total_contract_value)
              : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            TOTAL CONTRACT VALUE
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.balance ? formatCurrency(data.balance) : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">BALANCE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.billing_period ? data.billing_period : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            BILLING PERIOD
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.amount_billed
              ? formatCurrency(data.amount_billed)
              : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            AMOUNT BILLED
          </span>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-3">
          <span className="text-md font-semibold text-[#161a1d]">
            {data.amount_paid ? data.amount_paid : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            AMOUNT PAID
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.commission_rate
              ? formatPercentage(data.commission_rate)
              : 'No data'}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            COMMISSION RATE
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.commission_earned
              ? formatPercentage(data.commission_earned)
              : 'No data'}
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
