import React, { FC } from 'react'
import EmployeesInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-information'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { createBrowserClient } from '@/utils/supabase'
// import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
// import getEmployeeInputs from '@/queries/get-employee-inputs'

interface Props {
  companyId: string
}

const EmployeesPage: FC<Props> = ({ companyId }) => {
  // const supabase = createBrowserClient()
  // const { data: employees, error } = useQuery(getEmployeeInputs(supabase, companyId))
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-between gap-6">
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
            <span className="text-lg font-semibold">Tamara Rivera</span>
            <ChevronsUpDown className="justify-end" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid-cols-3 lg:grid ">
            <EmployeesInformation id={companyId} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default EmployeesPage
