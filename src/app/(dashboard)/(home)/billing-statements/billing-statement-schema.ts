import { z } from 'zod'

const BillingStatementSchema = z
  .object({
    mode_of_payment_id: z.string().uuid().optional(),
    due_date: z.date().optional(),
    or_number: z.string().optional(),
    or_date: z.date().optional(),
    sa_number: z.string().optional(),
    amount: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive().optional(),
    ),
    total_contract_value: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive().optional(),
    ),
    balance: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive().optional(),
    ),

    billing_period: z.preprocess(
      (val) => parseInt(val as string, 10),
      z.number().int().min(1).max(31).optional(),
    ),
    amount_billed: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive().optional(),
    ),
    amount_paid: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive().optional(),
    ),
    commission_rate: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive().optional(),
    ),
    commission_earned: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive().optional(),
    ),
    account_id: z.string().uuid().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      Object.values(data).every(
        (value) => value === undefined || value === null || value === '',
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one field must be provided',
      })
    }
  })

export default BillingStatementSchema