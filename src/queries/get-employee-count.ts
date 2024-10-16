import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getEmployeeCount = (supabase: TypedSupabaseClient, id: string) => {
  return supabase
    .from('company_employees')
    .select('*', { count: 'exact', head: true })
    .eq('account_id', id)
    .throwOnError()
}

export default getEmployeeCount
