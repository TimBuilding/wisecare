import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edits-schema'
import percentageOptions from '@/components/maskito/percentage-options'
import {
  FormControl,
  FormField,
  FormItem,
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
import getAgents from '@/queries/get-agents'
import getTypes from '@/queries/get-types'
import { createBrowserClient } from '@/utils/supabase'
import { useMaskito } from '@maskito/react'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

const AccountInformationFields = () => {
  const form = useFormContext<z.infer<typeof companyEditsSchema>>()
  const supabase = createBrowserClient()
  const { data: accountType } = useQuery(getTypes(supabase, 'account_types'))
  const { data: agents } = useQuery(getAgents(supabase))

  const maskedPercentageRef = useMaskito({ options: percentageOptions })

  return (
    <>
      <FormField
        control={form.control}
        name="account_type_id"
        render={({ field }) => (
          <FormItem>
            <div className="pt-4">
              <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                Account Type:
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
                    {accountType?.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
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
        name="agent_id"
        render={({ field }) => (
          <FormItem>
            <div className="pt-4">
              <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                Agent:
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
                    {agents &&
                      agents.map((profile) => (
                        <SelectItem
                          key={profile.user_id}
                          value={profile.user_id}
                        >
                          {profile.first_name} {profile.last_name}
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
        name="commision_rate"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="pt-4">
                <div className="text-md w-full text-[#1e293b] md:grid md:grid-cols-2 lg:grid-cols-1">
                  Commission Rate:
                  <Input
                    className="w-full"
                    {...field}
                    type="text"
                    ref={maskedPercentageRef}
                    onInput={(e) =>
                      // @ts-ignore
                      form.setValue(field.name, e.target.value)
                    }
                  />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default AccountInformationFields
