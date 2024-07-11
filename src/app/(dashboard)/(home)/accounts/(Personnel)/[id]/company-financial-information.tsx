import React, { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'
import getAccountById from '@/queries/get-account-by-id'

interface Props {
  id: string
}

const CompanyFinancialInformation: FC<Props> = ({ id }) => {
  const supabase = createBrowserClient()
  const { data: account, error } = useQuery(getAccountById(supabase, id))

  return (
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
  )
}

export default CompanyFinancialInformation
