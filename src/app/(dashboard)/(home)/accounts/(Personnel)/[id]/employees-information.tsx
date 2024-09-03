import React, { FC } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import getEmployeeInputs from '@/queries/get-employee-inputs'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

interface EmployeesInformationProps {
  id: string
}

const EmployeesInformation: FC<EmployeesInformationProps> = ({ id }) => {
  const supabase = createBrowserClient()
  const { data: employees, error } = useQuery(getEmployeeInputs(supabase, id))

  console.log(employees)
  console.log(error)
  return (
    <>
      {employees &&
        employees.map((employee) => (
          <div key={employee.id} className="flex flex-col pt-4 lg:p-2">
            <span className="text-md font-semibold text-[#161a1d]">
              {employee.first_name}
            </span>
            <span className="text-sm font-medium text-[#64748b]">
              {employee.last_name}
            </span>
          </div>
        ))}
    </>
  )
}

export default EmployeesInformation
