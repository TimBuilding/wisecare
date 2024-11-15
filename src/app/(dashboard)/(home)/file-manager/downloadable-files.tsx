import React from 'react'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import AccountDownloads from '@/app/(dashboard)/(home)/file-manager/account-downloads'
import EmployeeDownloads from '@/app/(dashboard)/(home)/file-manager/employee-downloads'

const DownloadableFiles = () => {
  return (
    <div className="flex flex-col">
      <PageHeader>
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <PageTitle>Download Export Files</PageTitle>
            {/*TODO: Add count and loading state*/}
            {/*{isPending ? (*/}
            {/*  <Skeleton className="h-4 w-20" />*/}
            {/*) : (*/}
            {/*  <PageDescription>{count} file exports</PageDescription>*/}
            {/*)}*/}
            <PageDescription> files </PageDescription>
          </div>
        </div>
      </PageHeader>
      <div className="space-y-4 p-8">
        <span className="text-sm font-medium"> Accounts </span>
        <AccountDownloads />
      </div>
      <div className="space-y-4 p-8">
        <span className="text-sm font-medium"> Employees </span>
        <EmployeeDownloads />
      </div>
    </div>
  )
}

export default DownloadableFiles
