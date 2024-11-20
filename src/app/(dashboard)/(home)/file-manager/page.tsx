import React from 'react'
import { DownloadsProvider } from '@/app/(dashboard)/(home)/file-manager/downloads-provider'
import AccountDownloads from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads'
import DownloadsPageTitle from '@/app/(dashboard)/(home)/file-manager/downloads-page-title'
import EmployeeDownloads from '@/app/(dashboard)/(home)/file-manager/employee-files/employee-downloads'
import DownloadsSheet from '@/app/(dashboard)/(home)/file-manager/downloads-sheet'
import CompanyProvider from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'

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
        <DownloadsSheet />
      </DownloadsProvider>
    </>
  )
}

export default Page
