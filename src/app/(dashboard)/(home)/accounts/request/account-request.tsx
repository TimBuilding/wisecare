'use client'
import AccountRequestList from '@/app/(dashboard)/(home)/accounts/request/account-request-list'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import getPendingAccounts from '@/queries/get-pending-accounts'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { useState } from 'react'

const AccountRequest = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const supabase = createBrowserClient()

  const { count } = useQuery(getPendingAccounts(supabase))

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild={true}>
        <Button
          variant="outline"
          size="sm"
          className="flex h-8 w-full rounded-none"
        >
          {count} Requests
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submission Requests</DialogTitle>
          <DialogDescription>
            View and manage account requests and submissions
          </DialogDescription>
        </DialogHeader>
        <AccountRequestList />
      </DialogContent>
    </Dialog>
  )
}

export default AccountRequest