import TableHeader from '@/components/table-header'
import { Tables } from '@/types/database.types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

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
  },
  {
    accessorKey: 'civil_status',
    header: ({ column }) => (
      <TableHeader column={column} title="Civil Status" />
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
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const employee = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(employee.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   }
  // }
]

export default employeesColumns
