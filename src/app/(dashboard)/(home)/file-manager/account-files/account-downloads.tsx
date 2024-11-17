'use client'
import React from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import AccountDownloadsFileItem from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads-file-item'
import getApprovedExports from '@/queries/get-approved-exports'

const AccountDownloads = () => {
  const supabase = createBrowserClient()

  const { data } = useQuery(getApprovedExports(supabase, 'asc'))
  const accounts = data?.filter((item) => item.export_type === 'accounts')

  return (
    <div className="flex flex-row gap-6">
      {accounts?.map((exportFiles) => (
        <AccountDownloadsFileItem
          key={exportFiles.id}
          data={exportFiles as any}
        />
      ))}
    </div>
  )
}

export default AccountDownloads
