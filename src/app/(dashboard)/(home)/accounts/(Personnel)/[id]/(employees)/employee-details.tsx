import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tables } from '@/types/database.types'
import {
  Calendar,
  CalendarDays,
  CreditCard,
  DollarSign,
  Heart,
  Home,
  LucideIcon,
  User,
} from 'lucide-react'
import { FC, ReactNode } from 'react'

const EmployeeDetailsItem = (item: {
  label: string
  value: string
  icon: LucideIcon
}) => {
  const Icon = item.icon
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{item.label}</span>
        <span className="text-sm text-muted-foreground">{item.value}</span>
      </div>
    </div>
  )
}

interface EmployeeDetailsProps {
  button: ReactNode
  employeeData: Tables<'company_employees'>
}

const EmployeeDetails: FC<EmployeeDetailsProps> = ({
  button,
  employeeData,
}) => {
  const data = [
    { label: 'Birth Date', value: employeeData.birth_date, icon: Calendar },
    { label: 'Gender', value: employeeData.gender, icon: User },
    { label: 'Civil Status', value: employeeData.civil_status, icon: Heart },
    { label: 'Card Number', value: employeeData.card_number, icon: CreditCard },
    {
      label: 'Effective Date',
      value: employeeData.effective_date,
      icon: CalendarDays,
    },
    { label: 'Room Plan', value: employeeData.room_plan, icon: Home },
    {
      label: 'Maximum Benefit Limit',
      value: employeeData.maximum_benefit_limit,
      icon: DollarSign,
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild={true}>{button}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
          <DialogDescription>View the employee details</DialogDescription>
        </DialogHeader>

        <h4 className="mt-5 text-center text-xl font-semibold">
          {employeeData.first_name} {employeeData.last_name}
        </h4>
        <div className="grid grid-cols-2 gap-4 py-4">
          {data.map((employee) => (
            <EmployeeDetailsItem
              key={employee.label}
              label={employee.label}
              icon={employee.icon}
              value={employee.value?.toString() ?? 'N/A'}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeDetails
