import React from 'react'

const BillingInformation = () => {
  return (
    <>
      <div className="col-span-3 flex grid-cols-12 flex-col pt-4 lg:grid lg:p-2">
        <div className="flex flex-col gap-2 lg:col-span-3">
          <span className="text-md font-semibold text-[#161a1d]">Fixed</span>
          <span className="text-sm font-medium text-[#64748b]">
            MODE OF PREMIUM
          </span>
          <span className="text-md font-semibold text-[#161a1d]">
            10/20/2024
          </span>
          <span className="text-sm font-medium text-[#64748b]">DUE DATE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            123456789
          </span>
          <span className="text-sm font-medium text-[#64748b]">OR NUMBER</span>
          <span className="text-md font-semibold text-[#161a1d]">
            10/10/2024
          </span>
          <span className="text-sm font-medium text-[#64748b]">OR DATE</span>
          <span className="text-md font-semibold text-[#161a1d]">
            123456789
          </span>
          <span className="text-sm font-medium text-[#64748b]">SA NUMBER</span>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-3">
          <span className="text-md font-semibold text-[#161a1d]">1000</span>
          <span className="text-sm font-medium text-[#64748b]">AMOUNT</span>
          <span className="text-md font-semibold text-[#161a1d]">100000</span>
          <span className="text-sm font-medium text-[#64748b]">
            TOTAL CONTRACT VALUE
          </span>
          <span className="text-md font-semibold text-[#161a1d]">100000</span>
          <span className="text-sm font-medium text-[#64748b]">BALANCE</span>
          <span className="text-md font-semibold text-[#161a1d]">30</span>
          <span className="text-sm font-medium text-[#64748b]">
            BILLING PERIOD
          </span>
          <span className="text-md font-semibold text-[#161a1d]">1000</span>
          <span className="text-sm font-medium text-[#64748b]">
            AMOUNT BILLED
          </span>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-3">
          <span className="text-md font-semibold text-[#161a1d]">100000</span>
          <span className="text-sm font-medium text-[#64748b]">
            AMOUNT PAID
          </span>
          <span className="text-md font-semibold text-[#161a1d]">100000</span>
          <span className="text-sm font-medium text-[#64748b]">
            COMMISSION RATE
          </span>
          <span className="text-md font-semibold text-[#161a1d]">100000</span>
          <span className="text-sm font-medium text-[#64748b]">
            COMMISSION EARNED
          </span>
        </div>
      </div>
    </>
  )
}

export default BillingInformation
