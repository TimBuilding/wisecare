import { z } from 'zod'

const pendingSchema = z.object({
  mode_of_premium_id: z.string(),
  due_date: z.date(),
  or_number: z.string(),
  or_date: z.date(),
  sa_number: z.string(),
  amount: z.preprocess((val) => parseFloat(val as string), z.number()),
  total_contract_value: z.preprocess(
    (val) => parseFloat(val as string),
    z.number(),
  ),
  balance: z.preprocess((val) => parseFloat(val as string), z.number()),
  billing_period: z.preprocess(
    (val) => parseInt(val as string),
    z.number().min(1).max(31),
  ),
})

export default pendingSchema
