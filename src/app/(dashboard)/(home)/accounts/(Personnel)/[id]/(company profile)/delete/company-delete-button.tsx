'use client'
import EditPendingRequest from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/edit-pending-request'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import dynamic from 'next/dynamic'
import { FC, Suspense, useState } from 'react'

const CompanyDeleteForm = dynamic(
  () =>
    import(
      '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/delete/company-delete-form'
    ),
  { ssr: false },
)

interface Props {
  accountId: string
}

const CompanyDeleteButton: FC<Props> = ({ accountId }) => {
  const [isOpen, setIsOpen] = useState(false)

  const [isEditPendingRequestOpen, setIsEditPendingRequestOpen] =
    useState(false)
  const [pendingRequestId, setPendingRequestId] = useState('')

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild={true}>
          <Button className="w-fit" variant={'destructive'}>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <Suspense fallback={<div>Loading...</div>}>
          <CompanyDeleteForm
            accountId={accountId}
            setIsOpen={setIsOpen}
            setIsEditPendingRequestOpen={setIsEditPendingRequestOpen}
            setPendingRequestId={setPendingRequestId}
          />
        </Suspense>
      </AlertDialog>
      <EditPendingRequest
        isOpen={isEditPendingRequestOpen}
        onClose={() => setIsEditPendingRequestOpen(false)}
        pendingRequestId={pendingRequestId}
      />
    </>
  )
}

export default CompanyDeleteButton
