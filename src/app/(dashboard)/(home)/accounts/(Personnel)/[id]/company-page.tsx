'use client'

import React, { FC, useState } from 'react'
import CompanyHeader from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-header'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import CompanyAbout from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-about'
import EmployeesPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-page'
import EmployeesAddPersonnelForm from './employees-add-personnel-form'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'
import AddPersonnelButtonForm from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-add-personnel-button-form'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import CompanyEditProvider, {
  useCompanyEditContext,
} from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'
import CompanyEditButton from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-button'

interface Props {
  companyId: string
}

const CompanyPage: FC<Props> = ({ companyId }) => {
  const { showAddPersonnel, setShowAddPersonnel } = useCompanyContext()

  return (
    <Tabs defaultValue="about">
      <CompanyHeader id={companyId} />
      <div className="p-8 lg:mx-auto lg:max-w-5xl">
        <TabsContent value="about">
          <CompanyEditProvider>
            <div className="ml-auto flex w-full flex-col lg:items-end lg:justify-center">
              <CompanyEditButton />
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
      </div>
    </Tabs>
  )
}

export default CompanyPage
