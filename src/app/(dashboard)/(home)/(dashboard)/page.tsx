import PageTitle from './page-title'
import PreviousStatement from './previous-statement'

const Dashboard = () => {
  return (
    <div className="p-6">
      <PageTitle
        title="Mock Dashboard"
        description="Welcome to the dashboard"
      />
      <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
        <PreviousStatement />
        <PreviousStatement />
      </div>
    </div>
  )
}

export default Dashboard
