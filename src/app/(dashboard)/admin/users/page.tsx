'use server'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import UserList from '@/app/(dashboard)/admin/users/user-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import getUsers from '@/queries/get-users'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

const UsersPage = async () => {
  const supabase = createServerClient(cookies())

  const initialUsers = await getUsers(supabase)

  return (
    <div className="space-y-8">
      <PageHeader>
        <div>
          <PageTitle>Users</PageTitle>
          <PageDescription>81 Users</PageDescription>
        </div>
        <div>
          <Button className="space-x-2">
            <Plus />
            <span>Add</span>
          </Button>
        </div>
      </PageHeader>
      <UserList initialUsers={initialUsers} />
    </div>
  )
}

export default UsersPage
