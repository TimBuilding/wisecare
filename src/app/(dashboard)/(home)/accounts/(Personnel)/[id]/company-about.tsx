import React, { FC } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import CompanyInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-information'
import CompanyAccountInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-account-information'
import CompanyFinancialInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-financial-information'
import CompanyHMOInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-HMO-information'
import CompanyContractInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-contract-information'

interface Props {
  companyId: string
  editMode: boolean
}

const CompanyAbout: FC<Props> = ({ companyId, editMode }) => {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-between gap-6 lg:flex-row lg:items-start ">
      <div className="flex w-full flex-col gap-6 lg:max-w-xs">
        <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
          <span className="text-lg font-semibold">Company Information</span>
          <CompanyInformation id={companyId} editMode={editMode} />
        </div>
        <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
          <span className="text-lg font-semibold">Account Information</span>
          <CompanyAccountInformation id={companyId} editMode={editMode} />
        </div>
        <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
          <span className="text-lg font-semibold">Financial Information</span>
          <CompanyFinancialInformation id={companyId} editMode={editMode} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
          <span className="text-lg font-semibold">HMO Information</span>
          <CompanyHMOInformation id={companyId} editMode={editMode} />
        </div>
        <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
          <span className="text-lg font-semibold">Contract Information</span>
          <CompanyContractInformation id={companyId} editMode={editMode} />
        </div>
      </div>
    </div>
  )
}

export default CompanyAbout
