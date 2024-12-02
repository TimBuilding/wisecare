import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import employeeSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-schema'
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
import { Tables } from '@/types/database.types'
import normalizeToUTC from '@/utils/normalize-to-utc'
import { createBrowserClient } from '@/utils/supabase'
import { cn } from '@/utils/tailwind'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useInsertMutation,
  useUpsertMutation,
} from '@supabase-cache-helpers/postgrest-react-query'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { FC, FormEventHandler, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

interface EmployeeFormProps {
  setIsOpen: (value: boolean) => void
  oldEmployeeData?: Tables<'company_employees'>
}

const EmployeeForm: FC<EmployeeFormProps> = ({
  setIsOpen,
  oldEmployeeData,
}) => {
  const { accountId } = useCompanyContext()

  // form updater
  const [isDone, setIsDone] = useState(false)

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
    null,
    {
      onSuccess: () => {
        setIsOpen(false)

        toast({
          variant: 'default',
          title: oldEmployeeData ? 'Employee updated!' : 'Employee added!',
          description: oldEmployeeData
            ? 'The employee details have been updated successfully.'
            : 'The employee details have been added successfully.',
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
            ...(oldEmployeeData && {
              id: oldEmployeeData.id,
            }),
            ...data,
            effective_date: data.effective_date
              ? normalizeToUTC(new Date(data.effective_date))
              : undefined,
            birth_date: data.birth_date
              ? normalizeToUTC(new Date(data.birth_date))
              : undefined,
            account_id: accountId,
            created_by: user.id,
            expiration_date: data.expiration_date
              ? normalizeToUTC(new Date(data.expiration_date))
              : undefined,
            cancelation_date: data.cancelation_date
              ? normalizeToUTC(new Date(data.cancelation_date))
              : undefined,
            updated_at: new Date().toISOString(),
          },
        ])
      })(e)
    },
    [accountId, form, mutateAsync, oldEmployeeData, supabase.auth],
  )

  // If oldEmployeeData is provided, we are editing an existing employee
  useEffect(() => {
    if (oldEmployeeData) {
      form.reset({
        first_name: oldEmployeeData.first_name ?? undefined,
        last_name: oldEmployeeData.last_name ?? undefined,
        birth_date: oldEmployeeData
          ? normalizeToUTC(new Date(oldEmployeeData.birth_date ?? ''))
          : undefined,
        gender: (oldEmployeeData.gender as any).toString() ?? undefined,
        civil_status:
          (oldEmployeeData.civil_status as any).toString() ?? undefined,
        card_number: oldEmployeeData.card_number ?? undefined,
        effective_date: oldEmployeeData.effective_date
          ? normalizeToUTC(new Date(oldEmployeeData.effective_date ?? ''))
          : undefined,
        room_plan: oldEmployeeData.room_plan ?? undefined,
        maximum_benefit_limit:
          oldEmployeeData.maximum_benefit_limit ?? undefined,
        member_type: oldEmployeeData.member_type ?? undefined,
        dependent_relation: oldEmployeeData.dependent_relation ?? undefined,
        expiration_date: oldEmployeeData.expiration_date
          ? normalizeToUTC(new Date(oldEmployeeData.expiration_date ?? ''))
          : undefined,
        cancelation_date: oldEmployeeData.cancelation_date
          ? normalizeToUTC(new Date(oldEmployeeData.cancelation_date ?? ''))
          : undefined,
        remarks: oldEmployeeData.remarks ?? undefined,
      })

      // trigger a re-render
      setIsDone(true)
    }
  }, [form, oldEmployeeData])

  return (
    <Form {...form}>
      {/* key is used to trigger a re-render */}
      <form key={isDone ? 0 : 1} onSubmit={onSubmitHandler}>
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
                        disabled={(date) =>
                          date < new Date('1900-01-01') || date > new Date()
                        }
                        initialFocus
                        captionLayout="dropdown"
                        toYear={new Date().getFullYear()}
                        fromYear={1900}
                        classNames={{
                          day_hidden: 'invisible',
                          dropdown:
                            'px-2 py-1.5 max-h-[100px] overflow-y-auto rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
                          caption_dropdowns: 'flex gap-3',
                          vhidden: 'hidden',
                          caption_label: 'hidden',
                        }}
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
                    value={field.value}
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
                    value={field.value}
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
                        captionLayout="dropdown"
                        toYear={new Date().getFullYear() + 20}
                        fromYear={1900}
                        classNames={{
                          day_hidden: 'invisible',
                          dropdown:
                            'px-2 py-1.5 max-h-[100px] overflow-y-auto rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
                          caption_dropdowns: 'flex gap-3',
                          vhidden: 'hidden',
                          caption_label: 'hidden',
                        }}
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
          <FormField
            control={form.control}
            name="member_type"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Member Type</FormLabel>
                <FormControl className="col-span-3">
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isPending}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Member Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="dependent">Dependent</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dependent_relation"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Dependent Relation</FormLabel>
                <FormControl className="col-span-3">
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isPending}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Dependent Relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiration_date"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Expiration Date</FormLabel>
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
                        captionLayout="dropdown"
                        toYear={new Date().getFullYear() + 20}
                        fromYear={1900}
                        classNames={{
                          day_hidden: 'invisible',
                          dropdown:
                            'px-2 py-1.5 max-h-[100px] overflow-y-auto rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
                          caption_dropdowns: 'flex gap-3',
                          vhidden: 'hidden',
                          caption_label: 'hidden',
                        }}
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
            name="cancelation_date"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">
                  Cancelation Effective Date
                </FormLabel>
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
                        captionLayout="dropdown"
                        toYear={new Date().getFullYear() + 20}
                        fromYear={1900}
                        classNames={{
                          day_hidden: 'invisible',
                          dropdown:
                            'px-2 py-1.5 max-h-[100px] overflow-y-auto rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
                          caption_dropdowns: 'flex gap-3',
                          vhidden: 'hidden',
                          caption_label: 'hidden',
                        }}
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
            name="remarks"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Remarks</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="text" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />

          <div className="col-span-2 flex justify-end gap-2 pt-2">
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
              ) : oldEmployeeData ? (
                'Update'
              ) : (
                'Add'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default EmployeeForm
