import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getAccounts = (supabase: TypedSupabaseClient) => {
  return supabase
    .from('accounts')
    .select(
      'id, is_active, agent:user_profiles!agent_id(first_name), company_name, company_address, nature_of_business, hmo_provider:hmo_providers!hmo_provider_id(name), previous_hmo_provider:hmo_providers!previous_hmo_provider_id(name), current_hmo_provider:hmo_providers!current_hmo_provider_id(name), account_type:account_types!account_type_id(name), total_utilization, total_premium_paid, signatory_designation, contact_person, contact_number, principal_plan_type:plan_types!principal_plan_type_id(name), dependent_plan_type:plan_types!dependent_plan_type_id(name), initial_head_count, effectivity_date, coc_issue_date, effective_date, renewal_date, expiration_date, delivery_date_of_membership_ids, orientation_date, initial_contract_value, mode_of_payment:mode_of_payments!mode_of_payment_id(name), wellness_lecture_date, annual_physical_examination_date, commision_rate, additional_benefits, special_benefits, mode_of_premium:mode_of_premium!mode_of_premium_id(name), due_date, or_number, or_date, sa_number, amount, total_contract_value, balance, billing_period, summary_of_benefits, created_at, updated_at',
    )
    .throwOnError()
}

export default getAccounts
