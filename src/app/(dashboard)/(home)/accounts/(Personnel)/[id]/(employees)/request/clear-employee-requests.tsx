'use client'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import getPendingEmployeeByCompanyId from '@/queries/get-pending-employee-by-company-id'
import { createBrowserClient } from '@/utils/supabase'
import {
  useQuery,
  useUpsertMutation,
} from '@supabase-cache-helpers/postgrest-react-query'
import { useState } from 'react'

const ClearEmployeeRequests = () => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const supabase = createBrowserClient()
  const { accountId } = useCompanyContext()

  const { data: pendingEmployees } = useQuery(
    getPendingEmployeeByCompanyId(supabase, accountId),
  )

  const { mutateAsync: deletePendingEmployees, isPending } = useUpsertMutation(
    // @ts-ignore
    supabase.from('pending_company_employees'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Requests cleared!',
          description: 'Successfully cleared requests',
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
    // if confirmDelete is false, set it to true
    if (confirmDelete === false) {
      setConfirmDelete(true)
      return
    } else {
      // if confirmDelete is true, delete the requests
      if (pendingEmployees) {
        deletePendingEmployees([
          ...pendingEmployees.map((employee) => ({
            id: employee.id,
            is_active: false,
            account_id: accountId,
            first_name: employee.first_name,
            last_name: employee.last_name,
            gender: employee?.gender,
            civil_status: employee?.civil_status,
            card_number: employee?.card_number,
            effective_date: employee?.effective_date,
            room_plan: employee?.room_plan,
            maximum_benefit_limit: employee?.maximum_benefit_limit,
            birth_date: employee?.birth_date,
            created_by: (employee.created_by as any).user_id,
            operation_type: employee?.operation_type,
            batch_id: employee?.batch_id,
            updated_at: new Date().toISOString(),
          })),
        ])
        setConfirmDelete(false)
      }
    }
  }

  return (
    <Button
      variant={'link'}
      size={'sm'}
      className="text-xs text-destructive"
      onClick={handleDelete}
      disabled={isPending || pendingEmployees?.length === 0}
    >
      {confirmDelete ? 'Are you sure?' : 'Clear Requests'}
    </Button>
  )
}

export default ClearEmployeeRequests
