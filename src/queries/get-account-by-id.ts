import { TypedSupabaseClient } from '@/types/typedSupabaseClient'
// agent:user_profiles!agent_id(first_name, last_name, user_id),
const getAccountById = (supabase: TypedSupabaseClient, id: string) => {
  return supabase
    .from('accounts')
    .select(
      `
      id, 
      is_active,
      is_account_active,
      agent:user_profiles(first_name, last_name, user_id),
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
      mode_of_payment:mode_of_payments!mode_of_payment_id(name, id), 
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
      updated_at
      `,
    )
    .eq('id', id)
    .single()
    .throwOnError()
}

export default getAccountById
