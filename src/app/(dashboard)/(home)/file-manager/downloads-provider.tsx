'use client'
import React from 'react'
import { createContext, ReactNode, useContext, useState } from 'react'

const useDownloadsContext = () => {
  const context = useContext(DownloadsContext)
  if (!context) {
    throw new Error(
      'useAccountDownloadsContext must be used within a DownloadsProvider',
    )
  }
  return context
}

const DownloadsContext = createContext({
  isSheetOpen: false,
  setIsSheetOpen: (_value: boolean) => {},
  isLoading: false,
  setIsLoading: (_value: boolean) => {},
})

const DownloadsProvider = ({ children }: { children: ReactNode }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <DownloadsContext.Provider
      value={{
        isSheetOpen,
        setIsSheetOpen,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </DownloadsContext.Provider>
  )
}

export { DownloadsProvider, useDownloadsContext }
