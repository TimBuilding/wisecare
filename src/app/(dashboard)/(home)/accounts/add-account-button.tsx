'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAccountsContext } from './accounts-provider'
import getRole from '@/utils/get-role'
import { useQuery } from '@tanstack/react-query'

const AddAccountButton = () => {
  const { isFormOpen, setIsFormOpen } = useAccountsContext()

  const { data: role, error } = useQuery({
    queryKey: ['role'],
    queryFn: () => getRole(),
  })

  if (error || role !== 'marketing') {
    return null
  }

  console.log(role)

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
