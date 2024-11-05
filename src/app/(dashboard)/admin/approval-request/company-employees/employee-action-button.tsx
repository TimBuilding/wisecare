import { usePendingEmployeeContext } from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employee-provider'
import { useToast } from '@/components/ui/use-toast'
import { Tables } from '@/types/database.types'
import { createBrowserClient } from '@/utils/supabase'
import { useUpsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
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
  } = useUpsertMutation(
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
      await upsertEmployee(
        (selectedData as any)?.items
          ? (selectedData as any)?.items.map((item: any) => ({
              account_id: item.account_id,
              first_name: item.first_name,
              last_name: item.last_name,
              birth_date: item.birth_date,
              gender: item.gender,
              civil_status: item.civil_status,
              card_number: item.card_number,
              effective_date: item.effective_date,
              room_plan: item.room_plan,
              maximum_benefit_limit: item.maximum_benefit_limit,
              created_by: (item.created_by as any)?.user_id,
            }))
          : [
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
            ],
      ).catch((error) => {
        toast({
          title: 'Error',
          description: error.message,
        })
      })
    }

    // Update pending employee
    if ((selectedData as any)?.items) {
      await updatePendingEmployee(
        (selectedData as any).items.map(
          (item: Tables<'pending_company_employees'>) => ({
            id: item.id,
            is_approved: action === 'approve',
            is_active: action === 'approve',
            created_by: (item.created_by as any)?.user_id,
            operation_type: item.operation_type,
            batch_id: item.batch_id,
            first_name: item.first_name,
            last_name: item.last_name,
            birth_date: item.birth_date,
            gender: item.gender,
            civil_status: item.civil_status,
            card_number: item.card_number,
            effective_date: item.effective_date,
            room_plan: item.room_plan,
            maximum_benefit_limit: item.maximum_benefit_limit,
          }),
        ),
      ).catch((error) => {
        toast({
          title: 'Error',
          description: error.message,
        })
      })
    } else {
      await updatePendingEmployee([
        {
          id: selectedData.id,
          is_approved: action === 'approve',
          is_active: action === 'approve',
          created_by: (selectedData.created_by as any)?.user_id,
          operation_type: selectedData.operation_type,
          batch_id: selectedData.batch_id,
          first_name: selectedData.first_name,
          last_name: selectedData.last_name,
          birth_date: selectedData.birth_date,
          gender: selectedData.gender,
          civil_status: selectedData.civil_status,
          card_number: selectedData.card_number,
          effective_date: selectedData.effective_date,
          room_plan: selectedData.room_plan,
          maximum_benefit_limit: selectedData.maximum_benefit_limit,
        },
      ]).catch((error) => {
        toast({
          title: 'Error',
          description: error.message,
        })
      })
    }
  }

  useEffect(() => {
    if (isUpsertingEmployee || isUpdatingPendingEmployee) setIsLoading(true)
    else setIsLoading(false)
  }, [isUpsertingEmployee, isUpdatingPendingEmployee, setIsLoading])

  return <div onClick={handleClick}>{children}</div>
}

export default EmployeeActionButton
