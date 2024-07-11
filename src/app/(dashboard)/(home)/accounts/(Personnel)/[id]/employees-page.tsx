import React from 'react'
import EmployeesInformation from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/employees-information'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const EmployeesPage = () => {
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
            <span className="text-lg font-semibold">
              {' '}
              Tamara Angela A. Rivera
            </span>
            <ChevronsUpDown className="justify-end" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid-cols-3 lg:grid ">
            <EmployeesInformation />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default EmployeesPage
