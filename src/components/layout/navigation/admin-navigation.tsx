import NavigationItem from '@/components/layout/navigation/navigation-item'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import isAdmin from '@/utils/is-admin'
import { createServerClient } from '@/utils/supabase'
import { cn } from '@/utils/tailwind'
import { BookType, FileText, ListTodo, Users } from 'lucide-react'
import { cookies } from 'next/headers'

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
        <Collapsible>
          <CollapsibleTrigger asChild={true}>
            <button className="group flex w-full flex-row items-center justify-start gap-4 rounded-lg px-4 py-2.5 text-white/80 hover:bg-[#ffffff1f]">
              <ListTodo className="h-6 w-6 group-hover:text-white" />
              <span className="text-[13px] font-medium group-hover:text-white">
                Approval Request
              </span>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={cn(
              'mt-0.5 space-y-0.5 pl-5',
              'overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
            )}
          >
            <NavigationItem
              title="Accounts"
              href="/admin/approval-request/accounts"
            />
            <NavigationItem
              title="Company Employees"
              href="/admin/approval-request/company-employees"
            />
            <NavigationItem
              title="Billing Statements"
              href="/admin/approval-request/billing-statements"
            />
          </CollapsibleContent>
        </Collapsible>
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
        <NavigationItem
          title="Activity Log"
          href="/admin/logs"
          icon={<FileText className="h-6 w-6 group-hover:text-white" />}
        />
      </div>
    </div>
  )
}

export default AdminNavigation
