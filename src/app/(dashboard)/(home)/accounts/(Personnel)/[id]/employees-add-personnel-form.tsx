'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import employeesSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-add-personnel-schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/tailwind'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import EmployeesAddPersonnelButton from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-add-personnel-button'

const EmployeesAddPersonnelForm = () => {
  const form = useForm<z.infer<typeof employeesSchema>>({
    resolver: zodResolver(employeesSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      employeeNumber: 0,
      realDescription: '',
      gender: '',
      civilStatus: '',
      birthDate: new Date(),
      age: 0,
      residentialAddress: '',
      billCareOf: '',
      billAddress: '',
      billCityMunicipal: '',
      billProvince: '',
      email: '',
      telephoneNumber: 0,
      mobileNumber: 0,
      agentName: '',
      philHealth: '',
      paymentMode: '',
      planType: '',
      planDescription: '',
    },
  })

  function onSubmit(values: z.infer<typeof employeesSchema>) {
    console.log(values)
  }

  // const [showEmployees, setShowEmployees] = useState(false)
  // const router = useRouter()
  // const toggleEmployees = () => setShowEmployees(!showEmployees)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto grid-cols-2 flex-col gap-4 lg:flex lg:grid">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} className="-mt-8" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="realDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Real Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="civilStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Civil Status</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'flex h-12 w-full min-w-[240px] rounded-lg border border-input bg-white px-4 py-3 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                          !field.value && 'text-muted-foreground',
                          'text-left font-normal',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="residentialAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Residential Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billCareOf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill Care of</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mx-auto grid-cols-2 flex-col gap-4 lg:flex lg:grid">
          <FormField
            control={form.control}
            name="billAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billCityMunicipal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill City Municipal</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billProvince"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill Province</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="philHealth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PhilHealth</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Mode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="planType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="planDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4 flex flex-row items-center justify-between gap-4 lg:ml-auto lg:justify-end">
          <EmployeesAddPersonnelButton />
          <Button
            type="submit"
            variant="default"
            className="w-full rounded-md lg:w-auto"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EmployeesAddPersonnelForm
