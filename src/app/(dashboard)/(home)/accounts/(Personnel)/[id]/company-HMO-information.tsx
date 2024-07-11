import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getAccountById from '@/queries/get-account-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

interface CompanyHmoInformationProps {
  id: string
}

const CompanyHmoInformation: FC<CompanyHmoInformationProps> = ({ id }) => {
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const companyHmoInformation = [
    {
      name: 'HMO Provider:',
      // @ts-ignore
      value: account?.hmo_provider.name || '',
    },
    {
      name: 'Previous HMO Provider:',
      //@ts-ignore
      value: account?.previous_hmo_provider.name || '',
    },
    {
      name: 'Current HMO Provider:',
      //@ts-ignore
      value: account?.current_hmo_provider.name || '',
    },
    {
      name: 'Principal Plan Type:',
      //@ts-ignore
      value: account?.principal_plan_type.name || '',
    },
    {
      name: 'Dependent Plan Type:',
      //@ts-ignore
      value: account?.dependent_plan_type.name || '',
    },
    {
      name: 'Total Utilization:',
      value: account?.total_utilization || '',
    },
    {
      name: 'Total Premium Paid:',
      value: account?.total_premium_paid || '',
    },
    {
      name: 'Additional Benefits:',
      value: account?.additional_benefits || '',
    },
    {
      name: 'Special Benefits:',
      value: account?.special_benefits || '',
    },
  ]
  return (
    <>
      {companyHmoInformation.map((info, index) => (
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

export default CompanyHmoInformation
