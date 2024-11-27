import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import CompanyInformationItem from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-information-item'
import { formatCurrency } from '@/app/(dashboard)/(home)/accounts/columns/accounts-columns'
import getAccountById from '@/queries/get-account-by-id'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'

const HmoInformationFields = dynamic(
  () =>
    import(
      '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/edit/hmo-information-fields'
    ),
  { ssr: false },
)

interface CompanyHmoInformationProps {
  id: string
}

const CompanyHmoInformation: FC<CompanyHmoInformationProps> = ({ id }) => {
  const { editMode } = useCompanyEditContext()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))

  return (
    <>
      {editMode ? (
        <Suspense fallback={<div>Loading...</div>}>
          <HmoInformationFields />
        </Suspense>
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
