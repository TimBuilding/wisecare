import { BookType, Users } from 'lucide-react'
import NavigationItem from './navigation-item'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import isAdmin from '@/utils/is-admin'

const AdminNavigation = async () => {
  const supabase = createServerClient(cookies())
  if (!(await isAdmin(supabase))) return null

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
          icon={<Users className="h-6 w-6 group-hover:text-white" />}
        />
        <NavigationItem
          title="Manage Types"
          href="/admin/types"
          icon={<BookType className="h-6 w-6 group-hover:text-white" />}
        />
        <NavigationItem
          title="Agents"
          href="/admin/agents"
          icon={<Users className="h-6 w-6 group-hover:text-white" />}
        />
      </div>
    </div>
  )
}

export default AdminNavigation
