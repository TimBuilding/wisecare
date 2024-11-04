'use server'

import PendingCompanyEmployeesTable from '@/app/(dashboard)/admin/approval-request/company-employees/pending-company-employees-table'
import PendingEmployeeInfo from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employee-info'
import { PendingEmployeeProvider } from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employee-provider'
import getPendingCompanyEmployees from '@/queries/get-pending-company-employees'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'

const CompanyEmployeesApprovalRequestPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getPendingCompanyEmployees(supabase, 'desc'))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PendingEmployeeProvider>
        <PendingCompanyEmployeesTable />
        <PendingEmployeeInfo />
      </PendingEmployeeProvider>
    </HydrationBoundary>
  )
}

export default CompanyEmployeesApprovalRequestPage
