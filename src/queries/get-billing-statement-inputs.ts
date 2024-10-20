import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getBillingStatementInputs = (
  supabase: TypedSupabaseClient,
  id: string,
) => {
  return supabase
    .from('billing_statements')
    .select(
      'id, mode_of_premium_id, due_date, or_number, or_date, sa_number, amount, total_contract_value, balance, billing_period, is_active, amount_billed, amount_paid, commission_rate, commission_earned',
    )
    .eq('account_id', id)
    .order('created_at', { ascending: false })
    .throwOnError()
}

export default getBillingStatementInputs
