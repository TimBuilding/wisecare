import { BookCopy, ClipboardCheck, HandMetal } from 'lucide-react'
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

const Navigation = () => {
  return (
    <div className="space-y-6 px-3">
      <div>
        <div className="flex flex-col gap-1 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Dashboard
          </span>
          <span className="text-[11px] text-white/50">Analytics</span>
        </div>
        <div className="space-y-1">
          <NavigationItem
            title="Dashboard"
            href="/"
            active={true}
            icon={ClipboardCheck}
          />
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-1 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Accounts
          </span>
          <span className="text-[11px] text-white/50">Manage accounts</span>
        </div>
        <div className="space-y-1">
          <NavigationItem
            title="Accounts"
            href="/"
            active={false}
            icon={BookCopy}
          />
        </div>
      </div>
    </div>
  )
}

export default Navigation
