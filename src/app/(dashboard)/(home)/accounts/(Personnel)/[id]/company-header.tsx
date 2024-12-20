import React, { FC } from 'react'
import { Separator } from '@/components/ui/separator'
import InitialsAvatar from 'react-initials-avatar'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAccountById from '@/queries/get-account-by-id'
import getEmployeeCount from '@/queries/get-employee-count'
import { Skeleton } from '@/components/ui/skeleton'
import BillingStatementTab from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(billing statements)/billing-statement-tab'
import ActiveBadge from '@/components/active-badge'

interface CompanyHeaderProps {
  id: string
}

const CompanyHeader: FC<CompanyHeaderProps> = ({ id }) => {
  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, id))
  const { count: employeeCount, isPending } = useQuery(
    getEmployeeCount(supabase, id),
  )

  return (
    <div className="flex w-full flex-col bg-background pb-6 drop-shadow-md  xl:mb-0 xl:justify-evenly">
      <div className="h-40 w-full bg-slate-400 object-cover xl:h-80 "></div>
      <div className="relative mx-auto flex w-full max-w-6xl translate-y-4 flex-col items-center justify-between px-8 pt-16 text-center xl:h-28 xl:translate-y-1 xl:flex-row xl:gap-8 xl:px-0 xl:pt-1 xl:text-left">
        <div className="absolute -top-20  mx-auto flex flex-col items-center justify-between rounded-full bg-sky-950 ring-4 ring-background xl:relative xl:top-0 xl:-ml-4 xl:-translate-y-8">
          <InitialsAvatar
            name={account?.company_name || ''}
            className="h-32 w-32 translate-y-10 text-center text-5xl text-white"
          />
        </div>
        <div className="flex w-full flex-col gap-1 ">
          <div className="text-md text-wrap break-all font-bold lg:leading-4">
            {account?.company_name || ''}
          </div>
          <div className="lg:text-wrap text-xs text-[#64748b]">
            {account?.company_address || ''}
          </div>
          {account?.is_account_active === false && (
            <div>
              <ActiveBadge isActive={false} />
            </div>
          )}
        </div>
        <div className="flex w-full flex-col items-center justify-evenly gap-4 xl:flex-row">
          <Separator
            className="hidden pt-12 text-muted-foreground xl:visible xl:block"
            orientation="vertical"
          />
          <div className="flex flex-row gap-12 pt-6 text-center xl:pt-0">
            <div className="flex flex-col">
              <div className="text-sm font-bold">
                {isPending ? (
                  <Skeleton className="mx-auto h-5 w-full" />
                ) : (
                  employeeCount
                )}
              </div>
              <div className="text-xs font-medium uppercase text-[#64748b]">
                Employees
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-bold">
                {/*@ts-ignore*/}
                {account?.hmo_provider ? account?.hmo_provider.name : 'N/A'}
              </div>
              <div className="text-xs font-medium uppercase text-[#64748b]">
                HMO
              </div>
            </div>
          </div>
          <Separator
            className="hidden pt-12 text-muted-foreground xl:visible xl:block"
            orientation="vertical"
          />
        </div>
        <div className="pt-2">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="about"
              className="text-sm font-medium text-[#64748b]"
            >
              About
            </TabsTrigger>
            <BillingStatementTab />
            <TabsTrigger
              value="employees"
              className="text-sm font-medium text-[#64748b]"
            >
              Employees
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
    </div>
  )
}

export default CompanyHeader
