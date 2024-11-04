import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'
import { useState } from 'react'

const ExportAccountsModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
          <Button variant={'default'} onClick={() => setIsOpen(false)}>
            Confirm
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
