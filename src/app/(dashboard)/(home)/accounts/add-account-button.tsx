import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAccountsContext } from './accounts-provider'

const AddAccountButton = () => {
  const { isFormOpen, setIsFormOpen } = useAccountsContext()

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
