import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getEmployeeInputs = (supabase: TypedSupabaseClient, id: string) => {
  return supabase
    .from('company_employees')
    .select(
      'id, first_name, last_name, employee_number, real_description, gender, civil_status, birth_date, age, residential_address, bill_care_of, bill_address, bill_city_municipal, bill_province, email, telephone_number, mobile_number, agent_name, philhealth, payment_mode, plan_type, plan_description, created_at, updated_at',
    )
    .eq('account_id', id)
    .throwOnError()
}

export default getEmployeeInputs
