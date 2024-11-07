'use server'

import getRole from '@/utils/get-role'
import { Book, BookCopy, ClipboardCheck } from 'lucide-react'
import NavigationItem from './navigation-item'
import AdminNavigation from '@/components/layout/navigation/admin-navigation'

const Navigation = async () => {
  const role = await getRole()
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
            icon={<ClipboardCheck className="h-6 w-6 group-hover:text-white" />}
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
            href="/accounts"
            icon={<BookCopy className="h-6 w-6 group-hover:text-white" />}
          />
          {
            // only show pending tab if role is finance
            role && ['finance', 'admin'].includes(role) && (
              <NavigationItem
                title="Billing Statements"
                href="/billing-statements"
                icon={<Book className="h-6 w-6 group-hover:text-white" />}
              />
            )
          }
        </div>
      </div>

      {/* Admin Navigation */}
      <AdminNavigation />
    </div>
  )
}

export default Navigation
