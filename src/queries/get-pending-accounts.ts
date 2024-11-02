import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getPendingAccounts = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('pending_accounts')
    .select(
      `
    id,
    agent_id,
    company_name,
    company_address,
    nature_of_business,
    hmo_provider_id,
    previous_hmo_provider_id,
    current_hmo_provider_id,
    account_type_id,
    total_utilization,
    total_premium_paid,
    signatory_designation,
    contact_person,
    contact_number,
    principal_plan_type_id,
    dependent_plan_type_id,
    initial_head_count,
    effectivity_date,
    coc_issue_date,
    expiration_date,
    delivery_date_of_membership_ids,
    orientation_date,
    initial_contract_value,
    mode_of_payment_id,
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
    created_by,
    account_id,
    operation_type
  `,
      {
        count: 'exact',
      },
    )
    .eq('is_approved', 'false')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .throwOnError()

  // we don't need to check for the created_by column
  //since RLS already handle this for us
}

export default getPendingAccounts
