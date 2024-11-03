import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getPendingBillingStatements = (
  supabase: TypedSupabaseClient,
  sort: 'asc' | 'desc' = 'desc',
) => {
  return supabase
    .from('pending_billing_statements')
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
      is_active,
      amount_billed,
      amount_paid,
      commission_rate,
      commission_earned,
      created_at,
      updated_at,
      account: account_id(id, company_name),
      mode_of_payment_id,
      created_by(first_name, last_name),
      is_approved,
      operation_type,
      is_delete_billing_statement
    `,
      {
        count: 'exact',
      },
    )
    .eq('is_approved', 'false')
    .eq('is_active', true)
    .order('created_at', { ascending: sort === 'asc' })
    .throwOnError()

  // we don't need to check for the created_by column
  // since RLS already handle this for us
}

export default getPendingBillingStatements
