'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAccountsContext } from './accounts-provider'
import getRole from '@/utils/get-role'
import { useQuery } from '@tanstack/react-query'

const AddAccountButton = () => {
  const { isFormOpen, setIsFormOpen } = useAccountsContext()
  const allowedRole = [
    'admin',
    'marketing',
    'finance',
    'under-writing',
    'after-sales',
  ]

  const { data: role, error } = useQuery({
    queryKey: ['role'],
    queryFn: () => getRole(),
  })

  if (!role || !allowedRole.includes(role)) {
    return null
  }

  return (
    <Button
      className="space-x-2"
      onClick={() => setIsFormOpen(true)}
      disabled={isFormOpen}
    >
      <Plus />
      <span>Add</span>
    </Button>
  )
}

export default AddAccountButton
