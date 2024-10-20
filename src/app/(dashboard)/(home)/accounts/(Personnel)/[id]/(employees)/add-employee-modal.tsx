'use client'

import EmployeeForm from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-form'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const AddEmployeeModal = () => {
  const { userRole } = useCompanyContext()
  const [isOpen, setIsOpen] = useState(false)

  if (
    !userRole ||
    !['marketing', 'finance', 'under-writing', 'after-sales', 'admin'].includes(
      userRole,
    )
  ) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild={true}>
        <Button className="gap-2 rounded-md">
          <Plus /> <span> Add Employee </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add a new employee to the company</DialogDescription>

        {/* Employee Form */}
        <EmployeeForm setIsOpen={setIsOpen} />
        {/* End of Employee Form */}
      </DialogContent>
    </Dialog>
  )
}

export default AddEmployeeModal
