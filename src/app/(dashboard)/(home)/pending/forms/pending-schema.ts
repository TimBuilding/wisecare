import { z } from 'zod'

const pendingSchema = z.object({
  mode_of_premium_id: z.string(),
  due_date: z.date(),
  or_number: z.string(),
  or_date: z.date(),
  sa_number: z.string(),
  amount: z.number(),
  total_contract_value: z.number(),
  balance: z.number(),
  billing_period: z.number().min(1).max(31),
})

export default pendingSchema
