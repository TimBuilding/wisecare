import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getPendingAccounts = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('accounts')
    .select(
      'id, agent:user_profiles!agent_id(first_name), company_name, created_at',
    )
    .order('created_at', { ascending: true })
    .or(
      'mode_of_premium_id.is.null,due_date.is.null,or_number.is.null,sa_number.is.null,amount.is.null,total_contract_value.is.null,balance.is.null',
    )
    .throwOnError()
}

export default getPendingAccounts
