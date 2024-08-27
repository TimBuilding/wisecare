import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getEmployeeInputs = (supabase: TypedSupabaseClient, id: string) => {
  return supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single()
    .throwOnError()
}

export default getEmployeeInputs
