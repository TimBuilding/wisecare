import React from 'react'
import { File } from 'lucide-react'

const AccountDownloads = () => {
  return (
    <div className="flex flex-row">
      <div className="flex h-40 w-40 flex-col items-center justify-center gap-4 rounded-2xl bg-card p-4 drop-shadow-md">
        {/*TODO: Add mapping for list of files*/}
        <File className="h-20 w-20 fill-[#94a3b8] text-[#FCFCFC]" />
        <div className="fixed bottom-14 left-12 h-5 w-9 rounded-md bg-green-600 py-0.5 text-center text-xs font-semibold text-white">
          {' '}
          XLS{' '}
        </div>
        <span className="text-xs font-medium text-[#1e293b]">
          {' '}
          Account File{' '}
        </span>
      </div>
    </div>
  )
}

export default AccountDownloads
