import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getBillingStatements = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('billing_statements')
    .select(
      `
      id,
      mode_of_premium:mode_of_premium_id(name),
      due_date,
      or_number,
      or_date,
      sa_number,
      amount,
      total_contract_value,
      balance,
      billing_period,
      amount_billed,
      amount_paid,
      commission_rate,
      commission_earned,
      created_at
      `,
    )
    .order('created_at', { ascending: true })
    .eq('is_active', true)
    .throwOnError()
}

export default getBillingStatements
