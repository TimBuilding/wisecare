'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import EmployeesPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-page'

const EmployeesAddPersonnelButton = () => {
  const [showEmployees, setShowEmployees] = useState(false)
  const toggleEmployees = () => setShowEmployees(!showEmployees)
  return (
    <>
      {!showEmployees && (
        <Button
          variant="default"
          className="w-full rounded-md lg:w-auto"
          type="button"
          onClick={toggleEmployees}
        >
          {' '}
          Cancel{' '}
        </Button>
      )}
      {showEmployees && <EmployeesPage />}
    </>
  )
}

export default EmployeesAddPersonnelButton
