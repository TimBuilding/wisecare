'use server'
import { Bell, Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Navbar from './navbar'

import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import NotificationBell from '@/components/layout/notification/notification-bell'

const Header = async () => {
  const supabase = createServerClient(cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return (
    <Sheet>
      <header className="flex h-16 w-full flex-row items-center justify-between border-b bg-card px-3 py-2 shadow-md md:justify-end">
        <SheetTrigger asChild={true}>
          <Button variant={'ghost'} size={'icon'} className="md:hidden">
            <Menu className="text-muted-foreground/50" />
          </Button>
        </SheetTrigger>
        <NotificationBell user={user} />
      </header>
      <SheetContent side={'left'} className="md:hidden">
        <Navbar />
      </SheetContent>
    </Sheet>
  )
}

export default Header
