'use client'

import { z } from 'zod'

const employeesSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  employee_number: z.preprocess((val) => parseFloat(val as string), z.number()),
  real_description: z.string().min(1),
  gender: z.string().min(1),
  civil_status: z.string().min(1),
  birth_date: z.date(),
  age: z.preprocess((val) => parseFloat(val as string), z.number()),
  residential_address: z.string().min(1),
  bill_care_of: z.string().min(1),
  bill_address: z.string().min(1),
  bill_city_municipal: z.string().min(1),
  bill_province: z.string().min(1),
  email: z.string().email('This is not a valid email').min(1),
  telephone_number: z.string(),
  mobile_number: z.string(),
  agent_name: z.string().min(1),
  philhealth: z.string().min(1),
  payment_mode: z.string().min(1),
  plan_type: z.string().min(1),
  plan_description: z.string().min(1),
})

export default employeesSchema
