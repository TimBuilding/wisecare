import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getAgents = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('departments')
    .select('user_profiles(user_id, first_name, last_name, email, created_at)')
    .eq('name', 'agent')
    .order('created_at', { ascending: false })
    .throwOnError()
}

export default getAgents
