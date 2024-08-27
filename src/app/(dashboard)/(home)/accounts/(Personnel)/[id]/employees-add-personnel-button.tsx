'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import EmployeesPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-page'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'

const EmployeesAddPersonnelButton = () => {
  const { showAddPersonnel, setShowAddPersonnel } = useCompanyContext()
  return (
    <Button
      variant="default"
      className="w-full rounded-md lg:w-auto"
      type="button"
      onClick={() => setShowAddPersonnel(false)}
    >
      Cancel
    </Button>
  )
}

export default EmployeesAddPersonnelButton
