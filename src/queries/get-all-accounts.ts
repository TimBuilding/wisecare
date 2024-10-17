import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getAllAccounts = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('accounts')
    .select('id, company_name')
    .order('created_at', { ascending: true })
    .throwOnError()
}

export default getAllAccounts
