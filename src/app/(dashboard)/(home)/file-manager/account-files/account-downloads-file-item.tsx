import React, { FC } from 'react'
import { File } from 'lucide-react'
import { Tables } from '@/types/database.types'
import { useDownloadsContext } from '@/app/(dashboard)/(home)/file-manager/downloads-provider'

interface AccountDownloadsFileItemProps {
  data: Tables<'pending_export_requests'>
}

const AccountDownloadsFileItem: FC<AccountDownloadsFileItemProps> = ({
  data,
}) => {
  const { setFile } = useDownloadsContext()

  return (
    <div
      onClick={() => setFile(data)}
      className="flex h-40 w-40 flex-col items-center justify-center gap-4 rounded-2xl bg-card p-4 drop-shadow-md hover:cursor-pointer"
    >
      <div className="relative">
        <File className="h-20 w-20 fill-[#94a3b8] text-[#FCFCFC]" />
        <div className=" absolute bottom-0 left-0 h-5 w-9 rounded-md bg-green-600 py-0.5 text-center text-xs font-semibold text-white">
          XLS
        </div>
      </div>
      <span className="text-center text-xs font-medium text-[#1e293b]">
        {new Date(data.created_at).toLocaleDateString()} - Accounts Sheet
      </span>
    </div>
  )
}

export default AccountDownloadsFileItem
