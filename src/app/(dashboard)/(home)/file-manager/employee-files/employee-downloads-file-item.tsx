import React, { FC } from 'react'
import { Tables } from '@/types/database.types'
import { useDownloadsContext } from '@/app/(dashboard)/(home)/file-manager/downloads-provider'
import { File } from 'lucide-react'
import { cn } from '@/utils/tailwind'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface EmployeeDownloadsFileItemProps {
  data: Tables<'pending_export_requests'>
}

const EmployeeDownloadsFileItem: FC<EmployeeDownloadsFileItemProps> = ({
  data,
}) => {
  const { setFile } = useDownloadsContext()
  const isDisabled = !data.is_approved

  return (
    <Tooltip>
      {isDisabled && (
        <TooltipContent>This file is not approved yet</TooltipContent>
      )}
      <TooltipTrigger>
        <div
          onClick={() => !isDisabled && setFile(data)}
          className={cn(
            isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            'flex h-40 w-40 flex-col items-center justify-center gap-4 rounded-2xl bg-card p-4 drop-shadow-md',
          )}
        >
          <div className="relative">
            <File className="h-20 w-20 fill-[#94a3b8] text-[#FCFCFC]" />
            <div className=" absolute bottom-0 left-0 h-5 w-9 rounded-md bg-green-600 py-0.5 text-center text-xs font-semibold text-white">
              XLS
            </div>
          </div>
          <span className="text-center text-xs font-medium text-[#1e293b]">
            {(data.account_id as any).company_name} - Employee Sheet
          </span>
        </div>
      </TooltipTrigger>
    </Tooltip>
  )
}

export default EmployeeDownloadsFileItem
