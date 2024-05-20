import { Bell, Menu } from 'lucide-react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className="flex h-16 w-screen flex-row items-center justify-between bg-card px-3 py-2 shadow-md">
      <Button variant={'ghost'} size={'icon'}>
        <Menu className="text-muted-foreground/50" />
      </Button>
      <div>
        <Button variant={'ghost'} size={'icon'}>
          <Bell className="text-muted-foreground/50" />
        </Button>
      </div>
    </header>
  )
}

export default Header
