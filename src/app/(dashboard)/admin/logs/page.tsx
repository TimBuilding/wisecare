import ActivityTable from '@/app/(dashboard)/admin/logs/activity-table'
import { PageHeader, PageTitle } from '@/components/page-header'

const ActivityLogsPage = () => {
  return (
    <div>
      <PageHeader>
        <div>
          <PageTitle>Activity Log</PageTitle>
        </div>
      </PageHeader>
      <div className="mx-5 mt-5 border-y border-border">
        <ActivityTable />
      </div>
    </div>
  )
}

export default ActivityLogsPage
