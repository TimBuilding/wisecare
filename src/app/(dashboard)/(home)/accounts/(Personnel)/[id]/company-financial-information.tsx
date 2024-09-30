import React from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'
import getAccountById from '@/queries/get-account-by-id'
import { Input } from '@/components/ui/input'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'

interface Props {
  id: string
}

const CompanyFinancialInformation: FC<Props> = ({ id }) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const supabase = createBrowserClient()
  const { data: account, error } = useQuery(getAccountById(supabase, id))

  return (
    <>
      {editMode ? (
        <>
          <div className="flex flex-row pt-4">
            <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
              OR Number:{' '}
              <Input
                className="w-full"
                defaultValue={account?.or_number || ''}
              />
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
              OR Date:{' '}
              <Input className="w-full" defaultValue={account?.or_date || ''} />
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
              SA Number:{' '}
              <Input
                className="w-full"
                defaultValue={account?.sa_number || ''}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              OR Number: <span>{account?.or_number}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              OR Date: <span>{account?.or_date}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              SA Number: <span>{account?.sa_number}</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CompanyFinancialInformation
