import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getPendingCompanyEmployees = (
  supabase: TypedSupabaseClient,
  sort: 'asc' | 'desc' = 'desc',
) => {
  return supabase
    .from('pending_company_employees')
    .select(
      `
      id,
      is_active,
      account_id,
      account:account_id(id, company_name),
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
      created_by(first_name, last_name, user_id),
      is_approved,
      is_delete_employee,
      operation_type,
      batch_id,
      company_employee_id
    `,
      {
        count: 'exact',
      },
    )
    .eq('is_approved', false)
    .eq('is_active', true)
    .order('created_at', { ascending: sort === 'asc' })
    .throwOnError()

  // we don't need to check for the created_by column
  // since RLS already handle this for us
}

export default getPendingCompanyEmployees
