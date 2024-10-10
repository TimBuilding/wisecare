'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { Pencil, Plus } from 'lucide-react'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'

const CompanyEditButton = () => {
  const { editMode, setEditMode } = useCompanyEditContext()

  return (
    <>
      {!editMode && (
        <Button
          className="w-full gap-2 rounded-md md:max-w-xs"
          onClick={() => setEditMode(true)}
        >
          <Pencil /> <span> Edit Company Details </span>
        </Button>
      )}
    </>
  )
}

export default CompanyEditButton
