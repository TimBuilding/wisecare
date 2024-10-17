'use client'

import BillingStatementSchema from '@/app/(dashboard)/(home)/billing-statements/billing-statement-schema'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DialogFooter } from '@/components/ui/dialog'
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
import getAllAccounts from '@/queries/get-all-accounts'
import getTypes from '@/queries/get-types'
import { createBrowserClient } from '@/utils/supabase'
import { cn } from '@/utils/tailwind'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useInsertMutation,
  useQuery,
} from '@supabase-cache-helpers/postgrest-react-query'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { FormEventHandler, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const BillingStatementForm = () => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof BillingStatementSchema>>({
    resolver: zodResolver(BillingStatementSchema),
    defaultValues: {
      mode_of_payment_id: undefined,
      due_date: undefined,
      or_number: undefined,
      or_date: undefined,
      sa_number: undefined,
      amount: undefined,
      total_contract_value: undefined,
      balance: undefined,
      billing_period: undefined,
      amount_billed: undefined,
      amount_paid: undefined,
      commission_rate: undefined,
      commission_earned: undefined,
      account_id: undefined,
    },
  })

  const supabase = createBrowserClient()
  const { data: modeOfPayments } = useQuery(
    getTypes(supabase, 'mode_of_payments'),
  )

  const { data: accounts } = useQuery(getAllAccounts(supabase))

  const { mutateAsync, isPending } = useInsertMutation(
    // @ts-ignore
    supabase.from('billing_statements'),
    ['id'],
    'id, account_id, mode_of_payment_id, due_date, or_number, or_date, sa_number, amount, total_contract_value, balance, billing_period, amount_billed, amount_paid, commission_rate, commission_earned',
    {
      onSuccess: () => {
        setOpen(false)

        toast({
          variant: 'default',
          title: 'Billing Statement added!',
          description: 'Successfully added billing statement',
        })

        // reset form
        form.reset()
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        })
      },
    },
  )

  const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      form.handleSubmit(async (data) => {
        await mutateAsync([
          {
            account_id: data.account_id,
            mode_of_payment_id: data.mode_of_payment_id,
            due_date: data.due_date,
            or_number: data.or_number,
            or_date: data.or_date,
            sa_number: data.sa_number,
            amount: data.amount,
            total_contract_value: data.total_contract_value,
            balance: data.balance,
            billing_period: data.billing_period,
            amount_billed: data.amount_billed,
            amount_paid: data.amount_paid,
            commission_rate: data.commission_rate,
            commission_earned: data.commission_earned,
          },
        ])
      })(e)
    },
    [mutateAsync, form],
  )

  return (
    <Form {...form}>
      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-2 gap-4 py-4">
          <FormField
            control={form.control}
            name="account_id"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Account</FormLabel>
                <FormControl className="col-span-3">
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.company_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mode_of_payment_id"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Mode of Payment</FormLabel>
                <FormControl className="col-span-3">
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Mode of Payment" />
                    </SelectTrigger>
                    <SelectContent>
                      {modeOfPayments?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Due Date</FormLabel>
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
            name="or_number"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">OR Number</FormLabel>
                <FormControl className="col-span-3">
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="or_date"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">OR Date</FormLabel>
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
            name="sa_number"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">SA Number</FormLabel>
                <FormControl className="col-span-3">
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Amount</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total_contract_value"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">
                  Total Contract Value
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
            name="balance"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Balance</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billing_period"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Billing Period</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount_billed"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Amount Billed</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount_paid"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Amount Paid</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commission_rate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Commission Rate</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commission_earned"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                <FormLabel className="text-right">Commission Earned</FormLabel>
                <FormControl className="col-span-3">
                  <Input type="number" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Add Billing Statement'
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default BillingStatementForm
