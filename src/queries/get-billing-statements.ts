import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getBillingStatements = (
  supabase: TypedSupabaseClient,
  filter?: string,
  start_offset?: number,
  end_offset?: number,
) => {
  return supabase
    .rpc('search_billing_statements', {
      billing_term: filter || '',
      start_offset: start_offset || 0,
      end_offset: end_offset || 10,
    })
    .throwOnError()
}

export default getBillingStatements
