import React from 'react'
import { DownloadsProvider } from '@/app/(dashboard)/(home)/file-manager/downloads-provider'
import AccountDownloads from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads'
import AccountDownloadsSheet from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads-sheet'
import DownloadsPageTitle from '@/app/(dashboard)/(home)/file-manager/downloads-page-title'
import EmployeeDownloads from '@/app/(dashboard)/(home)/file-manager/employee-files/employee-downloads'

const Page = () => {
  return (
    <>
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
        <AccountDownloadsSheet />
      </DownloadsProvider>
    </>
  )
}

export default Page
