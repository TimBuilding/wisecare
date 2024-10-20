import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getEmployeeByCompanyId = (
  supabase: TypedSupabaseClient,
  companyId: string,
) => {
  return supabase
    .from('company_employees')
    .select(
      `
      id,
      is_active,
      account_id,
      first_name,
      last_name,
      birth_date,
      gender,
      civil_status,
      card_number,
      effective_date,
      room_plan,
      maximum_benefit_limit,
      created_at,
      updated_at,
      created_by
    `,
    )
    .eq('account_id', companyId)
    .throwOnError()
    .order('created_at', { ascending: false })
}

export default getEmployeeByCompanyId
