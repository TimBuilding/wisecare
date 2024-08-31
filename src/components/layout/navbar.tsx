import WisecareLogo from '@/assets/images/wisecare-logo-2 1.png'
import Image from 'next/image'
import Navigation from './navigation'
import UserDropdown from './user-dropdown'

const Navbar = () => {
  return (
    <nav className="z-50 flex h-full min-h-screen w-72 flex-col bg-navigation text-navigation-foreground">
      <div className="flex flex-row items-center justify-between px-6 py-5">
        <Image src={WisecareLogo} alt="Wisecare Logo" height={32} />
        <UserDropdown />
      </div>
      <Navigation />
    </nav>
  )
}

export default Navbar
