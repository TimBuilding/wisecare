import React, { FC } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import BillingInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/billing-information'
import getBillingStatementInputs from '@/queries/get-billing-statement-inputs'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createBrowserClient } from '@/utils/supabase'
import EmployeesInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-information'
import { Tables } from '@/types/database.types'
import { format } from 'date-fns'

interface Props {
  companyId: string
}

const BillingStatements: FC<Props> = ({ companyId }) => {
  const supabase = createBrowserClient()
  const { data: billing, isPending } = useQuery(
    getBillingStatementInputs(supabase, companyId),
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
      {billing &&
        billing.map((billing) => (
          <Collapsible
            key={billing.id}
            className={
              'mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md'
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
                  data={billing as Tables<'billing_statements'>}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  )
}

export default BillingStatements
