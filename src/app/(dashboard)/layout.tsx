'use server'

import { FC, ReactNode } from 'react'
import Header from '../../components/layout/header'

import AppSidebar from '@/components/layout/navigation/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <Header />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
