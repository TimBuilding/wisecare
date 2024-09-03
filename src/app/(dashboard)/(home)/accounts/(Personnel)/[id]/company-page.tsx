'use client'

import React, { FC, useState } from 'react'
import CompanyHeader from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-header'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import CompanyAbout from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-about'
import EmployeesPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-page'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import EmployeesAddPersonnelForm from './employees-add-personnel-form'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'

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
          <CompanyAbout companyId={companyId} />
        </TabsContent>
        <TabsContent value="employees">
          <div className="ml-auto flex w-full flex-col lg:items-end lg:justify-center">
            {!showAddPersonnel && (
              <Button
                className="m-4 gap-2 rounded-md"
                onClick={() => setShowAddPersonnel(true)}
              >
                <Plus /> <span> Add Personnel </span>
              </Button>
            )}
          </div>
          {showAddPersonnel && <EmployeesAddPersonnelForm />}
          {!showAddPersonnel && <EmployeesPage companyId={companyId} />}
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default CompanyPage
