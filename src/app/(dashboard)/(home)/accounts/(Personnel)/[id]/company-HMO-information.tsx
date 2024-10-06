import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getAccountById from '@/queries/get-account-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Input } from '@/components/ui/input'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'
import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edits-schema'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

interface CompanyHmoInformationProps {
  id: string
}

const CompanyHmoInformation: FC<CompanyHmoInformationProps> = ({ id }) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const form = useFormContext<z.infer<typeof companyEditsSchema>>()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const companyHmoInformation = [
    {
      key: 'hmo_provider_id',
      name: 'HMO Provider:',
      // @ts-ignore
      value: account?.hmo_provider ? account?.hmo_provider.name : '',
    },
    {
      key: 'previous_hmo_provider_id',
      name: 'Previous HMO Provider:',
      value: account?.previous_hmo_provider
        ? //@ts-ignore
          account?.previous_hmo_provider.name
        : '',
    },
    {
      key: 'current_hmo_provider_id',
      name: 'Current HMO Provider:',
      value: account?.current_hmo_provider
        ? //@ts-ignore
          account?.current_hmo_provider.name
        : '',
    },
    {
      key: 'principal_plan_type_id',
      name: 'Principal Plan Type:',
      value: account?.principal_plan_type
        ? //@ts-ignore
          account?.principal_plan_type.name
        : '',
    },
    {
      key: 'dependent_plan_type_id',
      name: 'Dependent Plan Type:',
      value: account?.dependent_plan_type
        ? //@ts-ignore
          account?.dependent_plan_type.name
        : '',
    },
    {
      key: 'total_utilization',
      name: 'Total Utilization:',
      value: account?.total_utilization ? account?.total_utilization : '',
    },
    {
      key: 'total_premium_paid',
      name: 'Total Premium Paid:',
      value: account?.total_premium_paid ? account?.total_premium_paid : '',
    },
    {
      key: 'additional_benefits',
      name: 'Additional Benefits:',
      value: account?.additional_benefits ? account?.additional_benefits : '',
    },
    {
      key: 'special_benefits',
      name: 'Special Benefits:',
      value: account?.special_benefits ? account?.special_benefits : '',
    },
  ]
  return (
    <>
      {companyHmoInformation.map((info, index) => (
        <FormField
          key={index}
          control={form.control}
          name={info.key as keyof z.infer<typeof companyEditsSchema>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-row pt-4" key={index}>
                  {editMode ? (
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      {info.name}{' '}
                      <Input
                        className="w-full"
                        {...field}
                        value={String(field.value ?? '')}
                      />
                    </div>
                  ) : (
                    <div className="text-md text-[#1e293b]">
                      {info.name} <span> {info.value}</span>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  )
}

export default CompanyHmoInformation
