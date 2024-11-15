import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getCurrentUser = (supabase: TypedSupabaseClient, userId: string) => {
  return supabase
    .from('user_profiles')
    .select('id, first_name, last_name')
    .eq('id', userId)
    .single()
    .throwOnError()
}

export default getCurrentUser
