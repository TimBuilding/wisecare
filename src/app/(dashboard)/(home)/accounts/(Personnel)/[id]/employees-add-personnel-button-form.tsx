'use client'

import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'
import { useQuery } from '@tanstack/react-query'
import getRole from '@/utils/get-role'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Plus } from 'lucide-react'

const AddPersonnelButtonForm = () => {
  const { showAddPersonnel, setShowAddPersonnel } = useCompanyContext()

  const { data: role, error } = useQuery({
    queryKey: ['role'],
    queryFn: () => getRole(),
  })

  if (error || role !== 'under-writing') {
    return null
  }

  return (
    <>
      {!showAddPersonnel && (
        <Button
          className="m-4 gap-2 rounded-md"
          onClick={() => setShowAddPersonnel(true)}
        >
          <Plus /> <span> Add Personnel </span>
        </Button>
      )}
    </>
  )
}

export default AddPersonnelButtonForm
