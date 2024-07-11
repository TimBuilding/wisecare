import React from 'react'
import InitialsAvatar from 'react-initials-avatar'
import { Separator } from '@/components/ui/separator'

const Page = () => {
  return (
    <div className="flex w-full flex-col bg-background pb-12 drop-shadow-md xl:mb-0">
      <div className="h-40 w-full bg-slate-400 object-cover xl:h-80 "></div>
      <div className="relative mx-auto flex w-full max-w-4xl translate-y-4 flex-col items-center justify-between px-8 pt-16 text-center xl:h-8 xl:translate-y-5 xl:flex-row xl:gap-8 xl:px-0 xl:pt-1 xl:text-left ">
        <div className="absolute -top-20  mx-auto flex flex-col items-center justify-between rounded-full bg-sky-950 ring-4 ring-background xl:relative xl:top-0 xl:-ml-4 xl:-translate-y-10">
          <InitialsAvatar
            name="Tamara Company"
            className="h-32 w-32 translate-y-10 text-center text-5xl text-white"
          />
        </div>
        <div className="flex w-full flex-col items-center xl:flex-row xl:gap-8">
          <div className="flex flex-col">
            <div className="text-lg font-bold">Tamara Company</div>
            <div className="text-sm text-[#64748b]">Makati, Philippines</div>
          </div>
          <Separator
            className="hidden pt-12 text-muted-foreground xl:visible xl:block"
            orientation="vertical"
          />
          <div className="flex flex-row gap-8 pt-6 text-center xl:pt-1">
            <div className="flex flex-col">
              <div className="text-sm font-bold">200k</div>
              <div className="text-sm font-medium uppercase text-[#64748b]">
                followers
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-bold">1.2k</div>
              <div className="text-sm font-medium uppercase text-[#64748b]">
                following
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
