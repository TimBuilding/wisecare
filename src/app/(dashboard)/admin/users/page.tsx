'use server'
import AddUser from '@/app/(dashboard)/admin/users/add-user'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import { createServerClient } from '@/utils/supabase'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'

const UsersPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()

  // await prefetchQuery(queryClient, getUsers(supabase))

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

        {/* <UserList /> */}
      </div>
    </HydrationBoundary>
  )
}

export default UsersPage
