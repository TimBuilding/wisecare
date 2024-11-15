import React from 'react'
import DownloadableFiles from '@/app/(dashboard)/(home)/file-manager/downloadable-files'
import { DownloadsProvider } from '@/app/(dashboard)/(home)/file-manager/downloads-provider'

const Page = () => {
  return (
    <>
      <DownloadsProvider>
        <DownloadableFiles />
      </DownloadsProvider>
    </>
  )
}

export default Page
