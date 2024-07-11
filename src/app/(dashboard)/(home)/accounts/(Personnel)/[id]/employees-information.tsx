import React from 'react'

const EmployeesInformation = () => {
  const employeesInfo = [
    {
      description: '0123456789',
      label: 'EMPLOYEE NUMBER',
    },
    {
      description: 'PRINCIPAL',
      label: 'REAL DESCRIPTION',
    },
    {
      description: '25',
      label: 'AGE AS OF COVERAGE START',
    },
    {
      description: '08/05/2002',
      label: 'BIRTHDATE',
    },
    {
      description:
        '17 Valencia St. Intercity Homes Cupang, Muntinlupa, Metro Manila',
      label: 'RESIDENTIAL ADDRESS',
    },
    {
      description: 'Female',
      label: 'GENDER',
    },
    {
      description: 'Single',
      label: 'CIVIL STATUS',
    },
    {
      description: 'Jane Doe',
      label: 'BILL CARE OF',
    },
    {
      description: '16th Floor M1 Tower HV Dela Costa Salcedo Village',
      label: 'BILL ADDRESS',
    },
    {
      description: 'Makati, City',
      label: 'BILL MUNICIPAL',
    },
    {
      description: 'Metro Manila',
      label: 'BILL PROVINCE',
    },
    {
      description: 'tam@gmail.com',
      label: 'EMAIL ADDRESS',
    },
    {
      description: '96123456',
      label: 'TELEPHONE NUMBER',
    },
    {
      description: '09123456789',
      label: 'MOBILE NUMBER',
    },
    {
      description: 'Wisecare Providers Inc.',
      label: 'AGENT NAME',
    },
    {
      description: 'R',
      label: 'PHILHEALTH',
    },
    {
      description: 'Quarterly',
      label: 'PAYMENT MODE',
    },
    {
      description: 'Platinum',
      label: 'PLAN TYPE',
    },
    {
      description: 'PLA-LEVEL II',
      label: 'PLAN DESCRIPTION',
    },
  ]
  return (
    <>
      {employeesInfo.map((info, index) => (
        <div key={index} className="flex flex-col pt-4 lg:p-2">
          <span className="text-md font-semibold text-[#161a1d]">
            {info.description}
          </span>
          <span className="text-sm font-medium text-[#64748b]">
            {info.label}
          </span>
        </div>
      ))}
    </>
  )
}

export default EmployeesInformation
