import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAccountById from '@/queries/get-account-by-id'

interface CompanyAccountInformationProps {
  id: string
}

const CompanyAccountInformation: FC<CompanyAccountInformationProps> = ({
  id,
}) => {
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))

  console.log(account)
  const companyAccountInformation = [
    {
      name: 'Account Type:',
      // @ts-ignore
      value: account?.account_type.name || '',
    },
    {
      name: 'Agent:',
      // @ts-ignore
      value: account?.agent.first_name || '',
    },
    {
      name: 'Active Status:',
      value: account?.is_active ? 'Active' : 'Inactive',
    },
    {
      name: 'Commission Rate:',
      value: account?.commision_rate || '',
    },
  ]

  return (
    <>
      {companyAccountInformation.map((info, index) => (
        <div className="flex flex-row pt-4" key={index}>
          <div className="text-md text-[#1e293b]">
            {info.name} <span>{info.value}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default CompanyAccountInformation
