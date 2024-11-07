'use server'

import ClientAcquisitionCard from '@/app/(dashboard)/(home)/(dashboard)/client-acquisition/client-acquisition-card'
import PageTitle from './page-title'
import PreviousStatement from './previous-statement'
import { Metadata } from 'next'
import RetentionRateCard from '@/app/(dashboard)/(home)/(dashboard)/retention-rate/retention-rate-card'
import TopAgentsCard from '@/app/(dashboard)/(home)/(dashboard)/top-agents/top-agents-card'

export const metadata = async (): Promise<Metadata> => {
  return {
    title: 'Dashboard',
  }
}

const Dashboard = () => {
  return (
    <div className="p-6">
      <PageTitle title="Dashboard" description="Welcome to the dashboard" />
      <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
        <ClientAcquisitionCard />
        <RetentionRateCard />
        <TopAgentsCard />
      </div>
    </div>
  )
}

export default Dashboard
