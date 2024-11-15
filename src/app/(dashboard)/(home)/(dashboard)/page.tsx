'use server'

import ClientAcquisitionCard from '@/app/(dashboard)/(home)/(dashboard)/client-acquisition/client-acquisition-card'
import RetentionRateCard from '@/app/(dashboard)/(home)/(dashboard)/retention-rate/retention-rate-card'
import TopAgentsCard from '@/app/(dashboard)/(home)/(dashboard)/top-agents/top-agents-card'
import { Metadata } from 'next'
import PageTitle from './page-title'
import RenewalCard from '@/app/(dashboard)/(home)/(dashboard)/upcoming-renewals/renewal-card'

export const metadata = async (): Promise<Metadata> => {
  return {
    title: 'Dashboard',
  }
}

const Dashboard = () => {
  return (
    <div className="p-6">
      <PageTitle title="Dashboard" description="Welcome to the dashboard" />
      <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-4">
        <ClientAcquisitionCard />
        <RetentionRateCard />
        <TopAgentsCard />
        <RenewalCard />
      </div>
    </div>
  )
}

export default Dashboard
