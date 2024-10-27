import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getAccountById from '@/queries/get-account-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Input } from '@/components/ui/input'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edits-schema'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import getTypes from '@/queries/get-types'
import { useMaskito } from '@maskito/react'
import currencyOptions from '@/components/maskito/currency-options'

const CompanyInformationItem = ({
  label,
  value,
}: {
  label: string
  value?: string | undefined
}) => (
  <div className="flex flex-col py-1">
    <div className="text-sm font-medium text-muted-foreground">{label}</div>
    <div className="text-md font-semibold">{value || 'No data'}</div>
  </div>
)
interface CompanyHmoInformationProps {
  id: string
}

const CompanyHmoInformation: FC<CompanyHmoInformationProps> = ({ id }) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const form = useFormContext<z.infer<typeof companyEditsSchema>>()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const { data: hmoProviders } = useQuery(getTypes(supabase, 'hmo_providers'))
  const { data: planTypes } = useQuery(getTypes(supabase, 'plan_types'))

  const maskedTotalPremiumPaidRef = useMaskito({ options: currencyOptions })
  return (
    <>
      {editMode ? (
        <>
          <FormField
            control={form.control}
            name="hmo_provider_id"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row pt-4">
                  <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                    HMO Provider:
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
                        {hmoProviders?.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
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
            name="previous_hmo_provider_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Previous HMO Provider:
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
                          {hmoProviders?.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="current_hmo_provider_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Current HMO Provider:
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
                          {hmoProviders?.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="principal_plan_type_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Principal Plan Type:
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
                          {planTypes?.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dependent_plan_type_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Dependent Plan Type:
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
                          {planTypes?.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total_utilization"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Total Utilization:
                      <Input className="w-full" {...field} type="number" />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total_premium_paid"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex w-full flex-row text-[#1e293b] md:grid md:grid-cols-2 lg:grid-cols-1">
                      Total Premium Paid:
                      <Input
                        className="w-full"
                        {...field}
                        value={field.value ?? ''}
                        ref={maskedTotalPremiumPaidRef}
                        onInput={field.onChange}
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
            name="additional_benefits"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Additional Benefits:
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
            name="special_benefits"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row pt-4">
                    <div className="text-md flex grid w-full flex-row text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
                      Special Benefits:
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
        <div className="grid grid-cols-2 gap-2 pt-4">
          <CompanyInformationItem
            label={'HMO Provider'}
            value={
              account?.hmo_provider ? (account.hmo_provider as any).name : ''
            }
          />
          <CompanyInformationItem
            label={'Previous HMO Provider'}
            value={
              account?.previous_hmo_provider
                ? (account.previous_hmo_provider as any).name
                : ''
            }
          />
          <CompanyInformationItem
            label={'Current HMO Provider'}
            value={
              account?.current_hmo_provider
                ? (account.current_hmo_provider as any).name
                : ''
            }
          />
          <CompanyInformationItem
            label={'Principal Plan Type'}
            value={
              account?.principal_plan_type
                ? (account.principal_plan_type as any).name
                : ''
            }
          />
          <CompanyInformationItem
            label={'Dependent Plan Type'}
            value={
              account?.dependent_plan_type
                ? (account.dependent_plan_type as any).name
                : ''
            }
          />
          <CompanyInformationItem
            label={'Total Utilization'}
            value={account?.total_utilization?.toString()}
          />
          <CompanyInformationItem
            label={'Total Premium Paid'}
            value={account?.total_premium_paid?.toString()}
          />
          <CompanyInformationItem
            label={'Additional Benefits'}
            value={account?.additional_benefits?.toString()}
          />
          <CompanyInformationItem
            label={'Special Benefits'}
            value={account?.special_benefits?.toString()}
          />
        </div>
      )}
    </>
  )
}

export default CompanyHmoInformation
