'use client'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import accountsSchema from './accounts-schema'
import MarketingInputs from './forms/marketing-inputs'

const AddAccountForm = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof accountsSchema>>({
    resolver: zodResolver(accountsSchema),
    defaultValues: {
      is_active: true,
      agent_id: null,
      company_name: '',
      company_address: null,
      nature_of_business: null,
      hmo_provider_id: null,
      previous_hmo_provider_id: null,
      current_hmo_provider_id: null,
      account_type_id: null,
      total_utilization: null,
      total_premium_paid: null,
      signatory_designation: null,
      contact_person: null,
      contact_number: null,
      principal_plan_type_id: null,
      dependent_plan_type_id: null,
      initial_head_count: null,
      effectivity_date: null,
      coc_issue_date: null,
      expiration_date: null,
      delivery_date_of_membership_ids: null,
      orientation_date: null,
      initial_contract_value: null,
      mode_of_payment_id: null,
      wellness_lecture_date: null,
      annual_physical_examination_date: null,
      commision_rate: null,
      additional_benefits: null,
      special_benefits: null,
      name_of_signatory: null,
      designation_of_contact_person: null,
      email_address_of_contact_person: null,
    },
  })

  const supabase = createBrowserClient()
  const router = useRouter()
  const { mutateAsync, isPending, data } = useInsertMutation(
    // @ts-ignore
    supabase.from('accounts'),
    ['id'],
    'id',
    {
      onError: (error) => {
        toast({
          title: 'Something went wrong',
          description: error.message,
          variant: 'destructive',
        })
      },
    },
  )

  // redirect to the new account
  useEffect(() => {
    if (data) {
      router.push(`/accounts/${data[0].id}`)
    }
  }, [data, router])

  const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      form.handleSubmit(async (data) => {
        await mutateAsync([
          {
            company_name: data.company_name,
            is_active: data.is_active,
            agent_id: data.agent_id,
            company_address: data.company_address,
            nature_of_business: data.nature_of_business,
            hmo_provider_id: data.hmo_provider_id,
            previous_hmo_provider_id: data.previous_hmo_provider_id,
            current_hmo_provider_id: data.current_hmo_provider_id,
            account_type_id: data.account_type_id,
            total_utilization: data.total_utilization,
            total_premium_paid: data.total_premium_paid,
            signatory_designation: data.signatory_designation,
            contact_person: data.contact_person,
            contact_number: data.contact_number,
            principal_plan_type_id: data.principal_plan_type_id,
            dependent_plan_type_id: data.dependent_plan_type_id,
            initial_head_count: data.initial_head_count,
            effectivity_date: data.effectivity_date,
            coc_issue_date: data.coc_issue_date,
            expiration_date: data.expiration_date,
            delivery_date_of_membership_ids:
              data.delivery_date_of_membership_ids,
            orientation_date: data.orientation_date,
            initial_contract_value: data.initial_contract_value,
            mode_of_payment_id: data.mode_of_payment_id,
            wellness_lecture_date: data.wellness_lecture_date,
            annual_physical_examination_date:
              data.annual_physical_examination_date,
            commision_rate: data.commision_rate,
            additional_benefits: data.additional_benefits,
            special_benefits: data.special_benefits,
            name_of_signatory: data.name_of_signatory,
            designation_of_contact_person: data.designation_of_contact_person,
            email_address_of_contact_person:
              data.email_address_of_contact_person,
          },
        ])
      })(e)
    },
    [form, mutateAsync],
  )

  return (
    <Form {...form}>
      <form onSubmit={onSubmitHandler}>
        <MarketingInputs isLoading={isPending} />
        <DialogFooter className="flex flex-row items-center justify-between px-4">
          <DialogClose asChild>
            <Button variant="outline" className="w-24" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : 'Cancel'}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="default"
            className="w-24"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Save'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default AddAccountForm
