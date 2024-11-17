'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { DialogClose } from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import getAllAccounts from '@/queries/get-all-accounts'
import { createBrowserClient } from '@/utils/supabase'
import { cn } from '@/utils/tailwind'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

const EmployeesExport = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const supabase = createBrowserClient()
  const { data: accounts } = useQuery(getAllAccounts(supabase))

  const handleExport = () => {
    // TODO: Implement export
  }

  return (
    <div className="flex flex-col gap-10">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? accounts?.find((account) => account.id === value)?.company_name
              : 'Select account...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command
            filter={(value, search, keywords = []) => {
              const extendValue = value + ' ' + keywords.join(' ')
              if (extendValue.toLowerCase().includes(search.toLowerCase())) {
                return 1
              }
              return 0
            }}
          >
            <CommandInput placeholder="Search account..." />
            <CommandList>
              <CommandEmpty>No account found.</CommandEmpty>
              <CommandGroup>
                {accounts?.map((account) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={account.id}
                    value={account.id}
                    keywords={[account.company_name]}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === account.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {account.company_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex justify-end gap-2">
        <Button onClick={handleExport}>Request Export</Button>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </div>
    </div>
  )
}

export default EmployeesExport
