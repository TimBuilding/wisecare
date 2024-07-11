import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getAccountById from '@/queries/get-account-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

interface CompanyContractInformationProps {
  id: string
}

const CompanyContractInformation: FC<CompanyContractInformationProps> = ({
  id,
}) => {
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const companyContractInformation = [
    {
      name: 'Initial Contract Value:',
      value: account?.initial_contract_value || '',
    },
    {
      name: 'Total Contract Value:',
      value: account?.total_contract_value || '',
    },
    {
      name: 'Balance:',
      value: account?.balance || '',
    },
    {
      name: 'Mode of Payment:',
      // @ts-ignore
      value: account?.mode_of_payment.name || '',
    },
    {
      name: 'Mode of Premium:',
      // @ts-ignore
      value: account?.mode_of_premium.name || '',
    },
    {
      name: 'Due Date:',
      value: account?.due_date || '',
    },
    {
      name: 'Amount:',
      value: account?.amount || '',
    },
    {
      name: 'Renewal Date:',
      value: account?.renewal_date || '',
    },
    {
      name: 'Expiration Date:',
      value: account?.expiration_date || '',
    },
    {
      name: 'Effectivity Date:',
      value: account?.effectivity_date || '',
    },
    {
      name: 'Effective Date:',
      value: account?.effective_date || '',
    },
    {
      name: 'COC Issue Date:',
      value: account?.coc_issue_date || '',
    },
    {
      name: 'Delivery Date of Membership IDs:',
      value: account?.delivery_date_of_membership_ids || '',
    },
    {
      name: 'Orientation Date:',
      value: account?.orientation_date || '',
    },
    {
      name: 'Wellness Lecture Date:',
      value: account?.wellness_lecture_date || '',
    },
    {
      name: 'Annual Physical Examination Date:',
      value: account?.annual_physical_examination_date || '',
    },
    {
      name: 'Billing Period:',
      value: account?.billing_period || '',
    },
  ]
  return (
    <>
      {companyContractInformation.map((info, index) => (
        <div className="flex flex-row pt-4" key={index}>
          <div className="text-md text-[#1e293b]">
            {' '}
            {info.name} <span> {info.value}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default CompanyContractInformation
