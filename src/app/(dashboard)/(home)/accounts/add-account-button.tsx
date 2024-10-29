'use client'
import AddAccountForm from '@/app/(dashboard)/(home)/accounts/add-account-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import getRole from '@/utils/get-role'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const AddAccountButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const allowedRole = [
    'admin',
    'marketing',
    'finance',
    'under-writing',
    'after-sales',
  ]

  const { data: role } = useQuery({
    queryKey: ['role'],
    queryFn: () => getRole(),
  })

  if (!role || !allowedRole.includes(role)) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <Plus />
          <span>Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>Add a new account to the system</DialogDescription>
        </DialogHeader>
        <AddAccountForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddAccountButton
