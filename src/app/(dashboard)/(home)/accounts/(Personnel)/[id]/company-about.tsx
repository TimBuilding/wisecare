import React from 'react'
import { TabsContent } from '@/components/ui/tabs'
import CompanyInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-information'
import CompanyAccountInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-account-information'
import CompanyFinancialInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-financial-information'
import CompanyHMOInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-HMO-information'
import CompanyContractInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-contract-information'

const CompanyAbout = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-between gap-6">
      <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
        <span className="text-lg font-semibold">Company Information</span>
        <CompanyInformation />
      </div>
      <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
        <span className="text-lg font-semibold">Account Information</span>
        <CompanyAccountInformation />
      </div>
      <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
        <span className="text-lg font-semibold">Financial Information</span>
        <CompanyFinancialInformation />
      </div>
      <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
        <span className="text-lg font-semibold">HMO Information</span>
        <CompanyHMOInformation />
      </div>
      <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
        <span className="text-lg font-semibold">Contract Information</span>
        <CompanyContractInformation />
      </div>
    </div>
  )
}

export default CompanyAbout
