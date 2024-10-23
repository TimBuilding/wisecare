'use client'

import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { FC } from 'react'

interface Props {
  role: string | null
}

const CompanyEditButton: FC<Props> = ({ role }) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const allowedRole = [
    'admin',
    'marketing',
    'finance',
    'under-writing',
    'after-sales',
  ]

  if (!role || !allowedRole.includes(role)) {
    return null
  }

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
