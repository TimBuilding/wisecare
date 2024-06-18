import { UserCircle } from 'lucide-react'
import { Button } from '../ui/button'
import WisecareLogo from '@/assets/images/wisecare-logo-2 1.png'
import Image from 'next/image'
import Navigation from './navigation'

const Navbar = () => {
  return (
    <nav className="flex h-full min-h-screen w-72 flex-col bg-navigation text-navigation-foreground">
      <div className="flex flex-row items-center justify-between px-6 py-5">
        <Image src={WisecareLogo} alt="Wisecare Logo" height={32} />
        <Button variant={'ghost'} size={'icon'}>
          <UserCircle className="text-primary-foreground/50" />
        </Button>
      </div>
      <Navigation />
    </nav>
  )
}

export default Navbar
