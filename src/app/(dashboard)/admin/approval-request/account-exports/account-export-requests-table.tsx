import React from 'react'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'

const AccountExportRequestsTable = () => {
  return (
    <div className="flex flex-col">
      <PageHeader>
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <PageTitle>Pending Account Exports</PageTitle>
            {/*TODO: Add Loading state and count of export requests*/}
            {/*{isPending ? (*/}
            {/*  <Skeleton className="h-4 w-20" />*/}
            {/*) : (*/}
            {/*  <PageDescription> export requests</PageDescription>*/}
            {/*)}*/}
            <PageDescription> export requests</PageDescription>
          </div>
          <div>
            {/*TODO: Implement TableSearch component*/}
            {/*<TableSearch table={table} placeholder="Search requests" />*/}
          </div>
        </div>
      </PageHeader>
    </div>
  )
}

export default AccountExportRequestsTable
