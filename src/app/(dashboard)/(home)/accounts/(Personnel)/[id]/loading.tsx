import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const CompanyLoading = () => {
  return (
    <div>
      <div className="flex w-full flex-col bg-background pb-6 drop-shadow-md  xl:mb-0 xl:justify-evenly">
        <div className="h-40 w-full bg-slate-400 object-cover xl:h-80 "></div>
        <div className="relative mx-auto flex w-full max-w-5xl translate-y-4 flex-col items-center justify-between px-8 pt-16 text-center xl:h-20 xl:translate-y-1 xl:flex-row xl:gap-8 xl:px-0 xl:pt-1 xl:text-left">
          <Skeleton className="absolute -top-20 h-32 w-32 translate-y-10 rounded-full ring-4 ring-background xl:relative xl:top-0 xl:-ml-4 xl:-translate-y-8" />
          <div className="flex w-full flex-col gap-1">
            <div className="text-lg font-bold lg:leading-4">
              <Skeleton className="mx-auto h-6 w-48" />
            </div>
            <div className="lg:text-wrap text-xs text-[#64748b]">
              <Skeleton className="mx-auto h-4 w-48" />
            </div>
          </div>
          <div className="mt-5 flex w-full flex-col items-center justify-evenly gap-4 xl:flex-row">
            <Separator
              className="hidden pt-12 text-muted-foreground xl:visible xl:block"
              orientation="vertical"
            />
            <div className="flex flex-row gap-12 pt-6 text-center xl:pt-0">
              <div className="flex flex-col">
                <Skeleton className="mx-auto h-5 w-full" />
              </div>
              <div className="flex flex-col">
                <Skeleton className="mx-auto h-5 w-full" />
              </div>
            </div>
            <Separator
              className="hidden pt-12 text-muted-foreground xl:visible xl:block"
              orientation="vertical"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyLoading
