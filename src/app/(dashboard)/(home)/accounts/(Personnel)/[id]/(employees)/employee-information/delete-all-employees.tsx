import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import ConfirmationDialog from '@/components/confirmation-dialog/confirmation-dialog'
import useConfirmationStore from '@/components/confirmation-dialog/confirmationStore'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import getEmployeeByCompanyId from '@/queries/get-employee-by-company-id'
import { createBrowserClient } from '@/utils/supabase'
import {
  useInsertMutation,
  useQuery,
} from '@supabase-cache-helpers/postgrest-react-query'
import { FC, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface DeleteAllEmployeesProps {
  button: ReactNode
}

const DeleteAllEmployees: FC<DeleteAllEmployeesProps> = ({ button }) => {
  const { openConfirmation } = useConfirmationStore()
  const supabase = createBrowserClient()
  const { accountId } = useCompanyContext()

  // get all employees
  const { data: employees } = useQuery(
    getEmployeeByCompanyId(supabase, accountId),
  )

  const { mutateAsync, isPending } = useInsertMutation(
    // @ts-ignore
    supabase.from('pending_company_employees'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Employee deletion request submitted!',
          description:
            'Your request to delete all employees has been submitted successfully and is awaiting approval.',
        })
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

  const handleDelete = async () => {
    // check if employees exist
    if (!employees) return

    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    // generate a batch id
    const batchId = uuidv4()

    // insert "delete request" for each employee
    await mutateAsync(
      employees?.map((employee) => ({
        account_id: accountId,
        first_name: employee.first_name,
        last_name: employee.last_name,
        birth_date: employee.birth_date,
        gender: employee.gender,
        civil_status: employee.civil_status,
        card_number: employee.card_number,
        effective_date: employee.effective_date,
        room_plan: employee.room_plan,
        maximum_benefit_limit: employee.maximum_benefit_limit,
        company_employee_id: employee.id,
        operation_type: 'delete',
        is_delete_employee: true,
        is_active: true,
        created_by: user.id,
        batch_id: batchId,
      })),
    )
  }

  return (
    <div
      onClick={() => {
        openConfirmation({
          title: 'Delete All Employees?',
          description:
            'Are you sure you want to delete all employees? This action CANNOT be undone.',
          actionLabel: 'I understand, delete all employees',
          cancelLabel: 'Cancel',
          onAction: handleDelete,
          onCancel: () => {},
        })
      }}
    >
      {button}
    </div>
  )
}

export default DeleteAllEmployees
