import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

const TypeListItem = () => {
  return (
    <div className="flex flex-row items-center justify-between py-6">
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary" />
        <div className="flex flex-col items-start justify-center">
          <span className="text-sm font-medium">Name</span>
          <span className="text-sm text-[#64748b]">Date</span>
        </div>
      </div>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="text-muted-foreground/50 hover:text-destructive"
      >
        <Trash2 className="h-6 w-6" />
      </Button>
    </div>
  )
}

const TypeList = () => {
  return (
    <div className="mt-9 flex w-full flex-col divide-y divide-border border-y border-border px-6">
      <TypeListItem />
      <TypeListItem />
      <TypeListItem />
      <TypeListItem />
      <TypeListItem />
    </div>
  )
}

export default TypeList
