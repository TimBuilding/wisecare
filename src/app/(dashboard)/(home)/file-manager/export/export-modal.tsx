import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const EmployeesExport = dynamic(() => import('./employees-export'), {
  ssr: false,
})

interface ExportModalProps {
  exportType: 'employees' | 'accounts' | null
  onClose: () => void
}

const ExportModal = ({ onClose, exportType }: ExportModalProps) => {
  return (
    <Dialog open={!!exportType} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export {exportType}</DialogTitle>
          <DialogDescription>Select an account to export</DialogDescription>
        </DialogHeader>
        <Suspense fallback={<div>Loading...</div>}>
          {exportType === 'employees' && <EmployeesExport onClose={onClose} />}
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}

export default ExportModal
