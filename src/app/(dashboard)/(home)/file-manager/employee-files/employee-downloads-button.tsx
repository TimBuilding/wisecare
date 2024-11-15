import React from 'react'
import { Button } from '@/components/ui/button'

const EmployeeDownloadsButton = () => {
  return (
    <>
      <Button className="w-full">Export File</Button>
      <Button variant="outline" className="w-full">
        Cancel
      </Button>
    </>
  )
}

export default EmployeeDownloadsButton
