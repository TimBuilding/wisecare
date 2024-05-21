import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { TypeTabs } from './type-card'
import { FC } from 'react'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createBrowserClient } from '@/utils/supabase'
import getTypes from '@/queries/get-types'
import { Skeleton } from '@/components/ui/skeleton'

const TypeListItem = ({
  name,
  date,
  id,
  isLoading,
}: {
  name?: string
  date?: string
  id?: string
  isLoading?: boolean
}) => {
  return (
    <div className="flex flex-row items-center justify-between py-6">
      <div className="flex flex-row items-center justify-center gap-4">
        {id && <div className="h-10 w-10 rounded-full bg-primary" />}
        {isLoading && <Skeleton className="h-10 w-10 rounded-full" />}
        <div className="flex flex-col items-start justify-center">
          <span className="text-sm font-medium">
            {name}
            {isLoading && <Skeleton className="h-4 w-20" />}
          </span>
          <span className="text-sm text-[#64748b]">
            {date}
            {isLoading && <Skeleton className="mt-1 h-4 w-24" />}
          </span>
        </div>
      </div>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="text-muted-foreground/50 hover:text-destructive"
      >
        {isLoading && <Skeleton className="h-10 w-10 rounded-full" />}
        {id && <Trash2 className="h-6 w-6" />}
      </Button>
    </div>
  )
}

interface Props {
  page: TypeTabs
}

const TypeList: FC<Props> = ({ page }) => {
  const supabase = createBrowserClient()
  const { data, isPending } = useQuery(getTypes(supabase, page))

  return (
    <div className="mt-9 flex w-full flex-col divide-y divide-border border-y border-border px-6">
      {isPending &&
        [...Array(5)].map((_, index) => (
          <TypeListItem isLoading={true} key={index} />
        ))}
      {data?.map((type) => (
        <TypeListItem
          key={type.id}
          name={type.name}
          date="2022-01-01"
          id={type.id}
        />
      ))}
    </div>
  )
}

export default TypeList
