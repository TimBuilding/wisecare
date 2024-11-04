'use client'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Loader2 } from 'lucide-react'
import { FormEventHandler, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import accountsSchema from './accounts-schema'
import MarketingInputs from './forms/marketing-inputs'
import normalizeToUTC from '@/utils/normalize-to-utc'

interface AddAccountFormProps {
  setIsOpen: (isOpen: boolean) => void
}

const AddAccountForm = ({ setIsOpen }: AddAccountFormProps) => {
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

  const { mutateAsync, isPending, isSuccess } = useInsertMutation(
    // @ts-ignore
    supabase.from('pending_accounts'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          title: 'Account creation request submitted!',
          description:
            'Your request to create a new account has been submitted successfully and is awaiting approval.',
        })

        form.reset()

        // close the dialog
        setIsOpen(false)
      },
      onError: (error) => {
        toast({
          title: 'Something went wrong',
          description: error.message,
          variant: 'destructive',
        })
      },
    },
  )

  const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      form.handleSubmit(async (data) => {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        // check if company_name already exists in pending_accounts
        const { data: existingAccount } = await supabase
          .from('pending_accounts')
          .select('company_name')
          .eq('company_name', data.company_name)
          .single()

        if (existingAccount) {
          form.setError('company_name', {
            message: 'Account already exists',
          })
          return
        }

        // check if company_name already exists in accounts
        const { data: existingAccountInAccounts } = await supabase
          .from('accounts')
          .select('company_name')
          .eq('company_name', data.company_name)
          .single()

        if (existingAccountInAccounts) {
          form.setError('company_name', {
            message: 'Account already exists',
          })
          return
        }

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
            effectivity_date: data.effectivity_date
              ? normalizeToUTC(new Date(data.effectivity_date))
              : null,
            coc_issue_date: data.coc_issue_date
              ? normalizeToUTC(new Date(data.coc_issue_date))
              : null,
            expiration_date: data.expiration_date
              ? normalizeToUTC(new Date(data.expiration_date))
              : null,
            delivery_date_of_membership_ids:
              data.delivery_date_of_membership_ids
                ? normalizeToUTC(new Date(data.delivery_date_of_membership_ids))
                : null,
            orientation_date: data.orientation_date
              ? normalizeToUTC(new Date(data.orientation_date))
              : null,
            initial_contract_value: data.initial_contract_value,
            mode_of_payment_id: data.mode_of_payment_id,
            wellness_lecture_date: data.wellness_lecture_date
              ? normalizeToUTC(new Date(data.wellness_lecture_date))
              : null,
            annual_physical_examination_date:
              data.annual_physical_examination_date
                ? normalizeToUTC(
                    new Date(data.annual_physical_examination_date),
                  )
                : null,
            commision_rate: data.commision_rate,
            additional_benefits: data.additional_benefits,
            special_benefits: data.special_benefits,
            name_of_signatory: data.name_of_signatory,
            designation_of_contact_person: data.designation_of_contact_person,
            email_address_of_contact_person:
              data.email_address_of_contact_person,
            created_by: user?.id,
            operation_type: 'insert',
          },
        ])
      })(e)
    },
    [form, mutateAsync, supabase],
  )

  return (
    <Form {...form}>
      <form onSubmit={onSubmitHandler}>
        <MarketingInputs isLoading={isPending || isSuccess} />
        <DialogFooter className="flex flex-row items-center justify-between px-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-24"
              disabled={isPending || isSuccess}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="default"
            className="w-fit"
            disabled={isPending || isSuccess}
          >
            {isPending || isSuccess ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Create Account'
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default AddAccountForm
