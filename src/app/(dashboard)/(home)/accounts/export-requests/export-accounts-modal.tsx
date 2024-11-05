import React, { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FileDown, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { toast } from '@/components/ui/use-toast'
import { Enums } from '@/types/database.types'

interface ExportAccountsModalProps {
  exportData: Enums<'export_type'>
}

const ExportAccountsModal: FC<ExportAccountsModalProps> = ({ exportData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const supabase = createBrowserClient()

  const { mutateAsync, isPending } = useInsertMutation(
    //@ts-ignore
    supabase.from('pending_export_requests'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          title: 'Export Request Submitted',
          variant: 'default',
          description:
            'Your export request has been submitted and is waiting for approval',
        })
        setIsOpen(false)
      },
      onError: (error) => {
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          description: error.message,
        })
      },
    },
  )

  const handleConfirm = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await mutateAsync([
      {
        export_type: exportData,
        created_by: user?.id,
      },
    ])
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild={true}>
        <Button className="space-x-2" variant={'outline'}>
          <FileDown />
          <span>Export</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Confirm Export Submission</DialogTitle>
        </DialogHeader>
        <div>
          Are you sure you want to submit this file for approval? Your export
          request will be reviewed before it is processed.
        </div>
        <DialogFooter>
          <Button
            variant={'default'}
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Confirm'}
          </Button>
          <Button variant={'outline'} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExportAccountsModal
