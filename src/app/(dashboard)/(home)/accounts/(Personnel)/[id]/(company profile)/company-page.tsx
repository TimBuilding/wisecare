'use client'

import CompanyAbout from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-about'
import CompanyEditButton from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-button'
import CompanyEditProvider from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import CompanyDeleteButton from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/delete/company-delete-button'
import CompanyHeader from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-header'
import AddBillingStatementButton from '@/app/(dashboard)/(home)/billing-statements/add-billing-statement-button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import dynamic from 'next/dynamic'
import { FC, useEffect } from 'react'

interface Props {
  companyId: string
  role: string | null
}

const EmployeesTab = dynamic(
  () =>
    import(
      '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employees-tab'
    ),
  { ssr: false },
)
const BillingStatements = dynamic(
  () =>
    import(
      '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(billing statements)/billing-statements'
    ),
  { ssr: false },
)

const CompanyPage: FC<Props> = ({ companyId, role }) => {
  const { setUserRole, setAccountId } = useCompanyContext()

  // set the user role in the context.
  // so we can use it in the add personnel button form, etc
  useEffect(() => {
    setUserRole(role || '')
  }, [role, setUserRole])

  // set the account id in the context.
  // so we can use it in the add employee modal, etc
  useEffect(() => {
    setAccountId(companyId)
  }, [companyId, setAccountId])

  return (
    <Tabs defaultValue="about">
      <CompanyHeader id={companyId} />
      <div className="p-8 lg:mx-auto lg:max-w-6xl">
        <TabsContent value="about">
          <CompanyEditProvider>
            <div className="flex w-full flex-row items-center gap-2 pb-4 sm:justify-end">
              <CompanyEditButton role={role} />
            </div>
            <CompanyAbout companyId={companyId} />
            <div className="flex w-full justify-end md:justify-start">
              <CompanyDeleteButton accountId={companyId} />
            </div>
          </CompanyEditProvider>
        </TabsContent>
        <TabsContent value="employees">
          <EmployeesTab companyId={companyId} />
        </TabsContent>
        <TabsContent value="billing">
          <div className="ml-auto flex w-full flex-col pb-4 lg:items-end lg:justify-center">
            <AddBillingStatementButton />
          </div>
          <BillingStatements companyId={companyId} />
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default CompanyPage
