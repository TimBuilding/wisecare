'use server'

import { FC, ReactNode } from 'react'
import Header from '../../components/layout/header'
import Navbar from '../../components/layout/navbar'

interface Props {
  children: ReactNode
}

const DashboardLayout: FC<Props> = async ({ children }) => {
  return (
    <div className="flex w-full flex-row">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
