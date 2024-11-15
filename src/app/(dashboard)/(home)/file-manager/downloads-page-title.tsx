import React from 'react'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'

const DownloadsPageTitle = () => {
  return (
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
  )
}

export default DownloadsPageTitle
