'use client'

import { z } from 'zod'

const employeesSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  employeeNumber: z.number(),
  realDescription: z.string().min(1),
  gender: z.string().min(1),
  civilStatus: z.string().min(1),
  birthDate: z.date(),
  age: z.number(),
  residentialAddress: z.string().min(1),
  billCareOf: z.string().min(1),
  billAddress: z.string().min(1),
  billCityMunicipal: z.string().min(1),
  billProvince: z.string().min(1),
  email: z.string().email('This is not a valid email').min(1),
  telephoneNumber: z.number(),
  mobileNumber: z.number(),
  agentName: z.string().min(1),
  philHealth: z.string(),
  paymentMode: z.string().min(1),
  planType: z.string().min(1),
  planDescription: z.string().min(1),
})

export default employeesSchema
