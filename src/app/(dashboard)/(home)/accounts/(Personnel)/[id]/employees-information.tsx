import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getEmployeeInputs from '@/queries/get-employee-inputs'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Tables } from '@/types/database.types'

interface EmployeesInformationProps {
  data: Tables<'company_employees'>
}

const EmployeesInformation: FC<EmployeesInformationProps> = ({ data }) => {
  return (
    <>
      {/* <div className="col-span-4 flex grid-cols-6 flex-col pt-4 lg:grid lg:p-2">
        <div className="flex flex-col gap-2 lg:col-span-2">
          <span className="text-md font-semibold text-[#161a1d]">
            {data.employee_number}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            EMPLOYEE NUMBER
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data?.real_description}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            REAL DESCRIPTION
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data?.age}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            AGE AS OF COVERAGE START
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.birth_date}
          </span>
          <span className="text-sm font-medium text-[#64748b]">BIRTHDATE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.gender}
          </span>
          <span className="text-sm font-medium text-[#64748b]">GENDER</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.civil_status}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            CIVIL STATUS
          </span>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-2">
          <span className="text-md font-semibold text-[#161a1d]">
            {data.bill_care_of}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            BILL CARE OF
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.bill_address}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            BILL ADDRESS
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.bill_city_municipal}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            BILL MUNICIPAL
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.bill_province}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            BILL PROVINCE
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.email}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            EMAIL ADDRESS
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.telephone_number}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            TELEPHONE NUMBER
          </span>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-2">
          <span className="text-md font-semibold text-[#161a1d]">
            {data.mobile_number}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            MOBILE NUMBER
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.agent_name}
          </span>
          <span className="text-sm font-medium text-[#64748b]">AGENT NAME</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.philhealth}
          </span>
          <span className="text-sm font-medium text-[#64748b]">PHILHEALTH</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.payment_mode}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            PAYMENT MODE
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.plan_type}
          </span>
          <span className="text-sm font-medium text-[#64748b]">PLAN TYPE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            {data.plan_description}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            PLAN DESCRIPTION
          </span>
        </div>
      </div> */}
    </>
  )
}

export default EmployeesInformation
