import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getAccounts = (
  supabase: TypedSupabaseClient,
  filter?: string,
  start_offset?: number,
  end_offset?: number,
) => {
  return supabase
    .rpc('search_accounts', {
      account_term: filter || '',
      start_offset: start_offset || 0,
      end_offset: end_offset || 10,
    })
    .throwOnError()
}

export default getAccounts
