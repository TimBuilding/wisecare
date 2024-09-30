import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getAccountById from '@/queries/get-account-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import accountsSchema from '@/app/(dashboard)/(home)/accounts/accounts-schema'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'

interface CompanyInformationProps {
  id: string
}

const CompanyInformation: FC<CompanyInformationProps> = ({ id }) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const form = useFormContext<z.infer<typeof accountsSchema>>()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const companyInformation = [
    {
      key: 'nature_of_business',
      name: 'Nature of Business:',
      value: account?.nature_of_business || '',
    },
    {
      key: 'contact_person',
      name: 'Contact Person:',
      value: account?.contact_person || '',
    },
    {
      key: 'contact_number',
      name: 'Contact Number:',
      value: account?.contact_number || '',
    },
    {
      key: 'signatory_designation',
      name: 'Signatory Designation:',
      value: account?.signatory_designation || '',
    },
    {
      key: 'name_of_signatory',
      name: 'Name of Signatory:',
      value: account?.name_of_signatory || '',
    },
    {
      key: 'designation_of_contact_person',
      name: 'Designation of Contact Person:',
      value: account?.designation_of_contact_person || '',
    },
    {
      key: 'email_address_of_contact_person',
      name: 'Email Address of Contact Person:',
      value: account?.email_address_of_contact_person || '',
    },
  ]

  return (
    <>
      {companyInformation.map((info, index) => (
        <FormField
          key={index}
          control={form.control}
          name={info.key as keyof z.infer<typeof accountsSchema>}
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

export default CompanyInformation
