'use server'

import { FC, ReactNode } from 'react'
import Header from '../../components/layout/header'

interface Props {
  children: ReactNode
}

const DashboardLayout: FC<Props> = async ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default DashboardLayout
