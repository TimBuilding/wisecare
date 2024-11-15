'use client'
import React from 'react'
import { SheetHeader } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { File } from 'lucide-react'

const EmployeeDownloadsSheet = () => {
  return (
    <div className="space-y-8 p-12">
      <SheetHeader className="items-center justify-center">
        <div className="flex h-[235px] w-[352px] items-center justify-center rounded-lg border bg-background p-8">
          <File className="h-24 w-24 text-[#94a3b8]" />
        </div>
      </SheetHeader>
      <div className="space-y-2">
        <span className="text-xl font-medium text-[#1e293b]">Account File</span>
        <div className="h-5 w-9 rounded-md bg-green-600 py-0.5 text-center text-xs font-semibold text-white">
          {' '}
          XLS{' '}
        </div>
      </div>
      <div className="space-y-4">
        <span className="text-lg font-medium">Information</span>
        <Separator />
        <div className=" flex flex-row justify-between pb-1 pt-1 ">
          <span className="text-sm font-medium text-[#64748b]">
            Approved at
          </span>
          <span className="text-sm text-[#1e293b]">November 15, 2024</span>
        </div>
        <Separator />
        <div className=" flex flex-row justify-between pb-1 pt-1 ">
          <span className="text-sm font-medium text-[#64748b]">
            Approved by
          </span>
          <span className="text-sm text-[#1e293b]">Jane Doe</span>
        </div>
        <Separator />
      </div>
    </div>
  )
}

export default EmployeeDownloadsSheet
