import { z } from 'zod'

const companyEditsSchema = z.object({
  //marketing
  is_active: z.union([z.boolean(), z.string()]),
  agent_id: z.string().nullable(),
  company_name: z.string().nullable(),
  company_address: z.string().nullable(),
  nature_of_business: z.string().nullable(),
  hmo_provider_id: z.string().nullable(),
  previous_hmo_provider_id: z.string().nullable(),
  current_hmo_provider_id: z.string().nullable(),
  account_type_id: z.string().nullable(),
  total_utilization: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  total_premium_paid: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  signatory_designation: z.string().nullable(),
  contact_person: z.string().nullable(),
  contact_number: z.string().nullable(),
  principal_plan_type_id: z.string().nullable(),
  dependent_plan_type_id: z.string().nullable(),
  initial_head_count: z.preprocess(
    (val) => (val === null ? null : parseInt(val as string)),
    z.number().nullable(),
  ),
  effectivity_date: z.date().nullable(),
  coc_issue_date: z.date().nullable(),
  expiration_date: z.date().nullable(),
  delivery_date_of_membership_ids: z.date().nullable(),
  orientation_date: z.date().nullable(),
  initial_contract_value: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  mode_of_payment_id: z.string().nullable(),
  wellness_lecture_date: z.date().nullable(),
  annual_physical_examination_date: z.date().nullable(),
  commision_rate: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().nonnegative().nullable(),
  ),
  additional_benefits: z.string().nullable(),
  special_benefits: z.string().nullable(),
  name_of_signatory: z.string().nullable(),
  designation_of_contact_person: z.string().nullable(),
  email_address_of_contact_person: z.string().nullable(),
  //finance
  mode_of_premium_id: z.string().nullable(),
  due_date: z.date().nullable(),
  or_number: z.string().nullable(),
  or_date: z.date().nullable(),
  sa_number: z.string().nullable(),
  amount: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  total_contract_value: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  balance: z.preprocess(
    (val) => (val === null ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  billing_period: z.preprocess(
    (val) => (val === null ? null : parseInt(val as string)),
    z.number().min(1).max(31).nullable(),
  ),
})

export default companyEditsSchema
