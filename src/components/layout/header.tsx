import { Bell, Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Navbar from './navbar'

const Header = () => {
  return (
    <Sheet>
      <header className="flex h-16 w-full flex-row items-center justify-between border-b bg-card px-3 py-2 shadow-md md:justify-end">
        <SheetTrigger asChild={true}>
          <Button variant={'ghost'} size={'icon'} className="md:hidden">
            <Menu className="text-muted-foreground/50" />
          </Button>
        </SheetTrigger>
        <div>
          <Button variant={'ghost'} size={'icon'}>
            <Bell className="text-muted-foreground/50" />
          </Button>
        </div>
      </header>
      <SheetContent side={'left'} className="md:hidden">
        <Navbar />
      </SheetContent>
    </Sheet>
  )
}

export default Header
