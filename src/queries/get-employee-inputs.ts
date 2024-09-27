import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getEmployeeInputs = (supabase: TypedSupabaseClient, id: string) => {
  return supabase
    .from('company_employees')
    .select(
      'id, first_name, last_name, birth_date, gender, civil_status, card_number, effective_date, room_plan, maximum_benefit_limit',
    )
    .eq('account_id', id)
    .throwOnError()
}

export default getEmployeeInputs
