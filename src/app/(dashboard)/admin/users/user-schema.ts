import { z } from 'zod'
import { Enums } from '@/types/database.types'

const userSchema = z.object({
  firstName: z.string().min(1).max(64),
  lastName: z.string().min(1).max(64),
  email: z.string().email(),
  department: z.enum([
    'marketing',
    'after-sales',
    'under-writing',
    'finance',
    'admin',
  ]),
  // password: z.string().min(8),
})

export default userSchema
