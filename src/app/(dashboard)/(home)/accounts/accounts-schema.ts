import { z } from 'zod'

const accountsSchema = z.object({
  is_active: z.boolean(),
  agent_id: z.string(),
  company_name: z.string(),
  company_address: z.string(),
  nature_of_business: z.string(),
  hmo_provider_id: z.string(),
  previous_hmo_provider_id: z.string(),
  current_hmo_provider_id: z.string(),
  account_type_id: z.string(),
  total_utilization: z.preprocess(
    (val) => parseFloat(val as string),
    z.number(),
  ),
  total_premium_paid: z.preprocess(
    (val) => parseFloat(val as string),
    z.number(),
  ),
  signatory_designation: z.string(),
  contact_person: z.string(),
  contact_number: z.string(),
  principal_plan_type_id: z.string(),
  dependent_plan_type_id: z.string(),
  initial_head_count: z.preprocess(
    (val) => parseInt(val as string),
    z.number(),
  ),
  effectivity_date: z.date(),
  coc_issue_date: z.date(),
  effective_date: z.date(),
  renewal_date: z.date(),
  expiration_date: z.date(),
  delivery_date_of_membership_ids: z.date(),
  orientation_date: z.date(),
  initial_contract_value: z.preprocess(
    (val) => parseFloat(val as string),
    z.number(),
  ),
  mode_of_payment_id: z.string(),
  wellness_lecture_date: z.date(),
  annual_physical_examination_date: z.date(),
  commision_rate: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().nonnegative(),
  ),
  additional_benefits: z.string(),
  special_benefits: z.string(),
})

export default accountsSchema