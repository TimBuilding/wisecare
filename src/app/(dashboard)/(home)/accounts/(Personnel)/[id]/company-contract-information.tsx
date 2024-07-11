import React from 'react'

const CompanyContractInformation = () => {
  const companyContractInformation = [
    {
      name: 'Initial Contract Value:',
      value: 'Initial Contract Value 1',
    },
    {
      name: 'Total Contract Value:',
      value: 'Total Contract Value 1',
    },
    {
      name: 'Balance:',
      value: 'Balance 1',
    },
    {
      name: 'Mode of Payment:',
      value: 'Mode of Payment 1',
    },
    {
      name: 'Mode of Premium:',
      value: 'Mode of Premium 1',
    },
    {
      name: 'Due Date:',
      value: 'Due Date 1',
    },
    {
      name: 'Amount:',
      value: 'Amount 1',
    },
    {
      name: 'Renewal Date:',
      value: 'Renewal Date 1',
    },
    {
      name: 'Expiration Date:',
      value: 'Expiration Date 1',
    },
    {
      name: 'Effectivity Date:',
      value: 'Effectivity Date 1',
    },
    {
      name: 'Effective Date:',
      value: 'Effective Date 1',
    },
    {
      name: 'COC Issue Date:',
      value: 'COC Issue Date 1',
    },
    {
      name: 'Delivery Date of Membership IDs:',
      value: 'Delivery Date of Membership IDs 1',
    },
    {
      name: 'Orientation Date:',
      value: 'Orientation Date 1',
    },
    {
      name: 'Wellness Lecture Date:',
      value: 'Wellness Lecture Date 1',
    },
    {
      name: 'Annual Physical Examination Date:',
      value: 'Annual Physical Examination Date 1',
    },
    {
      name: 'Billing Period:',
      value: 'Billing Period 1',
    },
  ]
  return (
    <>
      {companyContractInformation.map((info, index) => (
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

export default CompanyContractInformation
