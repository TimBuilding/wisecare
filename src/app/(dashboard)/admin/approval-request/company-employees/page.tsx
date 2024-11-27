'use server'

import PendingCompanyEmployeesTable from '@/app/(dashboard)/admin/approval-request/company-employees/pending-company-employees-table'
import { PendingEmployeeProvider } from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employee-provider'
import getPendingCompanyEmployees from '@/queries/get-pending-company-employees'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

const PendingEmployeeInfo = dynamic(
  () =>
    import(
      '@/app/(dashboard)/admin/approval-request/company-employees/information/pending-employee-info'
    ),
  { ssr: false },
)

export const metadata = async (): Promise<Metadata> => {
  return {
    title: 'Review Employees',
  }
}

const CompanyEmployeesApprovalRequestPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getPendingCompanyEmployees(supabase, 'desc'))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PendingEmployeeProvider>
        <PendingCompanyEmployeesTable />
        <Suspense fallback={<div>Loading...</div>}>
          <PendingEmployeeInfo />
        </Suspense>
      </PendingEmployeeProvider>
    </HydrationBoundary>
  )
}

export default CompanyEmployeesApprovalRequestPage
