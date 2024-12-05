'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import getPendingBillingStatements from '@/queries/ get-pending-billing-statements'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const BillingRequestList = dynamic(
  () =>
    import(
      '@/app/(dashboard)/(home)/billing-statements/request/billing-request-list'
    ),
  { ssr: false },
)

const BillingStatementRequest = () => {
  const supabase = createBrowserClient()
  const { count } = useQuery(getPendingBillingStatements(supabase))

  return (
    <Dialog>
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
            View and manage billing statement requests and submissions
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <BillingRequestList />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}

export default BillingStatementRequest
