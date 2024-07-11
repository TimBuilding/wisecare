import React, { FC, ReactNode } from 'react'
import { Tabs } from '@/components/ui/tabs'

interface Props {
  children: ReactNode
}

export const TabsContextProvider: FC<Props> = ({ children }) => {
  return (
    <Tabs defaultValue="about" className="w-full xl:-translate-y-2 xl:pl-24">
      {children}
    </Tabs>
  )
}

export default TabsContextProvider
