'use client'

import React from 'react'
import CompanyHeader from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-header'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import CompanyAbout from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-about'

const CompanyPage = () => {
  return (
    <Tabs defaultValue="about">
      <CompanyHeader />
      <div className="p-8 lg:mx-auto lg:max-w-5xl">
        <TabsContent value="about">
          <CompanyAbout />
        </TabsContent>
        <TabsContent value="employees">
          <>hello</>
          {/* Employee content goes here */}
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default CompanyPage
