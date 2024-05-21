'use server'

import { FC, ReactNode } from 'react'
import Header from '../../components/layout/header'
import Navbar from '../../components/layout/navbar'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { redirect } from 'next/navigation'

interface Props {
  children: ReactNode
}

const DashboardLayout: FC<Props> = async ({ children }) => {
  const supabase = createServerClient(cookies())
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    return redirect('/sign-in')
  }

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
