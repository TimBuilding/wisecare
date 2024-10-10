import { z } from 'zod'

const companyEditsSchema = z.object({
  //marketing
  is_active: z.union([z.boolean(), z.string()]),
  agent_id: z.string().optional(),
  company_name: z.string().optional(),
  company_address: z.string().optional(),
  nature_of_business: z.string().optional(),
  hmo_provider_id: z.string().optional(),
  previous_hmo_provider_id: z.string().optional(),
  current_hmo_provider_id: z.string().optional(),
  account_type_id: z.string().optional(),
  total_utilization: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().optional(),
  ),
  total_premium_paid: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().optional(),
  ),
  signatory_designation: z.string().optional(),
  contact_person: z.string().optional(),
  contact_number: z.string().optional(),
  principal_plan_type_id: z.string().optional(),
  dependent_plan_type_id: z.string().optional(),
  initial_head_count: z.preprocess(
    (val) => (val === null ? null : parseInt(val as string)),
    z.number().optional(),
  ),
  effectivity_date: z.date().optional(),
  coc_issue_date: z.date().optional(),
  expiration_date: z.date().optional(),
  delivery_date_of_membership_ids: z.date().optional(),
  orientation_date: z.date().optional(),
  initial_contract_value: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().optional(),
  ),
  mode_of_payment_id: z.string().optional(),
  wellness_lecture_date: z.date().optional(),
  annual_physical_examination_date: z.date().optional(),
  commision_rate: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().nonnegative().optional(),
  ),
  additional_benefits: z.string().optional(),
  special_benefits: z.string().optional(),
  name_of_signatory: z.string().optional(),
  designation_of_contact_person: z.string().optional(),
  email_address_of_contact_person: z.string().optional(),
  //finance
  mode_of_premium_id: z.string().optional(),
  due_date: z.date().optional(),
  or_number: z.string().optional(),
  or_date: z.date().optional(),
  sa_number: z.string().optional(),
  amount: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().optional(),
  ),
  total_contract_value: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().optional(),
  ),
  balance: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().optional(),
  ),
  billing_period: z.preprocess(
    (val) => (val === null ? null : parseInt(val as string)),
    z.number().min(1).max(31).optional(),
  ),
})

export default companyEditsSchema
