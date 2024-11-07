'use client'

import chartConfig from '@/app/(dashboard)/(home)/(dashboard)/retention-rate/chart-config'
import { ChartContainer } from '@/components/ui/chart'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { subMonths } from 'date-fns'
import { useMemo } from 'react'
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'

const RetentionRateChart = () => {
  const supabase = createBrowserClient()

  const { data } = useQuery(
    supabase
      .from('accounts')
      .select('is_account_active, created_at', {
        count: 'exact',
      })
      .lte(
        'created_at',
        new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      )
      .throwOnError(),
  )

  const retentionRate = useMemo(() => {
    if (!data) return 0

    const periodEnd = new Date()
    const periodStart = subMonths(periodEnd, 12)

    // Active clients during the period, filtered by `created_at` and `is_active`
    const activeClientsAtEnd = data.filter(
      (client) =>
        client.is_account_active && new Date(client.created_at) <= periodEnd,
    ).length

    // Clients who existed at the start of the period
    const clientsAtStart = data.filter(
      (client) => new Date(client.created_at) <= periodStart,
    ).length

    const newClientsDuringPeriod = data.filter(
      (client) =>
        new Date(client.created_at) > periodStart &&
        new Date(client.created_at) <= periodEnd,
    ).length

    // Retention Rate Calculation
    const retentionRate =
      ((activeClientsAtEnd - newClientsDuringPeriod) / clientsAtStart) * 100

    return Math.round(retentionRate) // Returns as a rounded number
  }, [data])

  const chartData = useMemo(
    () => [
      {
        browser: 'safari',
        retentionRate: retentionRate,
        fill: 'var(--color-safari)',
      },
    ],
    [retentionRate],
  )

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart
        data={chartData}
        innerRadius={80}
        outerRadius={110}
        endAngle={(chartData[0].retentionRate / 100) * 360}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="retentionRate" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {chartData[0].retentionRate}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Retention Rate
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}

export default RetentionRateChart
