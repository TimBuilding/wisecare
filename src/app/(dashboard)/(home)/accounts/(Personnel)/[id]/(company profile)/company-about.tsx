import CompanyAccountInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-account-information'
import CompanyCancelButton from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-cancel-button'
import CompanyContractInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-contract-information'
import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import companyEditsSchema from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edits-schema'
import CompanyHMOInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-HMO-information'
import CompanyInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-information'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import getAccountById from '@/queries/get-account-by-id'
import { createBrowserClient } from '@/utils/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'
import { FC, FormEventHandler, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  companyId: string
}

const CompanyAbout: FC<Props> = ({ companyId }) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, companyId))

  const form = useForm<z.infer<typeof companyEditsSchema>>({
    resolver: zodResolver(companyEditsSchema),
    defaultValues: {
      is_active: account?.is_active ?? false,
      agent_id: account?.agent?.user_id ?? '',
      company_name: account?.company_name ?? '',
      company_address: account?.company_address ?? '',
      nature_of_business: account?.nature_of_business ?? '',
      hmo_provider_id: (account?.hmo_provider as any).id ?? '',
      previous_hmo_provider_id:
        (account?.previous_hmo_provider as any).id ?? '',
      current_hmo_provider_id: (account?.current_hmo_provider as any).id ?? '',
      account_type_id: account?.account_type?.id ?? '',
      total_utilization: account?.total_utilization ?? 0,
      total_premium_paid: account?.total_premium_paid ?? 0,
      signatory_designation: account?.signatory_designation ?? '',
      contact_person: account?.contact_person ?? '',
      contact_number: account?.contact_number ?? '',
      principal_plan_type_id: (account?.principal_plan_type as any).id ?? '',
      dependent_plan_type_id: (account?.dependent_plan_type as any).id ?? '',
      initial_head_count: account?.initial_head_count ?? 0,
      effectivity_date: new Date(account?.effectivity_date ?? '') ?? undefined,
      coc_issue_date: new Date(account?.coc_issue_date ?? '') ?? undefined,
      expiration_date: new Date(account?.expiration_date ?? '') ?? undefined,
      delivery_date_of_membership_ids:
        new Date(account?.delivery_date_of_membership_ids ?? '') ?? undefined,
      orientation_date: new Date(account?.orientation_date ?? '') ?? undefined,
      initial_contract_value: account?.initial_contract_value ?? 0,
      mode_of_payment_id: (account?.mode_of_payment as any).id ?? '',
      wellness_lecture_date:
        new Date(account?.wellness_lecture_date ?? '') ?? undefined,
      annual_physical_examination_date:
        new Date(account?.annual_physical_examination_date ?? '') ?? undefined,
      commision_rate: account?.commision_rate ?? 0,
      additional_benefits: account?.additional_benefits ?? '',
      special_benefits: account?.special_benefits ?? '',
      name_of_signatory: account?.name_of_signatory ?? '',
      designation_of_contact_person:
        account?.designation_of_contact_person ?? '',
      email_address_of_contact_person:
        account?.email_address_of_contact_person ?? '',
    },
  })

  const { mutateAsync } = useUpdateMutation(
    //@ts-ignore
    supabase.from('accounts'),
    ['id'],
    'id',
    {
      onSuccess: () => {
        setEditMode(false)
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
        await mutateAsync({
          id: companyId,
          company_name: data.company_name,
          company_address: data.company_address,
          initial_head_count: data.initial_head_count,
          nature_of_business: data.nature_of_business,
          contact_person: data.contact_person,
          contact_number: data.contact_number,
          signatory_designation: data.signatory_designation,
          name_of_signatory: data.name_of_signatory,
          designation_of_contact_person: data.designation_of_contact_person,
          email_address_of_contact_person: data.email_address_of_contact_person,
          account_type_id: data?.account_type_id,
          agent_id: data.agent_id,
          is_active: data.is_active,
          commision_rate: data.commision_rate,
          hmo_provider_id: data?.hmo_provider_id,
          previous_hmo_provider_id: data?.previous_hmo_provider_id,
          current_hmo_provider_id: data?.current_hmo_provider_id,
          principal_plan_type_id: data?.principal_plan_type_id,
          dependent_plan_type_id: data?.dependent_plan_type_id,
          total_utilization: data.total_utilization,
          total_premium_paid: data.total_premium_paid,
          additional_benefits: data.additional_benefits,
          special_benefits: data.special_benefits,
          initial_contract_value: data.initial_contract_value,
          mode_of_payment_id: data?.mode_of_payment_id,
          expiration_date: data.expiration_date,
          effectivity_date: data.effectivity_date,
          coc_issue_date: data.coc_issue_date,
          delivery_date_of_membership_ids: data.delivery_date_of_membership_ids,
          orientation_date: data.orientation_date,
          wellness_lecture_date: data.wellness_lecture_date,
          annual_physical_examination_date:
            data.annual_physical_examination_date,
        })
      })(e)
    },
    [companyId, form, mutateAsync],
  )

  return (
    <Form {...form}>
      <form onSubmit={onSubmitHandler}>
        <div className="mx-auto flex w-full flex-col items-center justify-between gap-6 lg:flex-row lg:items-start ">
          <div className="flex w-full flex-col gap-6 lg:max-w-xs">
            <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
              <span className="text-lg font-semibold">Company Information</span>
              <CompanyInformation id={companyId} />
            </div>
            <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
              <span className="text-lg font-semibold">Account Information</span>
              <CompanyAccountInformation id={companyId} />
            </div>
          </div>
          <div className="flex w-full flex-col gap-6">
            <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
              <span className="text-lg font-semibold">HMO Information</span>
              <CompanyHMOInformation id={companyId} />
            </div>
            <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md">
              <span className="text-lg font-semibold">
                Contract Information
              </span>
              <CompanyContractInformation id={companyId} />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center justify-between gap-4 lg:ml-auto lg:justify-end">
          {editMode && (
            <>
              <CompanyCancelButton />
              <Button
                type="submit"
                variant="default"
                className="w-full rounded-md lg:w-auto"
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  )
}

export default CompanyAbout
