import TopAgentsList from '@/app/(dashboard)/(home)/(dashboard)/top-agents/top-agents-list'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { format, subMonths } from 'date-fns'

const TopAgentsCard = () => {
  const last12Months = subMonths(new Date(), 12)

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between">
          <span className="text-base font-medium">Top Agents</span>
          <Badge variant="default" className="bg-muted text-muted-foreground">
            Last 12 Months
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TopAgentsList />
      </CardContent>
    </Card>
  )
}

export default TopAgentsCard
