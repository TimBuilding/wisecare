'use client'

import CompanyAbout from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-about'
import CompanyEditButton from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-button'
import CompanyEditProvider from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'
import CompanyHeader from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-header'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'
import AddPersonnelButtonForm from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-add-personnel-button-form'
import EmployeesPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-page'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { FC } from 'react'
import EmployeesAddPersonnelForm from './employees-add-personnel-form'
import CompanyDeleteButton from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-delete-button'
import getRole from '@/utils/get-role'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import BillingStatements from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/billing-statements'

interface Props {
  companyId: string
  role: string | null
}

const CompanyPage: FC<Props> = ({ companyId, role }) => {
  const { showAddPersonnel } = useCompanyContext()

  return (
    <Tabs defaultValue="about">
      <CompanyHeader id={companyId} />
      <div className="p-8 lg:mx-auto lg:max-w-6xl">
        <TabsContent value="about">
          <CompanyEditProvider>
            <div className="flex w-full flex-row items-center gap-4 pb-4 md:justify-end">
              <CompanyEditButton role={role} />
              {[
                'marketing',
                'finance',
                'admin',
                'under-sales',
                'after-sales',
              ].includes(role || '') && (
                <CompanyDeleteButton accountId={companyId} />
              )}
            </div>
            <CompanyAbout companyId={companyId} />
          </CompanyEditProvider>
        </TabsContent>
        <TabsContent value="employees">
          <div className="ml-auto flex w-full flex-col lg:items-end lg:justify-center">
            <AddPersonnelButtonForm />
          </div>
          {showAddPersonnel && <EmployeesAddPersonnelForm />}
          {!showAddPersonnel && <EmployeesPage companyId={companyId} />}
        </TabsContent>
        <TabsContent value="billing">
          <BillingStatements />
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default CompanyPage
