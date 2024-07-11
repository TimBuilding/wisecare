import React from 'react'

const CompanyInformation = () => {
  const companyInformation = [
    {
      name: 'Nature of Business:',
      value: 'Nature of Business 1',
    },
    {
      name: 'Contact Person:',
      value: 'Jane Doe',
    },
    {
      name: 'Contact Number:',
      value: '09123456789',
    },
    {
      name: 'Signatory Designation:',
      value: 'Signatory Designation 1',
    },
  ]
  return (
    <>
      {companyInformation.map((info, index) => (
        <div className="flex flex-row pt-4" key={index}>
          <div className="text-md text-[#1e293b]">
            {' '}
            {info.name} <span> {info.value}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default CompanyInformation
