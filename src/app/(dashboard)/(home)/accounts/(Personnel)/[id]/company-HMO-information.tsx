import React from 'react'

const CompanyHmoInformation = () => {
  const companyHmoInformation = [
    {
      name: 'HMO Provider:',
      value: 'HMO Provider 1',
    },
    {
      name: 'Previous HMO Provider:',
      value: 'Previous HMO Provider 1',
    },
    {
      name: 'Current HMO Provider:',
      value: 'Current HMO Provider 1',
    },
    {
      name: 'Principal Plan Type:',
      value: 'Principal Plan Type 1',
    },
    {
      name: 'Dependent Plan Type:',
      value: 'Dependent Plan Type 1',
    },
    {
      name: 'Total Utilization:',
      value: 'Total Utilization 1',
    },
    {
      name: 'Total Premium Paid:',
      value: 'Total Premium Paid 1',
    },
    {
      name: 'Total Premium Paid:',
      value: 'Total Premium Paid 1',
    },
    {
      name: 'Total Head Count:',
      value: 'Total Head Count 1',
    },
    {
      name: 'Additional Benefits:',
      value: 'Additional Benefits 1',
    },
    {
      name: 'Special Benefits:',
      value: 'Special Benefits 1',
    },
  ]
  return (
    <>
      {companyHmoInformation.map((info, index) => (
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

export default CompanyHmoInformation
