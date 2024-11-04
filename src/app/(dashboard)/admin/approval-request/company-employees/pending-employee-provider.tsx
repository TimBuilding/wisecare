'use client'
import { Tables } from '@/types/database.types'
import { createContext, ReactNode, useContext, useState } from 'react'

const usePendingEmployeeContext = () => {
  const context = useContext(PendingEmployeeContext)
  if (!context) {
    throw new Error(
      'usePendingEmployeeContext must be used within a PendingEmployeeProvider',
    )
  }
  return context
}

const PendingEmployeeContext = createContext({
  isModalOpen: false,
  setIsModalOpen: (_value: boolean) => {},
  selectedData: undefined as Tables<'pending_company_employees'> | undefined,
  setSelectedData: (_value: any) => {},
  isLoading: false,
  setIsLoading: (_value: boolean) => {},
})

const PendingEmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState<any | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <PendingEmployeeContext.Provider
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
    </PendingEmployeeContext.Provider>
  )
}

export { PendingEmployeeProvider, usePendingEmployeeContext }
