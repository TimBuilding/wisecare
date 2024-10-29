import DateInput from '@/app/(dashboard)/(home)/accounts/forms/date-input'
import NumberInput from '@/app/(dashboard)/(home)/accounts/forms/number-input'
import SelectInput from '@/app/(dashboard)/(home)/accounts/forms/select-input'
import TextInput from '@/app/(dashboard)/(home)/accounts/forms/text-input'
import currencyOptions from '@/components/maskito/currency-options'
import percentageOptions from '@/components/maskito/percentage-options'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import getAgents from '@/queries/get-agents'
import getTypes from '@/queries/get-types'
import { createBrowserClient } from '@/utils/supabase'
import { useMaskito } from '@maskito/react'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import accountsSchema from '../accounts-schema'
import InputWithMask from '@/app/(dashboard)/(home)/accounts/forms/input-with-mask'

interface Props {
  isLoading: boolean
}

const MarketingInputs: FC<Props> = ({ isLoading }) => {
  const form = useFormContext<z.infer<typeof accountsSchema>>()
  const supabase = createBrowserClient()

  const { data: agents } = useQuery(getAgents(supabase))
  const { data: hmoProviders } = useQuery(getTypes(supabase, 'hmo_providers'))
  const { data: accountTypes } = useQuery(getTypes(supabase, 'account_types'))
  const { data: planTypes } = useQuery(getTypes(supabase, 'plan_types'))
  const { data: modeOfPayments } = useQuery(
    getTypes(supabase, 'mode_of_payments'),
  )

  const maskedCommissionRateRef = useMaskito({ options: percentageOptions })
  const maskedInitialContractValueRef = useMaskito({ options: currencyOptions })
  const maskedTotalPremiumPaidRef = useMaskito({ options: currencyOptions })

  return (
    <div className="grid gap-4 py-4">
      <h3 className="text-md font-semibold">Company Information</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectInput
          form={form}
          isLoading={isLoading}
          label="Agent"
          name="agent_id"
          placeholder="Select Agent"
          options={agents?.map((agent) => ({
            label: `${agent.first_name} ${agent.last_name}`,
            value: agent.user_id,
          }))}
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Company Name"
          name="company_name"
          placeholder="Enter company name"
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Company Address"
          name="company_address"
          placeholder="Enter company address"
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Nature of Business"
          name="nature_of_business"
          placeholder="Enter nature of business"
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Name of Signatory"
          name="name_of_signatory"
          placeholder="Enter name of signatory"
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Designation of Contact Person"
          name="designation_of_contact_person"
          placeholder="Enter designation of contact person"
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Contact Person"
          name="contact_person"
          placeholder="Enter contact person"
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Contact Number"
          name="contact_number"
          placeholder="Enter contact number"
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Email Address of Contact Person"
          name="email_address_of_contact_person"
          placeholder="Enter email address of contact person"
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Signatory Designation"
          name="signatory_designation"
          placeholder="Enter signatory designation"
        />
      </div>

      <h3 className="text-md mt-3 font-semibold">HMO Information</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectInput
          form={form}
          isLoading={isLoading}
          label="HMO Provider"
          name="hmo_provider_id"
          options={hmoProviders?.map((hmoProvider) => ({
            label: hmoProvider.name,
            value: hmoProvider.id,
          }))}
        />
        <SelectInput
          form={form}
          isLoading={isLoading}
          label="Previous HMO Provider"
          name="previous_hmo_provider_id"
          options={hmoProviders?.map((hmoProvider) => ({
            label: hmoProvider.name,
            value: hmoProvider.id,
          }))}
        />
        <SelectInput
          form={form}
          isLoading={isLoading}
          label="Current HMO Provider"
          name="current_hmo_provider_id"
          options={hmoProviders?.map((hmoProvider) => ({
            label: hmoProvider.name,
            value: hmoProvider.id,
          }))}
        />
        <SelectInput
          form={form}
          isLoading={isLoading}
          label="Principal Plan Type"
          name="principal_plan_type_id"
          options={planTypes?.map((planType) => ({
            label: planType.name,
            value: planType.id,
          }))}
        />
        <SelectInput
          form={form}
          isLoading={isLoading}
          label="Dependent Plan Type"
          name="dependent_plan_type_id"
          options={planTypes?.map((planType) => ({
            label: planType.name,
            value: planType.id,
          }))}
        />
        <NumberInput
          form={form}
          isLoading={isLoading}
          label="Total Utilization"
          name="total_utilization"
          placeholder="Enter total utilization"
        />
        <InputWithMask
          form={form}
          isLoading={isLoading}
          label="Total Premium Paid"
          name="total_premium_paid"
          maskType="currency"
        />
        <TextInput
          form={form}
          isLoading={isLoading}
          label="Additional Benefits"
          name="additional_benefits"
          placeholder="Enter additional benefits"
        />
      </div>
      <TextInput
        form={form}
        isLoading={isLoading}
        label="Special Benefits"
        name="special_benefits"
        placeholder="Enter special benefits"
      />

      <h3 className="text-md mt-3 font-semibold">Contract Information</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <InputWithMask
          form={form}
          isLoading={isLoading}
          label="Initial Contract Value"
          name="initial_contract_value"
          maskType="currency"
        />
        <NumberInput
          form={form}
          isLoading={isLoading}
          label="Initial Head Count"
          name="initial_head_count"
          placeholder="Enter initial head count"
        />
        <SelectInput
          form={form}
          isLoading={isLoading}
          label="Mode of Payment"
          name="mode_of_payment_id"
          options={modeOfPayments?.map((modeOfPayment) => ({
            label: modeOfPayment.name,
            value: modeOfPayment.id,
          }))}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DateInput
          form={form}
          isLoading={isLoading}
          label="Expiration Date"
          name="expiration_date"
        />
        <DateInput
          form={form}
          isLoading={isLoading}
          label="Effectivity Date"
          name="effectivity_date"
        />
        <DateInput
          form={form}
          isLoading={isLoading}
          label="COC Issue Date"
          name="coc_issue_date"
        />

        <DateInput
          form={form}
          isLoading={isLoading}
          label="Delivery Date of Membership IDs"
          name="delivery_date_of_membership_ids"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <DateInput
          form={form}
          isLoading={isLoading}
          label="Orientation Date"
          name="orientation_date"
        />
        <DateInput
          form={form}
          isLoading={isLoading}
          label="Wellness Lecture Date"
          name="wellness_lecture_date"
        />
        <DateInput
          form={form}
          isLoading={isLoading}
          label="Annual Physical Examination Date"
          name="annual_physical_examination_date"
        />
      </div>

      <h3 className="text-md mt-3 font-semibold">Account Information</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectInput
          form={form}
          isLoading={isLoading}
          label="Account Type"
          name="account_type_id"
          options={accountTypes?.map((accountType) => ({
            label: accountType.name,
            value: accountType.id,
          }))}
        />
        <InputWithMask
          form={form}
          isLoading={isLoading}
          label="Commission Rate (%)"
          name="commision_rate"
          maskType="percentage"
        />
      </div>
    </div>
  )
}

export default MarketingInputs
