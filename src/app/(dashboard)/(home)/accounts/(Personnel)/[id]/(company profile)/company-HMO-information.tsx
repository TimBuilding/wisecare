import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edits-schema'
import CompanyInformationItem from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-information-item'
import { formatCurrency } from '@/app/(dashboard)/(home)/accounts/columns/accounts-columns'
import currencyOptions from '@/components/maskito/currency-options'
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
import getAccountById from '@/queries/get-account-by-id'
import getTypes from '@/queries/get-types'
import { createBrowserClient } from '@/utils/supabase'
import { useMaskito } from '@maskito/react'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

interface CompanyHmoInformationProps {
  id: string
}

const CompanyHmoInformation: FC<CompanyHmoInformationProps> = ({ id }) => {
  const { editMode } = useCompanyEditContext()
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
            key={'monds'}
            control={form.control}
            name="hmo_provider_id"
            render={({ field }) => (
              <FormItem>
                <div className="pt-4">
                  <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
                  <div className="pt-4">
                    <div className="text-md w-full text-[#1e293b] md:grid md:grid-cols-2 lg:grid-cols-1">
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
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
                  <div className="pt-4">
                    <div className="text-md grid w-full text-[#1e293b] md:grid-cols-2 lg:grid-cols-1">
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
            value={formatCurrency(account?.total_premium_paid)}
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
