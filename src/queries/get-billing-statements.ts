import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getBillingStatements = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('billing_statements')
    .select(
      `
    id,
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
    created_at,
    updated_at,
    account:accounts(id, company_name),
    mode_of_payment:mode_of_payments(id, name)
  `,
      {
        count: 'exact',
      },
    )
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .throwOnError()
}

export default getBillingStatements
