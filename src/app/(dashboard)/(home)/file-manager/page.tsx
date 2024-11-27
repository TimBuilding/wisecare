'use server'
import React from 'react'
import { DownloadsProvider } from '@/app/(dashboard)/(home)/file-manager/downloads-provider'
import AccountDownloads from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads'
import DownloadsPageTitle from '@/app/(dashboard)/(home)/file-manager/downloads-page-title'
import EmployeeDownloads from '@/app/(dashboard)/(home)/file-manager/employee-files/employee-downloads'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { cookies } from 'next/headers'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import getExports from '@/queries/get-approved-exports'
import dynamic from 'next/dynamic'

const DownloadsSheet = dynamic(
  () => import('@/app/(dashboard)/(home)/file-manager/downloads-sheet'),
  { ssr: false },
)

const FileManagerPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getExports(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DownloadsProvider>
        <div className="flex flex-col">
          <DownloadsPageTitle />
          <div className="space-y-4 p-8">
            <span className="text-sm font-medium"> Accounts </span>
            <AccountDownloads />
          </div>
          <div className="space-y-4 p-8">
            <span className="text-sm font-medium"> Employees </span>
            <EmployeeDownloads />
          </div>
        </div>
        <DownloadsSheet />
      </DownloadsProvider>
    </HydrationBoundary>
  )
}

export default FileManagerPage
