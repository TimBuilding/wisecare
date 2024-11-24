'use client'
import React from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import EmployeeDownloadsFileItem from '@/app/(dashboard)/(home)/file-manager/employee-files/employee-downloads-file-item'
import getExports from '@/queries/get-approved-exports'

const EmployeeDownloads = () => {
  const supabase = createBrowserClient()

  const { data } = useQuery(getExports(supabase, 'asc'))
  const employees = data?.filter((item) => item.export_type === 'employees')

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] place-items-center justify-items-center gap-6">
      {employees?.map((exportFiles) => (
        <EmployeeDownloadsFileItem
          data={exportFiles as any}
          key={exportFiles.id}
        />
      ))}
    </div>
  )
}

export default EmployeeDownloads
