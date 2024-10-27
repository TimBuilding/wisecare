import percentageOptions from '@/components/maskito/percentage-options'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
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
import getAgents from '@/queries/get-agents'
import getTypes from '@/queries/get-types'
import { createBrowserClient } from '@/utils/supabase'
import { cn } from '@/utils/tailwind'
import { useMaskito } from '@maskito/react'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { FC } from 'react'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import accountsSchema from '../accounts-schema'
import currencyOptions from '@/components/maskito/currency-options'

interface Props {
  isLoading: boolean
}

const MarketingInputs: FC<Props> = ({ isLoading }) => {
  const form = useFormContext<z.infer<typeof accountsSchema>>()
  const supabase = createBrowserClient()

  const { data: agents } = useQuery(getAgents(supabase))
  const { data: hmoProviders } = useQuery(getTypes(supabase, 'hmo_providers'))
  const { data: accountTypes } = useQuery(getTypes(supabase, 'account_types'))
  const { data: planTypes } = useQuery(getTypes(supabase, 'plan_types'))
  const { data: modeOfPayments } = useQuery(
    getTypes(supabase, 'mode_of_payments'),
  )

  const handleInputChange = (
    field: ControllerRenderProps<z.infer<typeof accountsSchema>, any>,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value === '' ? null : e.target.value
    field.onChange(value)
  }

  const maskedCommissionRateRef = useMaskito({ options: percentageOptions })
  const maskedInitialContractValueRef = useMaskito({ options: currencyOptions })
  const maskedTotalPremiumPaidRef = useMaskito({ options: currencyOptions })

  return (
    <>
      <FormField
        control={form.control}
        name="agent_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agent</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger disabled={isLoading}>
                  <SelectValue placeholder="Select Agent" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {agents &&
                  agents[0].user_profiles.map((profile) => (
                    <SelectItem key={profile.user_id} value={profile.user_id}>
                      {profile.first_name} {profile.last_name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="company_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                onChange={(e) => handleInputChange(field, e)}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="company_address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Address</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                onChange={(e) => handleInputChange(field, e)}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nature_of_business"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nature of Business</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                onChange={(e) => handleInputChange(field, e)}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="hmo_provider_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HMO Provider</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="Select HMO Provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hmoProviders?.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="previous_hmo_provider_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous HMO Provider</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="Select Previous HMO Provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hmoProviders?.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="current_hmo_provider_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current HMO Provider</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="Select Current HMO Provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hmoProviders?.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="Select Account Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accountTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="total_utilization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Utilization</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total_premium_paid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Premium Paid</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  disabled={isLoading}
                  onInput={field.onChange}
                  ref={maskedTotalPremiumPaidRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name_of_signatory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signatory Designation</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="designation_of_contact_person"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation of Contact Person</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="contact_person"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="principal_plan_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Principal Plan Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="Select Principal Plan Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {planTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dependent_plan_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dependent Plan Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="Select Dependent Plan Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {planTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initial_head_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Head Count</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                  disabled={isLoading}
                />
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
              <FormLabel>Effectivity Date</FormLabel>
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
                      disabled={isLoading}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coc_issue_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>COC Issue Date</FormLabel>
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
                      disabled={isLoading}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name_of_signatory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Signatory</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email_address_of_contact_person"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address of Contact Person</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiration_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration Date</FormLabel>
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
                      disabled={isLoading}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="delivery_date_of_membership_ids"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Date of Membership IDs</FormLabel>
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
                      disabled={isLoading}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orientation_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orientation Date</FormLabel>
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
                      disabled={isLoading}
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
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="initial_contract_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Contract Value</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter initial contract value"
                  value={field.value ?? ''}
                  onInput={field.onChange}
                  disabled={isLoading}
                  ref={maskedInitialContractValueRef}
                />
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
              <FormLabel>Mode of Payment</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="Select Mode of Payment" />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commision_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commission Rate (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter commission rate"
                  value={field.value ?? ''}
                  onInput={field.onChange}
                  ref={maskedCommissionRateRef}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="wellness_lecture_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wellness Lecture Date</FormLabel>
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
                      disabled={isLoading}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="annual_physical_examination_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Physical Examination Date</FormLabel>
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
                      disabled={isLoading}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additional_benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Benefits</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter additional benefits"
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="special_benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Benefits</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter special benefits"
                  value={field.value ?? ''}
                  onChange={(e) => handleInputChange(field, e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export default MarketingInputs
