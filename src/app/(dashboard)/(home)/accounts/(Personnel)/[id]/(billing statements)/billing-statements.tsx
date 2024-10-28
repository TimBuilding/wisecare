import BillingInformation, {
  BillingInfoProps,
} from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(billing statements)/billing-information'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import getBillingStatementByCompanyId from '@/queries/get-billing-statement-by-company-id'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { format } from 'date-fns'
import { ChevronsUpDown } from 'lucide-react'
import { FC } from 'react'

interface Props {
  companyId: string
}

const BillingStatements: FC<Props> = ({ companyId }) => {
  const supabase = createBrowserClient()
  const { data: billings, isPending } = useQuery(
    getBillingStatementByCompanyId(supabase, companyId),
  )

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-between gap-6">
      {isPending &&
        [1, 2, 3].map((i) => (
          <Collapsible
            key={i}
            className={
              'mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md'
            }
          ></Collapsible>
        ))}
      {billings &&
        billings.map((billing) => (
          <Collapsible
            key={billing.id}
            className={
              'mx-auto w-full rounded-2xl border border-border bg-card p-6'
            }
          >
            <CollapsibleTrigger asChild={true}>
              <Button
                variant="ghost"
                className="w-full max-w-5xl items-center justify-between p-0 hover:bg-transparent "
              >
                <span className="text-lg font-semibold capitalize">
                  Billing Statement -{' '}
                  {format(new Date(billing?.created_at), 'MMMM d, yyyy')}
                </span>
                <ChevronsUpDown className="justify-end" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid-cols-3 lg:grid">
                <BillingInformation
                  data={{ ...billing } as BillingInfoProps['data']}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  )
}

export default BillingStatements
