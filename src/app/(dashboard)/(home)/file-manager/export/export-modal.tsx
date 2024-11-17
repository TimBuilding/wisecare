import EmployeesExport from '@/app/(dashboard)/(home)/file-manager/export/employees-export'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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

        {exportType === 'employees' && <EmployeesExport />}
      </DialogContent>
    </Dialog>
  )
}

export default ExportModal
