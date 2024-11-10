import React from 'react'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import { Skeleton } from '@/components/ui/skeleton'
import TableSearch from '@/components/table-search'

const EmployeeExportsRequestsTable = () => {
  return (
    <div className="flex flex-col">
      <PageHeader>
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <PageTitle>Pending Employee Exports</PageTitle>
            {/*TODO: Add count and loading state*/}
            {/*{isPending ? (*/}
            {/*  <Skeleton className="h-4 w-20" />*/}
            {/*) : (*/}
            {/*  <PageDescription>{count} approval requests</PageDescription>*/}
            {/*)}*/}
            <PageDescription> export requests </PageDescription>
          </div>
          <div>
            {/*TODO: Add table search component*/}
            {/*<TableSearch table={table} placeholder="Search requests" />*/}
          </div>
        </div>
      </PageHeader>
    </div>
  )
}

export default EmployeeExportsRequestsTable
