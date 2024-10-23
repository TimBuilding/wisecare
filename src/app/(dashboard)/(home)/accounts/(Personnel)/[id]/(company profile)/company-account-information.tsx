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
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'
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
import pendingSchema from '@/app/(dashboard)/(home)/pending/forms/pending-schema'

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
        <>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Account Type:{' '}
              <span>
                {/*@ts-ignore*/}
                {account?.account_type ? account?.account_type.name : null}
              </span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Agent:{' '}
              <span>
                {/*@ts-ignore*/}
                {account?.agent ? account?.agent.first_name : null}{' '}
                {/*@ts-ignore*/}
                {account?.agent ? account?.agent.last_name : null}
              </span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              {/*@ts-ignore*/}
              Commission Rate:{' '}
              <span>
                {account?.commision_rate ? account?.commision_rate : null}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CompanyAccountInformation
