import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getPendingAccounts = (
  supabase: TypedSupabaseClient,
  sort: 'asc' | 'desc' = 'desc',
) => {
  return supabase
    .from('pending_accounts')
    .select(
      `
    id,
    agent:agent_id(first_name, last_name, user_id),
    company_name,
    company_address,
    nature_of_business,
    hmo_provider:hmo_provider_id(name, id),
    previous_hmo_provider:previous_hmo_provider_id(name, id),
    current_hmo_provider:current_hmo_provider_id(name, id),
    account_type:account_types(name, id),
    total_utilization,
    total_premium_paid,
    signatory_designation,
    contact_person,
    contact_number,
    principal_plan_type:principal_plan_type_id(name, id),
    dependent_plan_type:dependent_plan_type_id(name, id),
    initial_head_count,
    effectivity_date,
    coc_issue_date,
    expiration_date,
    delivery_date_of_membership_ids,
    orientation_date,
    initial_contract_value,
    mode_of_payment:mode_of_payment_id(name, id),
    wellness_lecture_date,
    annual_physical_examination_date,
    commision_rate,
    additional_benefits,
    special_benefits,
    summary_of_benefits,
    name_of_signatory,
    designation_of_contact_person,
    email_address_of_contact_person,
    created_at,
    updated_at,
    is_active,
    is_approved,
    created_by(first_name, last_name),
    account_id,
    operation_type,
    is_delete_account
  `,
      {
        count: 'exact',
      },
    )
    .eq('is_approved', 'false')
    .eq('is_active', true)
    .order('created_at', { ascending: sort === 'asc' })
    .throwOnError()

  // we don't need to check for the created_by column
  //since RLS already handle this for us
}

export default getPendingAccounts
