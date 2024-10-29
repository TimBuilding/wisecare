import { z } from 'zod'

const accountsSchema = z.object({
  is_active: z.boolean().nullable(),
  agent_id: z.string().uuid().nullable(),
  company_name: z.string().min(1).max(255),
  company_address: z.string().max(500).nullable(),
  nature_of_business: z.string().max(500).nullable(),
  hmo_provider_id: z.string().uuid().nullable(),
  previous_hmo_provider_id: z.string().uuid().nullable(),
  current_hmo_provider_id: z.string().uuid().nullable(),
  account_type_id: z.string().uuid().nullable(),
  total_utilization: z.preprocess(
    (val) => (val === null || val === '' ? null : parseFloat(val as string)),
    z.number().nullable(),
  ),
  total_premium_paid: z.preprocess((val) => {
    if (val === null || val === '') return null
    const parsedVal = parseFloat((val as string).replace(/[₱,\s]/g, ''))
    return isNaN(parsedVal) ? null : parsedVal
  }, z.number().nullable()),
  signatory_designation: z.string().max(255).nullable(),
  contact_person: z.string().max(255).nullable(),
  contact_number: z.string().max(255).nullable(),
  principal_plan_type_id: z.string().uuid().nullable(),
  dependent_plan_type_id: z.string().uuid().nullable(),
  initial_head_count: z.preprocess(
    (val) => (val === null || val === '' ? null : parseInt(val as string)),
    z.number().nullable(),
  ),
  effectivity_date: z.date().nullable(),
  coc_issue_date: z.date().nullable(),
  expiration_date: z.date().nullable(),
  delivery_date_of_membership_ids: z.date().nullable(),
  orientation_date: z.date().nullable(),
  initial_contract_value: z.preprocess((val) => {
    if (val === null || val === '') return null
    const parsedVal = parseFloat((val as string).replace(/[₱,\s]/g, ''))
    return isNaN(parsedVal) ? null : parsedVal
  }, z.number().nullable()),
  mode_of_payment_id: z.string().uuid().nullable(),
  wellness_lecture_date: z.date().nullable(),
  annual_physical_examination_date: z.date().nullable(),
  commision_rate: z.preprocess(
    (val) => (val === null || val === '' ? null : parseFloat(val as string)),
    z.number().min(0).max(100).nullable(),
  ),
  additional_benefits: z.string().max(1000).nullable(),
  special_benefits: z.string().max(1000).nullable(),
  name_of_signatory: z.string().max(255).nullable(),
  designation_of_contact_person: z.string().max(255).nullable(),
  email_address_of_contact_person: z.string().email().nullable(),
})

export default accountsSchema
