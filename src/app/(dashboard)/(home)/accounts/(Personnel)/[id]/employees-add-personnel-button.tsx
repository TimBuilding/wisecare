'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import EmployeesPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-page'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'

interface EmployeesAddPersonnelButtonProps {
  isPending: boolean
}

const EmployeesAddPersonnelButton = ({
  isPending,
}: EmployeesAddPersonnelButtonProps) => {
  const { setShowAddPersonnel } = useCompanyContext()
  return (
    <Button
      variant="outline"
      className="w-full rounded-md lg:w-auto"
      type="button"
      onClick={() => setShowAddPersonnel(false)}
      disabled={isPending}
    >
      Cancel
    </Button>
  )
}

export default EmployeesAddPersonnelButton
