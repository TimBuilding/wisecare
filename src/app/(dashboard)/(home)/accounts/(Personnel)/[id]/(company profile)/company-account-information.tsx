import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAccountById from '@/queries/get-account-by-id'
import { Input } from '@/components/ui/input'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edits-schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import getTypes from '@/queries/get-types'
import getAgents from '@/queries/get-agents'

const CompanyInformationItem = ({
  label,
  value,
}: {
  label: string
  value?: string | undefined
}) => (
  <div className="flex flex-col py-1">
    <div className="text-sm font-medium text-muted-foreground">{label}</div>
    <div className="text-md font-semibold">{value || 'N/A'}</div>
  </div>
)

interface CompanyAccountInformationProps {
  id: string
}

const CompanyAccountInformation: FC<CompanyAccountInformationProps> = ({
  id,
}) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const form = useFormContext<z.infer<typeof companyEditsSchema>>()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const { data: accountType } = useQuery(getTypes(supabase, 'account_types'))
  const { data: agents } = useQuery(getAgents(supabase))

  return (
    <>
      {editMode ? (
        <>
          <FormField
            control={form.control}
            name="account_type_id"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row pt-4">
                  <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
                <div className="flex flex-row pt-4">
                  <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
                          agents[0].user_profiles.map((profile) => (
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
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Commission Rate:
                      <Input
                        className="w-full"
                        {...field}
                        type="number"
                        min="0"
                        step="0.01"
                      />
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
            label="Account Type"
            value={(account?.account_type as any).name}
          />
          <CompanyInformationItem
            label="Agent"
            value={`${account?.agent?.first_name} ${account?.agent?.last_name}`}
          />
          <CompanyInformationItem
            label="Commission Rate"
            value={account?.commision_rate?.toString()}
          />
        </div>
      )}
    </>
  )
}

export default CompanyAccountInformation
