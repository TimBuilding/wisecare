import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getAccountById from '@/queries/get-account-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Input } from '@/components/ui/input'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'
import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edits-schema'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

interface CompanyContractInformationProps {
  id: string
}

const CompanyContractInformation: FC<CompanyContractInformationProps> = ({
  id,
}) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const form = useFormContext<z.infer<typeof companyEditsSchema>>()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const companyContractInformation = [
    {
      key: 'initial_contract_value',
      name: 'Initial Contract Value:',
      value: account?.initial_contract_value || '',
    },
    {
      key: 'initial_head_count',
      name: 'Initial Head Count:',
      value: account?.initial_head_count || '',
    },
    {
      key: 'total_contract_value',
      name: 'Total Contract Value:',
      value: account?.total_contract_value || '',
    },
    {
      key: 'total_utilization',
      name: 'Balance:',
      value: account?.balance || '',
    },
    {
      key: 'mode_of_payment_id',
      name: 'Mode of Payment:',
      // @ts-ignore
      value: account?.mode_of_payment ? account?.mode_of_payment.name : '',
    },
    {
      key: 'mode_of_premium_id',
      name: 'Mode of Premium:',
      // @ts-ignore
      value: account?.mode_of_premium ? account?.mode_of_premium.name : '',
    },
    {
      key: 'due_date',
      name: 'Due Date:',
      value: account?.due_date || '',
    },
    {
      key: 'amount',
      name: 'Amount:',
      value: account?.amount || '',
    },
    {
      key: 'expiration_date',
      name: 'Expiration Date:',
      value: account?.expiration_date || '',
    },
    {
      key: 'effectivity_date',
      name: 'Effectivity Date:',
      value: account?.effectivity_date || '',
    },
    {
      key: 'coc_issue_date',
      name: 'COC Issue Date:',
      value: account?.coc_issue_date || '',
    },
    {
      key: 'delivery_date_of_membership_ids',
      name: 'Delivery Date of Membership IDs:',
      value: account?.delivery_date_of_membership_ids || '',
    },
    {
      key: 'orientation_date',
      name: 'Orientation Date:',
      value: account?.orientation_date || '',
    },
    {
      key: 'wellness_lecture_date',
      name: 'Wellness Lecture Date:',
      value: account?.wellness_lecture_date || '',
    },
    {
      key: 'annual_physical_examination_date',
      name: 'Annual Physical Examination Date:',
      value: account?.annual_physical_examination_date || '',
    },
    {
      key: 'billing_period',
      name: 'Billing Period:',
      value: account?.billing_period || '',
    },
  ]
  return (
    <>
      {companyContractInformation.map((info, index) => (
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

export default CompanyContractInformation
