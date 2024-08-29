import { z } from 'zod'

const setPasswordSchema = z.object({
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  confirmPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
})

export default setPasswordSchema
