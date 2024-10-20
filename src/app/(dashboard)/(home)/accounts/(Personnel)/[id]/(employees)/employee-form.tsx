import employeeSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-schema'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-provider'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { cn } from '@/utils/tailwind'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { FC, FormEventHandler, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EmployeeFormProps {
  setIsOpen: (value: boolean) => void
}

const EmployeeForm: FC<EmployeeFormProps> = ({ setIsOpen }) => {
  const { accountId } = useCompanyContext()

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: undefined,
      last_name: undefined,
      birth_date: undefined,
      gender: undefined,
      civil_status: undefined,
    },
  })
  const supabase = createBrowserClient()
  const { toast } = useToast()

  const { mutateAsync, isPending } = useUpsertMutation(
    // @ts-ignore
    supabase.from('company_employees'),
    ['id'],
    '',
    {
      onSuccess: () => {
        setIsOpen(false)

        toast({
          variant: 'default',
          title: 'Employee added!',
          description: 'Successfully added employee',
        })
      },
      onError: (err: any) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message,
        })
      },
    },
  )

  const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      form.handleSubmit(async (data) => {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          throw new Error('User not found')
        }

        await mutateAsync([
          {
            ...data,
            account_id: accountId,
            created_by: user.id,
          },
        ])
      })(e)
    },
    [form, mutateAsync],
  )

  return (
    <Form {...form}>
      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-2 gap-4 py-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">First Name</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="text" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Last Name</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="text" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Birth Date</FormLabel>
                <FormControl className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'col-span-3 flex h-12 w-full rounded-lg border border-input bg-white px-4 py-3 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                            !field.value && 'text-muted-foreground',
                            'text-left font-normal',
                          )}
                          disabled={isPending}
                        >
                          {field.value ? (
                            format(field.value, 'PP')
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Gender</FormLabel>
                <FormControl className="col-span-3">
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="civil_status"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Civil Status</FormLabel>
                <FormControl className="col-span-3">
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Civil Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="card_number"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Card Number</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="text" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="effective_date"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Effective Date</FormLabel>
                <FormControl className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'col-span-3 flex h-12 w-full rounded-lg border border-input bg-white px-4 py-3 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                            !field.value && 'text-muted-foreground',
                            'text-left font-normal',
                          )}
                          disabled={isPending}
                        >
                          {field.value ? (
                            format(field.value, 'PP')
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room_plan"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Room Plan</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="text" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maximum_benefit_limit"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">
                  Maximum Benefit Limit
                </FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant={'outline'}
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Add Employee'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default EmployeeForm
