'use client'

import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import BillingStatementSchema from '@/app/(dashboard)/(home)/billing-statements/billing-statement-schema'
import DeleteBillingStatement from '@/components/billing-statement/delete-billing-statement'
import currencyOptions from '@/components/maskito/currency-options'
import percentageOptions from '@/components/maskito/percentage-options'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { Tables } from '@/types/database.types'
import { createBrowserClient } from '@/utils/supabase'
import { cn } from '@/utils/tailwind'
import { zodResolver } from '@hookform/resolvers/zod'
import { maskitoTransform } from '@maskito/core'
import { useMaskito } from '@maskito/react'
import {
  useInsertMutation,
  useQuery,
} from '@supabase-cache-helpers/postgrest-react-query'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import {
  FormEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props<TData> {
  originalData?: TData & Tables<'billing_statements'>
  button?: ReactNode
  open: boolean
  setOpen: (value: boolean) => void
}

const BillingStatementModal = <TData,>({
  originalData,
  button,
  open,
  setOpen,
}: Props<TData>) => {
  const { toast } = useToast()
  const [tableRerender, setTableRerender] = useState(0)

  const normalizeToUTC = (date: Date): Date => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    )
    return utcDate
  }
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
    supabase.from('pending_billing_statements'),
    ['id'],
    null,
    {
      onSuccess: () => {
        setOpen(false)

        toast({
          variant: 'default',
          title: originalData
            ? 'Billing Statement update request submitted!'
            : 'Billing Statement creation request submitted!',
          description: originalData
            ? 'Your request to update the billing statement has been submitted successfully and is awaiting approval.'
            : 'Your request to create a new billing statement has been submitted successfully and is awaiting approval.',
        })

        // if creating new billing statement. then we should reset the form
        if (!originalData) {
          form.reset()
        }

        // rerender table to refresh masking inputs
        setTableRerender((prev) => prev + 1)
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

  // only used for edit. it fetches the original data from the database
  useEffect(() => {
    if (originalData) {
      const resetData = {
        ...Object.fromEntries(
          Object.entries(originalData).map(([key, value]) => [
            key,
            value === null ? undefined : value,
          ]),
        ),
        account_id: (originalData as any).account?.id,
        mode_of_payment_id: (originalData as any).mode_of_payment?.id,
        due_date: originalData.due_date
          ? normalizeToUTC(new Date(originalData.due_date))
          : undefined,
        or_date: originalData.or_date
          ? normalizeToUTC(new Date(originalData.or_date))
          : undefined,
        amount: originalData.amount
          ? maskitoTransform(originalData.amount.toString(), currencyOptions)
          : undefined,
        total_contract_value: originalData.total_contract_value
          ? maskitoTransform(
              originalData.total_contract_value.toString(),
              currencyOptions,
            )
          : undefined,
        balance: originalData.balance
          ? maskitoTransform(originalData.balance.toString(), currencyOptions)
          : undefined,
        amount_billed: originalData.amount_billed
          ? maskitoTransform(
              originalData.amount_billed.toString(),
              currencyOptions,
            )
          : undefined,
        amount_paid: originalData.amount_paid
          ? maskitoTransform(
              originalData.amount_paid.toString(),
              currencyOptions,
            )
          : undefined,
        commission_rate: originalData.commission_rate
          ? maskitoTransform(
              originalData.commission_rate.toString(),
              percentageOptions,
            )
          : undefined,
        commission_earned: originalData.commission_earned
          ? maskitoTransform(
              originalData.commission_earned.toString(),
              currencyOptions,
            )
          : undefined,
      } as unknown as z.infer<typeof BillingStatementSchema>

      form.reset(resetData)
    }
  }, [originalData, form])

  const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      form.handleSubmit(async (data) => {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        await mutateAsync([
          {
            ...data,
            // @ts-ignore
            // id: originalData?.id ? originalData.id : undefined,
            due_date: data.due_date
              ? normalizeToUTC(new Date(data.due_date))
              : undefined,
            or_date: data.or_date
              ? normalizeToUTC(new Date(data.or_date))
              : undefined,
            operation_type: originalData ? 'update' : 'insert',
            created_by: user?.id,
          },
        ])
      })(e)
    },
    [form, originalData?.id, mutateAsync],
  )

  // if the modal is opened from the Company Profile page,
  // it should automatically fill the account_id field with the company id
  const CompanyContext = useCompanyContext()
  useEffect(() => {
    // check if context exist
    if (CompanyContext && CompanyContext !== undefined) {
      form.reset({
        account_id: CompanyContext.accountId,
      })
    }
  }, [CompanyContext, form])

  const maskedAmountRef = useMaskito({ options: currencyOptions })
  const maskedTotalContractValueRef = useMaskito({ options: currencyOptions })
  const maskedBalanceRef = useMaskito({ options: currencyOptions })
  const maskedAmountBilledRef = useMaskito({ options: currencyOptions })
  const maskedAmountPaidRef = useMaskito({ options: currencyOptions })
  const maskedCommissionRateRef = useMaskito({ options: percentageOptions })
  const maskedCommissionEarnedRef = useMaskito({ options: currencyOptions })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {button && <DialogTrigger asChild={true}>{button}</DialogTrigger>}
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>
            {originalData ? 'Edit billing statement' : 'Add Billing Statement'}
          </DialogTitle>
          <DialogDescription>
            {originalData
              ? `Edit billing statement ${originalData.id}`
              : 'Add a new billing statement to the account'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmitHandler} key={tableRerender}>
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
                          {accounts &&
                            accounts?.map((item) => (
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
                    <FormLabel className="text-right">
                      Mode of Payment
                    </FormLabel>
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
                          {modeOfPayments &&
                            modeOfPayments?.map((item) => (
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
                      <Input
                        {...field}
                        disabled={isPending}
                        value={field.value ?? ''}
                        ref={maskedAmountRef}
                        onInput={field.onChange}
                      />
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
                      <Input
                        {...field}
                        disabled={isPending}
                        ref={maskedTotalContractValueRef}
                        onInput={field.onChange}
                        value={field.value ?? ''}
                      />
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
                      <Input
                        {...field}
                        disabled={isPending}
                        ref={maskedBalanceRef}
                        onInput={field.onChange}
                        value={field.value ?? ''}
                      />
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
                      <Input
                        {...field}
                        disabled={isPending}
                        ref={maskedAmountBilledRef}
                        onInput={field.onChange}
                        value={field.value ?? ''}
                      />
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
                      <Input
                        {...field}
                        disabled={isPending}
                        ref={maskedAmountPaidRef}
                        onInput={field.onChange}
                        value={field.value ?? ''}
                      />
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
                    <FormLabel className="text-right">
                      Commission Rate
                    </FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        {...field}
                        disabled={isPending}
                        value={field.value ?? ''}
                        ref={maskedCommissionRateRef}
                        onInput={field.onChange}
                      />
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
                    <FormLabel className="text-right">
                      Commission Earned
                    </FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        {...field}
                        disabled={isPending}
                        value={field.value ?? ''}
                        ref={maskedCommissionEarnedRef}
                        onInput={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter
              className={cn(
                'flex w-full items-center',
                originalData && '!justify-between',
              )}
            >
              {originalData && (
                <DeleteBillingStatement
                  originalData={{
                    ...originalData,
                    account_id: (originalData as any).account.id,
                    mode_of_payment_id:
                      (originalData as any).mode_of_payment?.id ?? '',
                    updated_at: originalData.created_at,
                  }}
                  setOpen={setOpen}
                />
              )}
              <div className="space-x-2">
                <Button
                  variant="outline"
                  disabled={isPending}
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : originalData ? (
                    'Update Billing Statement'
                  ) : (
                    'Add Billing Statement'
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BillingStatementModal
