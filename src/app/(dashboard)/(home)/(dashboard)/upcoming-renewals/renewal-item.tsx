import { Badge } from '@/components/ui/badge'
import { Tables } from '@/types/database.types'
import { cn } from '@/utils/tailwind'
import { formatDate, isAfter } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import { FC } from 'react'

interface RenewalItemProps {
  data: Tables<'accounts'>
}

const RenewalItem: FC<RenewalItemProps> = ({ data }) => {
  const getStatusFromExpirationDate = () => {
    const today = new Date()
    if (data.expiration_date && isAfter(data.expiration_date, today)) {
      return 'upcoming'
    }
    return 'overdue'
  }

  const getStatusColor = (status: 'upcoming' | 'overdue' | 'renewed') => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-500 hover:bg-yellow-600 '
      case 'overdue':
        return 'bg-red-500 hover:bg-red-600 '
      default:
        return 'bg-gray-500 hover:bg-gray-600 '
    }
  }

  const status = getStatusFromExpirationDate()

  return (
    <li className="flex items-center justify-between rounded-lg bg-muted p-4">
      <div>
        <h3 className="font-semibold">{data.company_name}</h3>
        <div className="mt-1 flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-1 h-4 w-4" />
          {data?.expiration_date &&
            formatDate(data?.expiration_date, 'MMM d, yyyy')}
        </div>
      </div>
      <div className="text-right">
        <Badge className={cn('mt-1 capitalize', getStatusColor(status))}>
          {status}
        </Badge>
      </div>
    </li>
  )
}

export default RenewalItem
