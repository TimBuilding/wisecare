import React from 'react'
import CompanyHeader from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-header'
import CompanyAbout from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-about'
import TabsContextProvider from '@/components/personnel-layout/TabsContextProvider'
import { TabsContent } from '@/components/ui/tabs'

const Page = () => {
  return (
    <>
      <CompanyHeader />
      <div className="px-8 py-6">
        <TabsContextProvider>
          <TabsContent value="about">
            <CompanyAbout />
          </TabsContent>
          <TabsContent value="employees">
            {/* Employee content goes here */}
          </TabsContent>
        </TabsContextProvider>
      </div>
    </>
  )
}

export default Page
