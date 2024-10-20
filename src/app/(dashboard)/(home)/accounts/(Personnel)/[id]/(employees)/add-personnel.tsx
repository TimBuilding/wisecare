'use client'

import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const AddPersonnel = () => {
  const { userRole } = useCompanyContext()

  if (
    !userRole ||
    !['marketing', 'finance', 'under-writing', 'after-sales', 'admin'].includes(
      userRole,
    )
  ) {
    return null
  }

  return (
    <Button className="m-4 gap-2 rounded-md">
      <Plus /> <span> Add Personnel </span>
    </Button>
  )
}

export default AddPersonnel
