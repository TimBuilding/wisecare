import { z } from 'zod'

const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export default ForgotPasswordSchema