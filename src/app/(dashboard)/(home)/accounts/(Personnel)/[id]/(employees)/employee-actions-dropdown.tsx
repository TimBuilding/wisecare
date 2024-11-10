import DeleteAllEmployees from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-information/delete-all-employees'
import EmployeeFormModal from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-information/employee-form-modal'
import EmployeeExportModal from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/export-requests/employee-export-modal'
import EllipsisVertical from '@/assets/icons/ellipsis-vertical'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FileDown, Plus, Trash2 } from 'lucide-react'

const EmployeeActionsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild={true}>
            <EmployeeFormModal
              button={
                <div className="relative flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <Plus className="h-4 w-4" />
                  <span>Add Employee</span>
                </div>
              }
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild={true}>
            <EmployeeExportModal
              exportData="employees"
              button={
                <div className="relative flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <FileDown className="h-4 w-4" />
                  <span>Export Employees</span>
                </div>
              }
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DeleteAllEmployees
            button={
              <DropdownMenuItem className="relative flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <Trash2 className="h-4 w-4" />
                <span>Delete All Employees</span>
              </DropdownMenuItem>
            }
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default EmployeeActionsDropdown
