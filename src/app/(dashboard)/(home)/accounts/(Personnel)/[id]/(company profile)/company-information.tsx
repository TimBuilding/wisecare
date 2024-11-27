import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import CompanyInformationItem from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-information-item'
import getAccountById from '@/queries/get-account-by-id'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'

const CompanyInformationFields = dynamic(
  () =>
    import(
      '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/edit/company-information-fields'
    ),
  { ssr: false },
)

interface CompanyInformationProps {
  id: string
}

const CompanyInformation: FC<CompanyInformationProps> = ({ id }) => {
  const { editMode } = useCompanyEditContext()
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))

  return (
    <>
      {editMode ? (
        <Suspense fallback={<div>Loading...</div>}>
          <CompanyInformationFields />
        </Suspense>
      ) : (
        <div className="grid grid-cols-2 gap-2 pt-4">
          <CompanyInformationItem
            label="Company Name"
            value={account?.company_name?.toString()}
          />
          <CompanyInformationItem
            label="Company Address"
            value={account?.company_address?.toString()}
          />
          <CompanyInformationItem
            label="Nature of Business"
            value={account?.nature_of_business?.toString()}
          />
          <CompanyInformationItem
            label="Contact Person"
            value={account?.contact_person?.toString()}
          />
          <CompanyInformationItem
            label="Contact Number"
            value={account?.contact_number?.toString()}
          />
          <CompanyInformationItem
            label="Signatory Designation"
            value={account?.signatory_designation?.toString()}
          />
          <CompanyInformationItem
            label="Name of Signatory"
            value={account?.name_of_signatory?.toString()}
          />
          <CompanyInformationItem
            label="Designation of Contact Person"
            value={account?.designation_of_contact_person?.toString()}
          />
          <CompanyInformationItem
            label="Email Address of Contact Person"
            value={account?.email_address_of_contact_person?.toString()}
          />
        </div>
      )}
    </>
  )
}

export default CompanyInformation
