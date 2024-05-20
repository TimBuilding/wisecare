'use server'
import AddUser from '@/app/(dashboard)/admin/users/add-user'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import getUsers from '@/queries/get-users'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import UserList from './user-list'

const UsersPage = async () => {
  const queryClient = new QueryClient()
  const supabase = createServerClient(cookies())

  await prefetchQuery(queryClient, getUsers(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <PageHeader>
          <div>
            <PageTitle>Users</PageTitle>
            <PageDescription>81 Users</PageDescription>
          </div>
          <AddUser />
        </PageHeader>

        <UserList />
      </div>
    </HydrationBoundary>
  )
}

export default UsersPage
