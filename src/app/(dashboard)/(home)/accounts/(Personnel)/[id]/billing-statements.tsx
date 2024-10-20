import React from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import EmployeesInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-information'
import { Tables } from '@/types/database.types'
import { ChevronsUpDown } from 'lucide-react'
import BillingInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/billing-information'

const BillingStatements = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-between gap-6">
      {/*{isPending &&*/}
      {/*  [1, 2, 3].map((i) => (*/}
      {/*    <Collapsible*/}
      {/*      key={i}*/}
      {/*      className={*/}
      {/*        'mx-auto w-full rounded-2xl border border-slate-200 bg-background p-6 drop-shadow-md'*/}
      {/*      }*/}
      {/*    ></Collapsible>*/}
      {/*  ))}*/}
      <Collapsible
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
              Billing Statement 1 (date)
            </span>
            <ChevronsUpDown className="justify-end" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid-cols-3 lg:grid">
            {/*<EmployeesInformation*/}
            {/*  data={employee as Tables<'company_employees'>}*/}
            {/*/>*/}
            <BillingInformation />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default BillingStatements
