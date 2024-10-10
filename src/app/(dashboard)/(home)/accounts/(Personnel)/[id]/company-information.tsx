import React, { FC, FormEventHandler } from 'react'
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
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'
import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edits-schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface CompanyInformationProps {
  id: string
}

const CompanyInformation: FC<CompanyInformationProps> = ({ id }) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const form = useFormContext<z.infer<typeof companyEditsSchema>>()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))

  return (
    <>
      {editMode ? (
        <>
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Company Name:
                      <Input className="w-full" {...field} />
                    </div>
                  </div>
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
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Company Address: <Input className="w-full" {...field} />
                    </div>
                  </div>
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
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Nature of Business:
                      <Input className="w-full" {...field} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_person"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Contact Person:
                      <Input className="w-full" {...field} />
                    </div>
                  </div>
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
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Contact Number:
                      <Input className="w-full" {...field} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="signatory_designation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Signatory Designation:
                      <Input className="w-full" {...field} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name_of_signatory"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Name of Signatory:
                      <Input className="w-full" {...field} />
                    </div>
                  </div>
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
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Designation of Contact Person:
                      <Input className="w-full" {...field} />
                    </div>
                  </div>
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
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Email Address of Contact Person:
                      <Input className="w-full" {...field} />
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
              Company Name: <span>{account?.company_name}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Company Address: <span>{account?.company_address}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Nature of Business: <span>{account?.nature_of_business}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Contact Person: <span>{account?.contact_person}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Contact Number: <span>{account?.contact_number}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Signatory Designation:{' '}
              <span>{account?.signatory_designation}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Name Of Signatory: <span>{account?.name_of_signatory}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Designation of Contact Person:{' '}
              <span>{account?.designation_of_contact_person}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              Email Address of Contact Person:{' '}
              <span>{account?.email_address_of_contact_person}</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CompanyInformation
