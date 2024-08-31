import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getAgents = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('departments')
    .select('user_profiles(user_id, first_name, last_name, created_at)')
    .eq('name', 'agent')
    .throwOnError()
}

export default getAgents
