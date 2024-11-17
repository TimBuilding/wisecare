'use client'
import React from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import EmployeeDownloadsFileItem from '@/app/(dashboard)/(home)/file-manager/employee-files/employee-downloads-file-item'
import getApprovedEmployeeExports from '@/queries/get-approved-employee-exports'

const EmployeeDownloads = () => {
  const supabase = createBrowserClient()

  const { data } = useQuery(getApprovedEmployeeExports(supabase, 'employees'))

  return (
    <div className="flex flex-row gap-6">
      {data?.map((exportFiles) => (
        <EmployeeDownloadsFileItem
          data={exportFiles as any}
          key={exportFiles.id}
        />
      ))}
    </div>
  )
}

export default EmployeeDownloads
