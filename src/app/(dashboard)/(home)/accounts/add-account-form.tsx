'use client'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { TableCell, TableRow } from '@/components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAccountsContext } from './accounts-provider'
import accountsSchema from './accounts-schema'
import MarketingInputs from './forms/marketing-inputs'

const AddAccountForm = () => {
  const { isFormOpen } = useAccountsContext()
  const form = useForm<z.infer<typeof accountsSchema>>({
    resolver: zodResolver(accountsSchema),
    defaultValues: {
      is_active: false,
      agent_id: '',
      company_name: '',
      company_address: '',
      nature_of_business: '',
      hmo_provider_id: '',
      previous_hmo_provider_id: '',
      current_hmo_provider_id: '',
      account_type_id: '',
      total_utilization: 0,
      total_premium_paid: 0,
      signatory_designation: '',
      contact_person: '',
      contact_number: '',
      principal_plan_type_id: '',
      dependent_plan_type_id: '',
      initial_head_count: 0,
      effectivity_date: new Date(),
      coc_issue_date: new Date(),
      effective_date: new Date(),
      renewal_date: new Date(),
      expiration_date: new Date(),
      delivery_date_of_membership_ids: new Date(),
      orientation_date: new Date(),
      initial_contract_value: 0,
      mode_of_payment_id: '',
      wellness_lecture_date: new Date(),
      annual_physical_examination_date: new Date(),
      commision_rate: 0,
      additional_benefits: '',
      special_benefits: '',
    },
  })

  console.log(form.formState.errors)
  const onSubmitHandler = () => {
    console.log('submitted')
  }

  // render nothing if the form is not open
  if (!isFormOpen) return null
  return (
    <div>
      <TableRow>
        <TableCell>Name</TableCell>
      </TableRow>
      <div className="z-20 w-screen border-y border-border pt-8 shadow-md md:w-[calc(100vw-288px)]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-5 px-8"
          >
            <MarketingInputs />
          </form>
        </Form>
        <div className="mt-8 border-t border-border py-3">
          <div className="flex flex-row items-center justify-between px-4">
            <Button variant="outline" className="w-24">
              Cancel
            </Button>
            <Button type="submit" variant="default" className="w-24">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAccountForm
