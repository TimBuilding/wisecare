import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getUsers = (supabase: TypedSupabaseClient) => {
  return (
    supabase
      .from('user_profiles')
      .select('user_id,first_name,last_name,departments(name)', {
        count: 'exact',
      })
      .neq('departments.name', 'agent')
      // .order('first_name')
      .throwOnError()
  )
}

export default getUsers
