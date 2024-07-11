import React from 'react'

const CompanyAccountInformation = () => {
  const companyAccountInformation = [
    {
      name: 'Account Type:',
      value: 'Account Type 1',
    },
    {
      name: 'Agent:',
      value: 'Agent 1',
    },
    {
      name: 'Active Status:',
      value: 'Active Status 1',
    },
    {
      name: 'Commission Rate:',
      value: 'Commission Rate 1',
    },
  ]
  return (
    <>
      {companyAccountInformation.map((info, index) => (
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

export default CompanyAccountInformation
