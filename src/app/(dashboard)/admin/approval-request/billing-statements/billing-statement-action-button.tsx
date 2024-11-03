import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import {
  useUpdateMutation,
  useUpsertMutation,
} from '@supabase-cache-helpers/postgrest-react-query'
import { ReactNode, useEffect } from 'react'

interface BillingStatementActionButtonProps {
  action: 'approve' | 'reject'
  children: ReactNode
}

const BillingStatementActionButton = ({
  action,
  children,
}: BillingStatementActionButtonProps) => {
  const supabase = createBrowserClient()
  const { toast } = useToast()
  const { selectedData, setIsModalOpen, setIsLoading } =
    useBillingStatementContext()

  const {
    mutateAsync: upsertBillingStatement,
    isPending: isUpsertingBillingStatement,
  } = useUpsertMutation(
    // @ts-expect-error
    supabase.from('billing_statements'),
    ['id'],
    null,
    {
      onError: () => {
        toast({
          title: 'Error',
          description: 'An error occurred while approving the request',
        })
      },
    },
  )

  const {
    mutateAsync: updatePendingBillingStatement,
    isPending: isUpdatingPendingBillingStatement,
  } = useUpdateMutation(
    // @ts-expect-error
    supabase.from('pending_billing_statements'),
    ['id'],
    null,
    {
      onError: () => {
        toast({
          title: 'Error',
          description: 'An error occurred while approving the request',
        })
      },
    },
  )

  const handleClick = async () => {
    if (action === 'approve') {
      await upsertBillingStatement([
        {
          ...(selectedData.id && { id: selectedData.id }),
          due_date: selectedData.due_date,
          or_number: selectedData.or_number,
          or_date: selectedData.or_date,
          sa_number: selectedData.sa_number,
          amount: selectedData.amount,
          total_contract_value: selectedData.total_contract_value,
          balance: selectedData.balance,
          billing_period: selectedData.billing_period,
          is_active: selectedData.is_active,
          amount_billed: selectedData.amount_billed,
          amount_paid: selectedData.amount_paid,
          commission_rate: selectedData.commission_rate,
          commission_earned: selectedData.commission_earned,
          created_at: selectedData.created_at,
          updated_at: selectedData.updated_at,
          account_id: selectedData.account.id,
          mode_of_payment_id: selectedData.mode_of_payment.id,
        },
      ]).catch((error) => {
        toast({
          title: 'Error',
          description: error.message,
        })
      })
    }

    // Update pending billing statement
    await updatePendingBillingStatement({
      id: selectedData.id,
      is_approved: action === 'approve',
    })
  }

  useEffect(() => {
    if (isUpsertingBillingStatement || isUpdatingPendingBillingStatement)
      setIsLoading(true)
    else setIsLoading(false)
  }, [isUpsertingBillingStatement, isUpdatingPendingBillingStatement])

  return <div onClick={handleClick}>{children}</div>
}

export default BillingStatementActionButton

function useBillingStatementContext(): {
  selectedData: any
  setIsModalOpen: any
  setIsLoading: any
} {
  throw new Error('Function not implemented.')
}
