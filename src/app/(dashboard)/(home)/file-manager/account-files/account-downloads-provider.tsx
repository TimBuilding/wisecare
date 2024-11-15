'use client'
import React from 'react'
import { createContext, ReactNode, useContext, useState } from 'react'

const useAccountDownloadsContext = () => {
  const context = useContext(AccountDownloadsContext)
  if (!context) {
    throw new Error(
      'useAccountDownloadsContext must be used within a AccountDownloadsProvider',
    )
  }
  return context
}

const AccountDownloadsContext = createContext({
  isSheetOpen: false,
  setIsSheetOpen: (_value: boolean) => {},
  isLoading: false,
  setIsLoading: (_value: boolean) => {},
})

const AccountDownloadsProvider = ({ children }: { children: ReactNode }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <AccountDownloadsContext.Provider
      value={{
        isSheetOpen,
        setIsSheetOpen,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AccountDownloadsContext.Provider>
  )
}

export { AccountDownloadsProvider, useAccountDownloadsContext }
