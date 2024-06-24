'use client'
import Link from 'next/link'
import { ComponentType, ReactNode } from 'react'
import { cn } from '../../utils/tailwind'
import { usePathname } from 'next/navigation'

const NavigationItem = ({
  title,
  href,
  icon: Icon,
}: {
  title: string
  href: string
  icon: ReactNode
}) => {
  const pathName = usePathname()

  const isActive = pathName === href

  return (
    <Link
      href={href}
      className={cn(
        isActive ? 'bg-[#ffffff1f]' : 'hover:bg-[#ffffff1f]',
        'group flex flex-row items-center justify-start gap-4 rounded-lg px-4 py-2.5 text-white/80',
      )}
    >
      {Icon}
      <span className="text-[13px] font-medium group-hover:text-white">
        {title}
      </span>
    </Link>
  )
}

export default NavigationItem
