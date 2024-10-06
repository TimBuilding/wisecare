import React from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'
import getAccountById from '@/queries/get-account-by-id'
import { Input } from '@/components/ui/input'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edit-provider'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-edits-schema'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

interface Props {
  id: string
}

const CompanyFinancialInformation: FC<Props> = ({ id }) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const supabase = createBrowserClient()
  const form = useFormContext<z.infer<typeof companyEditsSchema>>()
  const { data: account, error } = useQuery(getAccountById(supabase, id))

  return (
    <>
      {editMode ? (
        <>
          <FormField
            control={form.control}
            name="or_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      OR Number:{' '}
                      <Input
                        className="w-full"
                        {...field}
                        value={String(field.value ?? '')}
                      />
                    </div>
                  </div>
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
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      OR Date:{' '}
                      <Input
                        className="w-full"
                        {...field}
                        value={field.value ? String(field.value) : ''}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sa_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      SA Number:{' '}
                      <Input
                        className="w-full"
                        {...field}
                        value={String(field.value ?? '')}
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
              OR Number: <span>{account?.or_number}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              OR Date: <span>{account?.or_date}</span>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <div className="text-md text-[#1e293b]">
              SA Number: <span>{account?.sa_number}</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CompanyFinancialInformation
