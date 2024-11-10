'use client'
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const SubNavigationItem = ({
  title,
  href,
  icon: Icon,
}: {
  title: string
  href: string
  icon?: ReactNode
}) => {
  const pathName = usePathname()

  const isActive = pathName === href

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild={true} isActive={isActive}>
        <Link
          className="flex !h-11 flex-row items-center gap-4 px-4 py-2.5"
          href={href}
        >
          {Icon && Icon}
          <span className="text-[13px] font-medium">{title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}

export default SubNavigationItem
