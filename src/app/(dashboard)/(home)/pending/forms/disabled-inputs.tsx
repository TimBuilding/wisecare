import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import getAccountById from '@/queries/get-account-by-id'
import { createBrowserClient } from '@/utils/supabase'
import { cn } from '@/utils/tailwind'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { FC } from 'react'

interface Props {
  isLoading: boolean
  id: string
}

const DisabledInputs: FC<Props> = ({ isLoading, id }) => {
  const supabase = createBrowserClient()

  const { data: account } = useQuery(getAccountById(supabase, id))

  return (
    <>
      <FormItem>
        <FormLabel>Agent</FormLabel>

        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>Company Name</FormLabel>
        <FormControl>
          <Input disabled={true} value={account?.company_name} />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>Company Address</FormLabel>
        <FormControl>
          <Input disabled={true} value={account?.company_address} />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>Nature of Business</FormLabel>
        <FormControl>
          <Input disabled={true} value={account?.nature_of_business} />
        </FormControl>
        <FormMessage />
      </FormItem>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>HMO Provider</FormLabel>
          <Select
            // @ts-ignore
            value={account?.hmo_provider.name || 'hmoProvider'}
            disabled={true}
          >
            <FormControl>
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select HMO Provider" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {/* @ts-ignore */}
              <SelectItem value={account?.hmo_provider.name || 'hmoProvider'}>
                {/* @ts-ignore */}
                {account?.hmo_provider.name || ''}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Previous HMO Provider</FormLabel>
          <Select
            // @ts-ignore
            value={account?.previous_hmo_provider.name || 'previousHmoProvider'}
            disabled={true}
          >
            <FormControl>
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select Previous HMO Provider" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem
                value={
                  // @ts-ignore
                  account?.previous_hmo_provider?.name || 'prevHmoProvider'
                }
              >
                {/* @ts-ignore */}
                {account?.previous_hmo_provider.name || ''}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Current HMO Provider</FormLabel>
          <Select
            // @ts-ignore
            value={account?.hmo_provider.name || 'currentHmoProvider'}
            disabled={true}
          >
            <FormControl>
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select Current HMO Provider" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem
                // @ts-ignore
                value={account?.hmo_provider.name || 'currentHmoProvider'}
              >
                {/* @ts-ignore */}
                {account?.hmo_provider.name || ''}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Account Type</FormLabel>
          <Select
            // @ts-ignore
            value={account?.account_type.name || 'accountType'}
            disabled={true}
          >
            <FormControl>
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select Account Type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {/* @ts-ignore */}
              <SelectItem value={account?.account_type.name || 'accountType'}>
                {/* @ts-ignore */}
                {account?.account_type.name || ''}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormItem>
          <FormLabel>Total Utilization</FormLabel>
          <FormControl>
            <Input
              type="number"
              disabled={true}
              value={account?.total_utilization}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Total Premium Paid</FormLabel>
          <FormControl>
            <Input
              type="number"
              disabled={true}
              value={account?.total_premium_paid}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Signatory Designation</FormLabel>
          <FormControl>
            <Input disabled={true} value={account?.signatory_designation} />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Contact Person</FormLabel>
          <FormControl>
            <Input disabled={true} value={account?.contact_person} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Contact Number</FormLabel>
          <FormControl>
            <Input type="tel" disabled={true} value={account?.contact_number} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Principal Plan Type</FormLabel>
          <Select
            // @ts-ignore
            value={account?.principal_plan_type.name || 'principalPlanType'}
            disabled={true}
          >
            <FormControl>
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select Principal Plan Type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem
                // @ts-ignore
                value={account?.principal_plan_type.name || 'principalPlanType'}
              >
                {/* @ts-ignore */}
                {account?.principal_plan_type.name || ''}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Dependent Plan Type</FormLabel>
          <Select
            // @ts-ignore
            value={account?.dependent_plan_type.name || 'dependentPlanType'}
            disabled={true}
          >
            <FormControl>
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select Dependent Plan Type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem
                // @ts-ignore
                value={account?.dependent_plan_type.name || 'dependentPlanType'}
              >
                {/* @ts-ignore */}
                {account?.dependent_plan_type.name || ''}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Initial Head Count</FormLabel>
          <FormControl>
            <Input
              type="number"
              disabled={true}
              value={account?.initial_head_count}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Effectivity Date</FormLabel>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'flex h-12 w-full min-w-[240px] rounded-lg border border-input bg-white px-4 py-3 text-left text-sm font-normal shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              )}
              disabled={true}
            >
              {account?.effectivity_date
                ? format(new Date(account.effectivity_date), 'MMM dd, yyyy')
                : ''}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>COC Issue Date</FormLabel>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'flex h-12 w-full min-w-[240px] rounded-lg border border-input bg-white px-4 py-3 text-left text-sm font-normal shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              )}
              disabled={true}
            >
              {account?.coc_issue_date
                ? format(new Date(account.coc_issue_date), 'MMM dd, yyyy')
                : ''}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Effective Date</FormLabel>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'flex h-12 w-full min-w-[240px] rounded-lg border border-input bg-white px-4 py-3 text-left text-sm font-normal shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              )}
              disabled={true}
            >
              {account?.effective_date
                ? format(new Date(account.effective_date), 'MMM dd, yyyy')
                : ''}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Renewal Date</FormLabel>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'flex h-12 w-full min-w-[240px] rounded-lg border border-input bg-white px-4 py-3 text-left text-sm font-normal shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              )}
              disabled={true}
            >
              {account?.renewal_date
                ? format(new Date(account.renewal_date), 'MMM dd, yyyy')
                : ''}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Expiration Date</FormLabel>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'flex h-12 w-full min-w-[240px] rounded-lg border border-input bg-white px-4 py-3 text-left text-sm font-normal shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              )}
              disabled={true}
            >
              {account?.expiration_date
                ? format(new Date(account.expiration_date), 'MMM dd, yyyy')
                : ''}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Delivery Date of Membership IDs</FormLabel>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'flex h-12 w-full min-w-[240px] rounded-lg border border-input bg-white px-4 py-3 text-left text-sm font-normal shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              )}
              disabled={true}
            >
              {account?.delivery_date_of_membership_ids
                ? format(
                    new Date(account.delivery_date_of_membership_ids),
                    'MMM dd, yyyy',
                  )
                : ''}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Orientation Date</FormLabel>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'flex h-12 w-full min-w-[240px] rounded-lg border border-input bg-white px-4 py-3 text-left text-sm font-normal shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              )}
              disabled={true}
            >
              {account?.orientation_date
                ? format(new Date(account.orientation_date), 'MMM dd, yyyy')
                : ''}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
    </>
  )
}

export default DisabledInputs