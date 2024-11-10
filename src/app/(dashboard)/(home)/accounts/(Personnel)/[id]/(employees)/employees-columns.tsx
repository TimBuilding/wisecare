import DeleteEmployee from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-information/delete-employee'
import EmployeeDetails from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-information/employee-details'
import EmployeeFormModal from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-information/employee-form-modal'
import TableHeader from '@/components/table-header'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tables } from '@/types/database.types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Eye, MoreHorizontal, Pencil } from 'lucide-react'
import normalizeToUTC from '@/utils/normalize-to-utc'

const employeesColumns: ColumnDef<Tables<'company_employees'>>[] = [
  // company name is not needed since we are already in the company page
  {
    accessorKey: 'card_number',
    header: ({ column }) => <TableHeader column={column} title="Card Number" />,
    cell: ({ row }) => (
      <span className="capitalize">{row.original.card_number}</span>
    ),
    accessorFn: (originalRow) => (originalRow as any)?.card_number ?? '',
  },
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
    accessorKey: 'gender',
    header: ({ column }) => <TableHeader column={column} title="Gender" />,
    cell: ({ row }) => (
      <span className="capitalize">{row.original.gender}</span>
    ),
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
            {/* Employee Details Start */}
            <EmployeeDetails
              button={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </DropdownMenuItem>
              }
              employeeData={employee}
            />
            {/* Employee Details End */}

            <DropdownMenuSeparator />

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
            <DeleteEmployee originalData={employee} />
            {/* Delete employee End */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default employeesColumns
