import RetentionRateChart from '@/app/(dashboard)/(home)/(dashboard)/retention-rate/retention-rate-chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { format, subMonths } from 'date-fns'

const RetentionRateCard = () => {
  const last12Months = subMonths(new Date(), 12)

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-medium">Retention Rate</CardTitle>
        <CardDescription className="text-xs font-medium">
          From {format(last12Months, 'MMM yyyy')} to{' '}
          {format(new Date(), 'MMM yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <RetentionRateChart />
      </CardContent>
    </Card>
  )
}

export default RetentionRateCard
