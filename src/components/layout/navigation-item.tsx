import Link from 'next/link'
import { ComponentType } from 'react'
import { cn } from '../../utils/tailwind'

const NavigationItem = ({
  title,
  href,
  icon: Icon,
  active,
}: {
  title: string
  href: string
  icon: ComponentType<{ className?: string }>
  active?: boolean
}) => {
  return (
    <Link
      href={href}
      className={cn(
        active ? 'bg-[#ffffff1f]' : 'hover:bg-[#ffffff1f]',
        'group flex flex-row items-center justify-start gap-4 rounded-lg px-4 py-2.5 text-white/80',
      )}
    >
      <Icon className="h-6 w-6 group-hover:text-white" />
      <span className="text-[13px] font-medium group-hover:text-white">
        {title}
      </span>
    </Link>
  )
}

export default NavigationItem
