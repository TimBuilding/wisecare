import { z } from 'zod'

const employeeSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  birth_date: z.date(),
  gender: z.enum(['male', 'female', 'other']),
  civil_status: z.enum(['single', 'married', 'divorced', 'widowed']),
  card_number: z.string().optional(),
  effective_date: z.date().optional(),
  room_plan: z.string().optional(),
  maximum_benefit_limit: z.string().optional(),
  member_type: z.enum(['principal', 'dependent']).optional(),
  dependent_relation: z.enum(['spouse', 'child', 'parent']).optional(),
  expiration_date: z.date().optional(),
  cancelation_date: z.date().optional(),
  remarks: z.string().optional(),
})

export default employeeSchema
