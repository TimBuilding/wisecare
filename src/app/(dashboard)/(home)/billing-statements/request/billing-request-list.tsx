import BillingRequestListItem from '@/app/(dashboard)/(home)/billing-statements/request/billing-request-list-item'
import getPendingBillingStatements from '@/queries/ get-pending-billing-statements'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

const BillingRequestList = () => {
  const supabase = createBrowserClient()

  const { data: pendingBillings } = useQuery(
    getPendingBillingStatements(supabase),
  )
  return (
    <div className="grid grid-cols-1 divide-y">
      {pendingBillings?.map((pendingBilling) => (
        <BillingRequestListItem
          key={pendingBilling.id}
          data={pendingBilling as any}
          company_name={pendingBilling.account.company_name}
        />
      ))}
    </div>
  )
}

export default BillingRequestList
