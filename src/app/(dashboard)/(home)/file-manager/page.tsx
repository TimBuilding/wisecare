import React from 'react'
import DownloadableFiles from '@/app/(dashboard)/(home)/file-manager/downloadable-files'
import { AccountDownloadsProvider } from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads-provider'

const Page = () => {
  return (
    <>
      <AccountDownloadsProvider>
        <DownloadableFiles />
      </AccountDownloadsProvider>
    </>
  )
}

export default Page
