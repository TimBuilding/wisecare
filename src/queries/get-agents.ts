import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getAgents = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('user_profiles')
    .select('user_id, first_name, last_name, created_at, departments(name)')
    .eq('departments.name', 'agent')
    .throwOnError()
}

export default getAgents
