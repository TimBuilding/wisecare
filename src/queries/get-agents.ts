import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getAgents = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('user_profiles')
    .select('user_id, first_name, last_name')
    .eq('department_id', '6')
    .throwOnError()
}

export default getAgents
