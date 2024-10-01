import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAccountById from '@/queries/get-account-by-id'
import { Input } from '@/components/ui/input'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'

interface CompanyAccountInformationProps {
  id: string
}

const CompanyAccountInformation: FC<CompanyAccountInformationProps> = ({
  id,
}) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))

  const companyAccountInformation = [
    {
      name: 'Account Type:',
      // @ts-ignore
      value: account?.account_type ? account?.account_type.name : '',
    },
    {
      name: 'Agent:',
      // @ts-ignore
      value: account?.agent ? account?.agent.first_name : '',
    },
    {
      name: 'Active Status:',
      value: account?.is_active ? 'Active' : 'Inactive',
    },
    {
      name: 'Commission Rate:',
      value: account?.commision_rate ? account?.commision_rate : '',
    },
  ]

  return (
    <>
      {companyAccountInformation.map((info, index) => (
        <div className="flex flex-row pt-4" key={index}>
          {editMode ? (
            <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
              {info.name} <Input className="w-full" defaultValue={info.value} />
            </div>
          ) : (
            <div className="text-md text-[#1e293b]">
              {info.name} <span> {info.value}</span>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default CompanyAccountInformation
