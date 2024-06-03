import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import pendingSchema from './pending-schema'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

import getTypes from '@/queries/get-types'
import { createBrowserClient } from '@/utils/supabase'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils/tailwind'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

const PendingInputs = () => {
  const form = useFormContext<z.infer<typeof pendingSchema>>()
  const supabase = createBrowserClient()

  const { data: modeOfPremiums, isLoading: isLModeOfPremiumLoading } = useQuery(
    getTypes(supabase, 'mode_of_premium'),
  )

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="mode_of_premium_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HMO Provider</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger disabled={isLModeOfPremiumLoading}>
                    <SelectValue placeholder="Select HMO Provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {modeOfPremiums?.map((mode) => (
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
          name="due_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
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
                      disabled={isLModeOfPremiumLoading}
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
      </div>
      <FormField
        control={form.control}
        name="or_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OR Number</FormLabel>
            <FormControl>
              <Input {...field} disabled={isLModeOfPremiumLoading} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="or_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OR Date</FormLabel>
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
                    disabled={isLModeOfPremiumLoading}
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
        name="sa_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SA Number</FormLabel>
            <FormControl>
              <Input {...field} disabled={isLModeOfPremiumLoading} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                disabled={isLModeOfPremiumLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="total_contract_value"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Contract Value</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                disabled={isLModeOfPremiumLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="balance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Balance</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                disabled={isLModeOfPremiumLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="billing_period"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Billing Period</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                min="1"
                disabled={isLModeOfPremiumLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default PendingInputs
