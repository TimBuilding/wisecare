'use client'

import React, { FC, useState } from 'react'
import CompanyHeader from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-header'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import CompanyAbout from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-about'
import EmployeesPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-page'
import EmployeesAddPersonnelForm from './employees-add-personnel-form'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'
import AddPersonnelButtonForm from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-add-personnel-button-form'
// import CompanyEditButton from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-button'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

interface Props {
  companyId: string
}

const CompanyPage: FC<Props> = ({ companyId }) => {
  const [editMode, setEditMode] = useState(false)
  const { showAddPersonnel, setShowAddPersonnel } = useCompanyContext()

  return (
    <Tabs defaultValue="about">
      <CompanyHeader id={companyId} />
      <div className="p-8 lg:mx-auto lg:max-w-5xl">
        <TabsContent value="about">
          <div className="ml-auto flex w-full flex-col lg:items-end lg:justify-center">
            <Button
              className="m-4 gap-2 rounded-md"
              onClick={() => setEditMode(true)}
            >
              <Pencil /> <span> Edit Company Details </span>
            </Button>
          </div>
          <CompanyAbout companyId={companyId} editMode={editMode} />
          {/*<Button*/}
          {/*  type="submit"*/}
          {/*  variant="default"*/}
          {/*  className="w-full rounded-md lg:w-auto mt-4"*/}
          {/*>*/}
          {/*  Submit*/}
          {/*</Button>*/}
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
