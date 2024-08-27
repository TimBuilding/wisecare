'use client'
import { createContext, ReactNode, useContext, useState } from 'react'

const useCompanyContext = () => {
  const context = useContext(CompanyContext)
  if (context === undefined) {
    throw new Error('context must be used within a Provider')
  }
  return context
}

const CompanyContext = createContext({
  showAddPersonnel: false,
  setShowAddPersonnel: (_value: boolean) => {},
})

const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [showAddPersonnel, setShowAddPersonnel] = useState(false)

  return (
    <CompanyContext.Provider
      value={{
        showAddPersonnel,
        setShowAddPersonnel,
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}

export default CompanyProvider
export { useCompanyContext }
