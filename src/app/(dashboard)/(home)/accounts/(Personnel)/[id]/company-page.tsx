'use client'

import React, { FC } from 'react'
import CompanyHeader from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-header'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import CompanyAbout from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-about'
import EmployeesPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-page'

interface Props {
  companyId: string
}
const CompanyPage: FC<Props> = ({ companyId }) => {
  return (
    <Tabs defaultValue="about">
      <CompanyHeader id={companyId} />
      <div className="p-8 lg:mx-auto lg:max-w-5xl">
        <TabsContent value="about">
          <CompanyAbout companyId={companyId} />
        </TabsContent>
        <TabsContent value="employees">
          <EmployeesPage />
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default CompanyPage
