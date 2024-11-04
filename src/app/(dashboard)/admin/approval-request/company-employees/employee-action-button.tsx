import { usePendingEmployeeContext } from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employee-provider'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import {
  useUpdateMutation,
  useUpsertMutation,
} from '@supabase-cache-helpers/postgrest-react-query'
import { FC, ReactNode, useEffect } from 'react'

interface EmployeeActionButtonProps {
  action: 'approve' | 'reject'
  children: ReactNode
}

const EmployeeActionButton: FC<EmployeeActionButtonProps> = ({
  action,
  children,
}) => {
  const supabase = createBrowserClient()
  const { toast } = useToast()
  const { selectedData, setIsModalOpen, setIsLoading } =
    usePendingEmployeeContext()

  const { mutateAsync: upsertEmployee, isPending: isUpsertingEmployee } =
    useUpsertMutation(
      // @ts-ignore
      supabase.from('company_employees'),
      ['id'],
      null,
      {
        onError: () => {
          toast({
            title: 'Error',
            variant: 'destructive',
            description: 'An error occurred while approving the request',
          })
        },
      },
    )

  const {
    mutateAsync: updatePendingEmployee,
    isPending: isUpdatingPendingEmployee,
  } = useUpdateMutation(
    // @ts-ignore
    supabase.from('pending_company_employees'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'The request has been approved successfully',
        })
        setIsModalOpen(false)
      },
      onError: () => {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: 'An error occurred while approving the request',
        })
      },
    },
  )

  const handleClick = async () => {
    if (!selectedData) return
    if (action === 'approve') {
      await upsertEmployee([
        {
          ...(selectedData.company_employee_id && {
            id: selectedData.company_employee_id,
          }),
          account_id: selectedData.account_id,
          first_name: selectedData.first_name,
          last_name: selectedData.last_name,
          birth_date: selectedData.birth_date,
          gender: selectedData.gender,
          civil_status: selectedData.civil_status,
          card_number: selectedData.card_number,
          effective_date: selectedData.effective_date,
          room_plan: selectedData.room_plan,
          maximum_benefit_limit: selectedData.maximum_benefit_limit,
          created_by: (selectedData.created_by as any)?.user_id,
          is_active: selectedData.is_delete_employee ? false : true,
        },
      ]).catch((error) => {
        toast({
          title: 'Error',
          description: error.message,
        })
      })
    }

    // Update pending employee
    await updatePendingEmployee({
      id: selectedData.id,
      is_approved: action === 'approve',
      is_active: action === 'approve',
    })
  }

  useEffect(() => {
    if (isUpsertingEmployee || isUpdatingPendingEmployee) setIsLoading(true)
    else setIsLoading(false)
  }, [isUpsertingEmployee, isUpdatingPendingEmployee])

  return <div onClick={handleClick}>{children}</div>
}

export default EmployeeActionButton
