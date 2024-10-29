import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edits-schema'
import currencyOptions from '@/components/maskito/currency-options'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
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
import getAccountById from '@/queries/get-account-by-id'
import getTypes from '@/queries/get-types'
import { createBrowserClient } from '@/utils/supabase'
import { cn } from '@/utils/tailwind'
import { useMaskito } from '@maskito/react'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { formatCurrency } from '@/app/(dashboard)/(home)/accounts/columns/accounts-columns'

const CompanyInformationItem = ({
  label,
  value,
}: {
  label: string
  value?: string | undefined
}) => (
  <div className="flex flex-col py-1">
    <div className="text-sm font-medium text-muted-foreground">{label}</div>
    <div className="text-md font-semibold">{value || 'No data'}</div>
  </div>
)

interface CompanyContractInformationProps {
  id: string
}

const CompanyContractInformation: FC<CompanyContractInformationProps> = ({
  id,
}) => {
  const { editMode } = useCompanyEditContext()
  const form = useFormContext<z.infer<typeof companyEditsSchema>>()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const { data: modeOfPayments } = useQuery(
    getTypes(supabase, 'mode_of_payments'),
  )

  const maskedInitialContractValueRef = useMaskito({ options: currencyOptions })
  return (
    <>
      {editMode ? (
        <>
          <FormField
            control={form.control}
            name="initial_contract_value"
            render={({ field }) => (
              <FormItem>
                <div className="pt-4">
                  <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                    Initial Contract Value:
                    <Input
                      className="w-full"
                      {...field}
                      value={field.value ?? ''}
                      onInput={field.onChange}
                      ref={maskedInitialContractValueRef}
                    />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initial_head_count"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Initial Head Count:
                      <Input
                        className="w-full"
                        {...field}
                        type="number"
                        value={field.value?.toString()}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mode_of_payment_id"
            render={({ field }) => (
              <FormItem>
                <div className="pt-4">
                  <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                    Mode of Payment:
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {modeOfPayments?.map((mode) => (
                          <SelectItem key={mode.id} value={mode.id}>
                            {mode.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiration_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="pt-4">
                    <div className="text-md w-full text-[#1e293b] md:grid md:grid-cols-2 lg:grid-cols-1">
                      Expiration Date:
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
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
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
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="effectivity_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="pt-4">
                    <div className="text-md w-full text-[#1e293b] md:grid md:grid-cols-2 lg:grid-cols-1">
                      Effectivity Date:
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
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
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
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coc_issue_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      COC Issue Date:
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
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
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
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="delivery_date_of_membership_ids"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Delivery Date of Membership IDs:
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
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
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
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orientation_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Orientation Date:
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
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
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
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wellness_lecture_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Wellness Lecture Date:
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
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
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
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="annual_physical_examination_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Annual Physical Examination Date:
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
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
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
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      ) : (
        <div className="grid grid-cols-2 gap-2 pt-4 lg:grid-cols-1">
          <CompanyInformationItem
            label="Initial Contract Value"
            value={formatCurrency(account?.initial_contract_value)}
          />
          <CompanyInformationItem
            label={'Initial Head Count'}
            value={account?.initial_head_count?.toString()}
          />
          <CompanyInformationItem
            label={'Mode of Payment'}
            value={
              account?.mode_of_payment
                ? (account.mode_of_payment as any).name
                : ''
            }
          />
          <CompanyInformationItem
            label={'Expiration Date'}
            value={
              account?.expiration_date
                ? format(new Date(account.expiration_date), 'PPP')
                : 'No data'
            }
          />
          <CompanyInformationItem
            label={'Effectivity Date'}
            value={
              account?.effectivity_date
                ? format(new Date(account.effectivity_date), 'PPP')
                : 'No data'
            }
          />
          <CompanyInformationItem
            label={'COC Issue Date'}
            // value={account?.coc_issue_date?.toString()}
            value={
              account?.coc_issue_date
                ? format(new Date(account.coc_issue_date), 'PPP')
                : 'No data'
            }
          />
          <CompanyInformationItem
            label={'Delivery Date of Membership IDs'}
            value={
              account?.delivery_date_of_membership_ids
                ? format(
                    new Date(account.delivery_date_of_membership_ids),
                    'PPP',
                  )
                : 'No data'
            }
          />
          <CompanyInformationItem
            label={'Orientation Date'}
            // value={account?.orientation_date?.toString()}
            value={
              account?.orientation_date
                ? format(new Date(account.orientation_date), 'PPP')
                : 'No data'
            }
          />
          <CompanyInformationItem
            label={'Wellness Lecture Date'}
            value={
              account?.wellness_lecture_date
                ? format(new Date(account.wellness_lecture_date), 'PPP')
                : 'No data'
            }
          />
          <CompanyInformationItem
            label={'Annual Physical Examination Date'}
            value={
              account?.annual_physical_examination_date
                ? format(
                    new Date(account.annual_physical_examination_date),
                    'PPP',
                  )
                : 'No data'
            }
          />
        </div>
      )}
    </>
  )
}

export default CompanyContractInformation
