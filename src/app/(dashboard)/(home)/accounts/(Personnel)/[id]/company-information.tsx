import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getAccountById from '@/queries/get-account-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

interface CompanyInformationProps {
  id: string
}

const CompanyInformation: FC<CompanyInformationProps> = ({ id }) => {
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const companyInformation = [
    {
      name: 'Nature of Business:',
      value: account?.nature_of_business || '',
    },
    {
      name: 'Contact Person:',
      value: account?.contact_person || '',
    },
    {
      name: 'Contact Number:',
      value: account?.contact_number || '',
    },
    {
      name: 'Signatory Designation:',
      value: account?.signatory_designation || '',
    },
    {
      name: 'Name of Signatory:',
      value: account?.name_of_signatory || '',
    },
    {
      name: 'Designation of Contact Person:',
      value: account?.designation_of_contact_person || '',
    },
    {
      name: 'Email Address of Contact Person:',
      value: account?.email_address_of_contact_person || '',
    },
  ]
  return (
    <>
      {companyInformation.map((info, index) => (
        <div className="flex flex-row pt-4" key={index}>
          <div className="text-md text-[#1e293b]">
            {info.name} <span> {info.value}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default CompanyInformation
