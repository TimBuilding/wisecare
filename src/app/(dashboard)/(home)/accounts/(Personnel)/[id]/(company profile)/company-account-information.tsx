import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import CompanyInformationItem from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-information-item'
import { formatPercentage } from '@/app/(dashboard)/(home)/accounts/columns/accounts-columns'
import getAccountById from '@/queries/get-account-by-id'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'

const AccountInformationFields = dynamic(
  () =>
    import(
      '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/edit/account-information-fields'
    ),
  { ssr: false },
)

interface CompanyAccountInformationProps {
  id: string
}

const CompanyAccountInformation: FC<CompanyAccountInformationProps> = ({
  id,
}) => {
  const { editMode } = useCompanyEditContext()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))

  return (
    <>
      {editMode ? (
        <Suspense fallback={<div>Loading...</div>}>
          <AccountInformationFields />
        </Suspense>
      ) : (
        <div className="flex flex-col gap-2 pt-4 md:grid md:grid-cols-2 lg:grid-cols-1">
          <CompanyInformationItem
            label="Account Type"
            value={
              account?.account_type ? (account.account_type as any).name : ''
            }
          />
          <CompanyInformationItem
            label="Agent"
            value={
              account?.agent
                ? `${account?.agent?.first_name} ${account?.agent?.last_name}`
                : undefined
            }
          />
          <CompanyInformationItem
            label="Commission Rate"
            value={formatPercentage(account?.commision_rate)}
          />
        </div>
      )}
    </>
  )
}

export default CompanyAccountInformation
