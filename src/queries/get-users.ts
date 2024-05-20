import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getUsers = async (supabase: TypedSupabaseClient) => {
  return supabase
    .from('user_profiles')
    .select('user_id, first_name, last_name, department')
    .order('first_name')
    .throwOnError()
}

export default getUsers
