import React, { FC, useState, useEffect } from 'react'
import { Separator } from '@/components/ui/separator'
import InitialsAvatar from 'react-initials-avatar'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAccountById from '@/queries/get-account-by-id'
import getEmployeeCount from '@/queries/get-employee-count'
import { Skeleton } from '@/components/ui/skeleton'

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
    <div className="flex w-full flex-col bg-background pb-6 drop-shadow-md xl:mb-0">
      <div className="h-40 w-full bg-slate-400 object-cover xl:h-80 "></div>
      <div className="relative mx-auto flex w-full max-w-5xl translate-y-4 flex-col items-center justify-between px-8 pt-16 text-center xl:h-16 xl:translate-y-1 xl:flex-row xl:gap-8 xl:px-0 xl:pt-1 xl:text-left">
        <div className="absolute -top-20  mx-auto flex flex-col items-center justify-between rounded-full bg-sky-950 ring-4 ring-background xl:relative xl:top-0 xl:-ml-4 xl:-translate-y-10">
          <InitialsAvatar
            name={account?.company_name || ''}
            className="h-32 w-32 translate-y-10 text-center text-5xl text-white"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-4 xl:flex-row">
          <div className="flex w-36 flex-col ">
            <div className="text-lg font-bold lg:truncate lg:text-clip ">
              {account?.company_name || ''}
            </div>
            <div className="text-sm text-[#64748b] lg:truncate lg:text-clip">
              Philippines
            </div>
          </div>
          <Separator
            className="hidden pt-12 text-muted-foreground xl:visible xl:block xl:-translate-x-8"
            orientation="vertical"
          />
          <div className="flex flex-row gap-12 text-center xl:-translate-x-24 ">
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
                {account?.hmo_provider ? account?.hmo_provider.name : ''}
              </div>
              <div className="text-xs font-medium uppercase text-[#64748b]">
                HMO
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="about"
              className="text-sm font-medium text-[#64748b]"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="text-sm font-medium text-[#64748b]"
            >
              Billing Statements
            </TabsTrigger>
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
