import DeleteEmployee from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/delete-employee'
import EmployeeFormModal from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-form-modal'
import TableHeader from '@/components/table-header'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tables } from '@/types/database.types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { MoreHorizontal, Pencil } from 'lucide-react'

const employeesColumns: ColumnDef<Tables<'company_employees'>>[] = [
  // company name is not needed since we are already in the company page
  {
    accessorKey: 'first_name',
    header: ({ column }) => <TableHeader column={column} title="First Name" />,
    cell: ({ row }) => row.original.first_name,
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => <TableHeader column={column} title="Last Name" />,
    cell: ({ row }) => row.original.last_name,
  },
  {
    accessorKey: 'birth_date',
    header: ({ column }) => <TableHeader column={column} title="Birth Date" />,
    cell: ({ row }) => {
      return format(new Date(row.getValue('birth_date')), 'PP')
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => <TableHeader column={column} title="Gender" />,
    cell: ({ row }) => (
      <span className="capitalize">{row.original.gender}</span>
    ),
  },
  {
    accessorKey: 'civil_status',
    header: ({ column }) => (
      <TableHeader column={column} title="Civil Status" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.original.civil_status}</span>
    ),
  },
  {
    accessorKey: 'effective_date',
    header: ({ column }) => (
      <TableHeader column={column} title="Effective Date" />
    ),
    cell: ({ row }) => {
      return format(new Date(row.getValue('effective_date')), 'PP')
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            {/* Edit employee Start */}
            <EmployeeFormModal
              oldEmployeeData={employee}
              button={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
              }
            />
            {/* Edit employee End */}

            {/* Delete employee Start */}
            <DeleteEmployee employeeId={employee.id} />
            {/* Delete employee End */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default employeesColumns
