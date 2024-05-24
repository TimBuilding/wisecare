import { BookCopy, ClipboardCheck, HandMetal } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'
import { cn } from '../../utils/tailwind'
import NavigationItem from './navigation-item'
import AdminNavigation from './admin-navigation'

const Navigation = () => {
  return (
    <div className="z-50 space-y-6 px-3">
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

      {/* Admin Navigation */}
      <AdminNavigation />
    </div>
  )
}

export default Navigation
