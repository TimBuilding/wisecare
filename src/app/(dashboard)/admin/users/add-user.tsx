'use client'
import AddUserForm from '@/app/(dashboard)/admin/users/add-user-form'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Plus, X } from 'lucide-react'
import Avatar, { genConfig } from 'react-nice-avatar'

const AddUser = () => {
  const uid = '123'
  const config = genConfig(uid)
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <Button className="space-x-2">
          <Plus />
          <span>Add</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="xs:w-screen w-screen bg-card sm:max-w-none md:max-w-2xl">
        <div className="flex h-40 flex-col items-end bg-[#f1f5f9] px-7 py-5">
          <SheetClose asChild={true}>
            <Button variant={'ghost'} size={'icon'}>
              <X />
            </Button>
          </SheetClose>
        </div>
        <div>
          <Avatar
            className="mx-6 h-32 w-32 -translate-y-16 rounded-full border-4 border-card"
            {...config}
          />
          <AddUserForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default AddUser
