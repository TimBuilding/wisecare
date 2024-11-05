'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import getUsers from '@/queries/get-users'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'

const EditUserForm = dynamic(
  () => import('@/app/(dashboard)/admin/users/edit/edit-user-form'),
  { ssr: false },
)

const UserListItem = ({
  userId,
  firstName,
  lastName,
  department,
  email,
  isLoading,
}: {
  userId?: string
  firstName?: string
  lastName?: string
  department?: string
  email?: string
  isLoading?: boolean
}) => {
  const config = genConfig(userId || '')
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
      <SheetTrigger asChild={true}>
        <div className="flex cursor-pointer flex-row items-center gap-4 bg-card px-6 py-4 hover:bg-muted">
          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar className="h-10 w-10" {...config} />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-card-foreground">
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                `${firstName} ${lastName}`
              )}
            </span>
            <span className="text-sm capitalize text-muted-foreground">
              {department}
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="xs:w-screen w-screen overflow-auto bg-card sm:max-w-none md:max-w-2xl">
        <div className="flex h-40 flex-col items-end bg-[#f1f5f9] px-7 py-5">
          <SheetClose asChild={true}>
            <Button variant={'ghost'} size={'icon'}>
              <X />
            </Button>
          </SheetClose>
        </div>
        <div>
          <Avatar
            className="mx-6 h-32 w-32 -translate-y-16 rounded-full border-4 border-card"
            {...config}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <EditUserForm
              onOpenChange={setIsEditOpen}
              userId={userId}
              firstName={firstName}
              lastName={lastName}
              department={department}
              email={email}
            />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const UserList = () => {
  const supabase = createBrowserClient()

  const { data, isPending } = useQuery(getUsers(supabase))

  return (
    <div className="flex w-full flex-col divide-y divide-border border-y border-border">
      {isPending &&
        [...Array(5)].map((_, index) => <UserListItem key={index} isLoading />)}
      {data?.map((user) => (
        <UserListItem
          key={user.user_id}
          userId={user.user_id}
          firstName={user.first_name || ''}
          lastName={user.last_name || ''}
          department={user.departments.name || ''}
          email={user.email || ''}
        />
      ))}
    </div>
  )
}

export default UserList
