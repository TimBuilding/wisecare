import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Tables } from '@/types/database.types'
import { createBrowserClient } from '@/utils/supabase'
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface DeleteEmployeeRequestProps {
  data: Tables<'pending_company_employees'>
}

const DeleteEmployeeRequest = ({ data }: DeleteEmployeeRequestProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { toast } = useToast()

  const supabase = createBrowserClient()
  const { mutate: updatePendingEmployee, isPending } = useUpdateMutation(
    // @ts-ignore
    supabase.from('pending_company_employees'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Request deleted!',
          description: 'Successfully deleted request',
        })
      },
      onError: (err: any) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message,
        })
      },
    },
  )

  const handleDelete = () => {
    updatePendingEmployee({
      id: data.id,
      is_active: false,
    })
  }
  return (
    <>
      {confirmDelete ? (
        <Button
          size={'sm'}
          variant={'link'}
          className="ml-auto px-0 text-xs text-destructive"
          disabled={isPending}
          onClick={handleDelete}
        >
          {isPending ? <Loader2 className="animate-spin" /> : 'Are you sure?'}
        </Button>
      ) : (
        <Button
          size={'sm'}
          variant={'link'}
          className="ml-auto px-0 text-xs text-destructive"
          onClick={() => setConfirmDelete(true)}
        >
          Cancel
        </Button>
      )}
    </>
  )
}

export default DeleteEmployeeRequest
