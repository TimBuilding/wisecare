'use client'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import useConfirmationStore from '@/components/confirmation-dialog/confirmationStore'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Trash2 } from 'lucide-react'
import { FC } from 'react'

interface DeleteEmployeeProps {
  employeeId: string
}

const DeleteEmployee: FC<DeleteEmployeeProps> = ({ employeeId }) => {
  const { userRole } = useCompanyContext()
  const { openConfirmation, closeConfirmation } = useConfirmationStore()
  const supabase = createBrowserClient()
  const { toast } = useToast()

  const { mutateAsync, isPending } = useUpdateMutation(
    // @ts-ignore
    supabase.from('company_employees'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Success',
          description: 'Employee deleted',
        })
        closeConfirmation()
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.message,
        })
      },
    },
  )

  if (
    !userRole ||
    !['marketing', 'finance', 'under-writing', 'after-sales', 'admin'].includes(
      userRole,
    )
  ) {
    return null
  }

  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer text-destructive"
        disabled={isPending}
        onClick={() => {
          openConfirmation({
            title: 'Are you sure?',
            description:
              'This action CANNOT be undone. This will permanently delete the employee.',
            cancelLabel: 'Cancel',
            actionLabel: 'I understand, delete this employee',
            confirmationButtonVariant: 'destructive',
            onAction: async () =>
              await mutateAsync({
                id: employeeId,
                is_active: false,
              }),
            onCancel: () => {},
          })
        }}
      >
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </DropdownMenuItem>
    </>
  )
}

export default DeleteEmployee
