import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getEmployeeCount = (supabase: TypedSupabaseClient, id: string) => {
  return supabase
    .from('company_employees')
    .select('id', { count: 'exact', head: true })
    .eq('account_id', id)
    .eq('is_active', true)
    .throwOnError()
}

export default getEmployeeCount
