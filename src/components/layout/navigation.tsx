import { BookCopy, ClipboardCheck } from 'lucide-react'
import AdminNavigation from './admin-navigation'
import NavigationItem from './navigation-item'

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
