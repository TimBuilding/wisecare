import React from 'react'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import { TabsTrigger } from '@/components/ui/tabs'

const BillingStatementTab = () => {
  const { userRole } = useCompanyContext()

  if (!userRole || !['finance'].includes(userRole)) {
    return null
  }

  return (
    <TabsTrigger value="billing" className="text-sm font-medium text-[#64748b]">
      Billing Statements
    </TabsTrigger>
  )
}

export default BillingStatementTab
