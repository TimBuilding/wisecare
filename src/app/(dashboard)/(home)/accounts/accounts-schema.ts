import { z } from 'zod'

const accountsSchema = z.object({
  is_active: z.boolean().nullable(),
  agent_id: z.string().nullable(),
  company_name: z.string().min(1),
  company_address: z.string().nullable(),
  nature_of_business: z.string().nullable(),
  hmo_provider_id: z.string().nullable(),
  previous_hmo_provider_id: z.string().nullable(),
  current_hmo_provider_id: z.string().nullable(),
  account_type_id: z.string().nullable(),
  total_utilization: z.preprocess(
    (val) => (val === null || val === '' ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  total_premium_paid: z.preprocess(
    (val) => (val === null || val === '' ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  signatory_designation: z.string().nullable(),
  contact_person: z.string().nullable(),
  contact_number: z.string().nullable(),
  principal_plan_type_id: z.string().nullable(),
  dependent_plan_type_id: z.string().nullable(),
  initial_head_count: z.preprocess(
    (val) => (val === null || val === '' ? null : parseInt(val as string)),
    z.number().nullable(),
  ),
  effectivity_date: z.date().nullable(),
  coc_issue_date: z.date().nullable(),
  expiration_date: z.date().nullable(),
  delivery_date_of_membership_ids: z.date().nullable(),
  orientation_date: z.date().nullable(),
  initial_contract_value: z.preprocess(
    (val) => (val === null || val === '' ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  mode_of_payment_id: z.string().nullable(),
  wellness_lecture_date: z.date().nullable(),
  annual_physical_examination_date: z.date().nullable(),
  commision_rate: z.preprocess(
    (val) => (val === null || val === '' ? null : parseFloat(val as string)),
    z.number().min(0).max(100).nullable(),
  ),
  additional_benefits: z.string().nullable(),
  special_benefits: z.string().nullable(),
  name_of_signatory: z.string().nullable(),
  designation_of_contact_person: z.string().nullable(),
  email_address_of_contact_person: z.string().nullable(),
})

export default accountsSchema
