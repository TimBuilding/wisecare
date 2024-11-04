'use client'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import EmployeeRequestList from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/request/employee-request-list'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import getPendingEmployeeByCompanyId from '@/queries/get-pending-employee-by-company-id'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

const EmployeeRequest = () => {
  const { accountId } = useCompanyContext()
  const supabase = createBrowserClient()
  const { count } = useQuery(getPendingEmployeeByCompanyId(supabase, accountId))
  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button
          variant={'outline'}
          size={'sm'}
          className="flex h-8 w-full rounded-none"
        >
          {/* TODO: add count */}
          {count} Requests
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submission Requests</DialogTitle>
          <DialogDescription>
            View and manage employee requests and submissions
          </DialogDescription>
        </DialogHeader>
        <EmployeeRequestList />
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeRequest
