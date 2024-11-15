'use client'
import React from 'react'
import { File, X } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet'
import AccountDownloadsSheet from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads-sheet'
import { useAccountDownloadsContext } from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads-provider'
import { Button } from '@/components/ui/button'
import AccountDownloadsButton from '@/app/(dashboard)/(home)/file-manager/account-files/account-downloads-button'

const AccountDownloads = () => {
  const { setIsSheetOpen } = useAccountDownloadsContext()
  const handleClick = () => {
    setIsSheetOpen(true)
  }

  return (
    <div className="flex flex-row">
      <Sheet>
        <SheetTrigger
          onClick={handleClick}
          asChild={true}
          className="hover:cursor-pointer"
        >
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
        </SheetTrigger>
        <SheetContent className="xs:w-screen flex w-screen flex-col justify-between overflow-auto bg-card sm:max-w-none md:max-w-md">
          <div className="flex flex-col items-end px-7 py-5">
            <SheetClose asChild={true}>
              <Button variant={'ghost'} size={'icon'}>
                <X />
              </Button>
            </SheetClose>
          </div>
          <AccountDownloadsSheet />
          <SheetFooter className="mt-auto flex flex-row items-center justify-between gap-4 p-12">
            {/*  TODO : Buttons functionality */}
            <AccountDownloadsButton />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default AccountDownloads
