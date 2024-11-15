'use client'
import React from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import AccountDownloadsFileItem from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads-file-item'
import getApprovedAccountExports from '@/queries/get-approved-account-exports'

const AccountDownloads = () => {
  const supabase = createBrowserClient()

  const { data } = useQuery(getApprovedAccountExports(supabase, 'accounts'))

  return (
    <div className="flex flex-row gap-6">
      {data?.map((exportFiles) => (
        <AccountDownloadsFileItem
          key={exportFiles.id}
          data={exportFiles as any}
        />
      ))}
    </div>
  )
}

export default AccountDownloads
