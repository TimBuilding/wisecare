'use client'
import AddUserForm from '@/app/(dashboard)/admin/users/create/add-user-form'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'

const AddUser = () => {
  const config = genConfig({
    sex: 'man',
    faceColor: '#B0B0B0',
    earSize: 'small',
    hairColor: '#808080',
    hairStyle: 'normal',
    hatColor: '#808080',
    hatStyle: 'none',
    eyeBrowStyle: 'up',
    glassesStyle: 'none',
    noseStyle: 'short',
    mouthStyle: 'smile',
    shirtStyle: 'hoody',
    shirtColor: '#C0C0C0',
    bgColor: '#D3D3D3',
  })
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
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
          <AddUserForm onOpenChange={setIsFormOpen} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default AddUser
