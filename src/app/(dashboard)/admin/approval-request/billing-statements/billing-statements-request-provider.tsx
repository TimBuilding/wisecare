import { Tables } from '@/types/database.types'
import { createContext, ReactNode, useContext, useState } from 'react'

const useBillingStatementsRequestContext = () => {
  const context = useContext(BillingStatementsRequestContext)
  if (!context) {
    throw new Error(
      'useBillingStatementsRequestContext must be used within a BillingStatementsRequestProvider',
    )
  }
  return context
}

const BillingStatementsRequestContext = createContext({
  isModalOpen: false,
  setIsModalOpen: (_value: boolean) => {},
  selectedData: undefined as Tables<'pending_billing_statements'> | undefined,
  setSelectedData: (_value: any) => {},
  isLoading: false,
  setIsLoading: (_value: boolean) => {},
})

const BillingStatementsRequestProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState<any | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <BillingStatementsRequestContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        selectedData,
        setSelectedData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </BillingStatementsRequestContext.Provider>
  )
}

export { BillingStatementsRequestProvider, useBillingStatementsRequestContext }
