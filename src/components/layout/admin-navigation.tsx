import { Users } from 'lucide-react'
import NavigationItem from './navigation-item'

const AdminNavigation = () => {
  return (
    <div>
      <div className="flex flex-col gap-1 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Admin
        </span>
        <span className="text-[11px] text-white/50">Administrator tools</span>
      </div>
      <div className="space-y-1">
        <NavigationItem
          title="Users"
          href="/admin/users"
          active={false}
          icon={Users}
        />
      </div>
    </div>
  )
}

export default AdminNavigation
