'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import EmployeesAddPersonnelForm from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-add-personnel-form'
import EmployeesPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-page'

const EmployeesAddPersonnelButton = () => {
  const [showEmployees, setShowEmployees] = useState(false)
  const toggleEmployees = () => setShowEmployees(!showEmployees)
  return (
    <>
      <div className="mt-4 flex flex-row items-center justify-between gap-4 lg:ml-auto lg:justify-end">
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
        {!showEmployees && (
          <Button
            type="submit"
            variant="default"
            className="w-full rounded-md lg:w-auto"
          >
            Submit
          </Button>
        )}
      </div>
      {!showEmployees ? <EmployeesAddPersonnelForm /> : <EmployeesPage />}
    </>
  )
}

export default EmployeesAddPersonnelButton
