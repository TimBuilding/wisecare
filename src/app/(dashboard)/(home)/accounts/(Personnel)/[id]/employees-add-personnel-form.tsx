'use client'
import React, { useCallback, FormEventHandler } from 'react'
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
import { createBrowserClient } from '@/utils/supabase'
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { useToast } from '@/components/ui/use-toast'

const EmployeesAddPersonnelForm = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof employeesSchema>>({
    resolver: zodResolver(employeesSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      employee_number: 0,
      real_description: '',
      gender: '',
      civil_status: '',
      birth_date: new Date(),
      age: 0,
      residential_address: '',
      bill_care_of: '',
      bill_address: '',
      bill_city_municipal: '',
      bill_province: '',
      email: '',
      telephone_number: '',
      mobile_number: '',
      agent_name: '',
      philhealth: '',
      payment_mode: '',
      plan_type: '',
      plan_description: '',
    },
  })

  const supabase = createBrowserClient()
  const { mutateAsync, isPending } = useInsertMutation(
    //@ts-ignore
    supabase.from('company_employees'),
    ['id'],
    'id',
    {
      onSuccess: () => {
        form.reset()
      },
      onError: (error) => {
        toast({
          title: 'Something went wrong',
          description: error.message,
          variant: 'destructive',
        })
      },
    },
  )

  const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      form.handleSubmit(async (data) => {
        console.log(data)
        await mutateAsync([
          {
            first_name: data.first_name,
            last_name: data.last_name,
            employee_number: data.employee_number,
            real_description: data.real_description,
            gender: data.gender,
            civil_status: data.civil_status,
            birth_date: data.birth_date,
            age: data.age,
            residential_address: data.residential_address,
            bill_care_of: data.bill_care_of,
            bill_address: data.bill_address,
            bill_city_municipal: data.bill_city_municipal,
            bill_province: data.bill_province,
            email: data.email,
            telephone_number: data.telephone_number,
            mobile_number: data.mobile_number,
            agent_name: data.agent_name,
            philhealth: data.philhealth,
            payment_mode: data.payment_mode,
            plan_type: data.plan_type,
            plan_description: data.plan_description,
          },
        ])
      })(e)
    },
    [form, mutateAsync],
  )

  return (
    <Form {...form}>
      <form onSubmit={onSubmitHandler}>
        <div className="mx-auto grid-cols-2 flex-col gap-4 lg:flex lg:grid">
          <FormField
            control={form.control}
            name="first_name"
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
            name="last_name"
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
            name="employee_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Number</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="real_description"
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
            name="civil_status"
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
            name="birth_date"
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
            name="residential_address"
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
            name="bill_care_of"
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
            name="bill_address"
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
            name="bill_city_municipal"
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
            name="bill_province"
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
            name="telephone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agent_name"
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
            name="philhealth"
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
            name="payment_mode"
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
            name="plan_type"
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
            name="plan_description"
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
