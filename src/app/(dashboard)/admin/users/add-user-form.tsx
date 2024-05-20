'use client'

import userSchema from '@/app/(dashboard)/admin/users/user-schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SheetClose } from '@/components/ui/sheet'

const AddUserForm = () => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      department: 'marketing',
      password: '',
    },
  })

  return (
    <Form {...form}>
      <form>
        <div className="space-y-8 px-6 pb-10">
          <FormField
            name={'firstName'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name={'lastName'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name={'email'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name={'department'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={'Select department'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="agent">Marketing</SelectItem>
                    <SelectItem value="manager">After Sales</SelectItem>
                    <SelectItem value="admin">Under Writing</SelectItem>
                    <SelectItem value="admin">Finance</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="fixed bottom-0 flex w-full flex-row items-center justify-between gap-2 bg-[#f1f5f9] px-4 py-3 md:max-w-2xl">
          <Button variant="ghost" className="text-destructive">
            Delete
          </Button>
          <div className="flex flex-row items-center justify-center">
            <SheetClose asChild={true}>
              <Button variant="ghost">Cancel</Button>
            </SheetClose>
            <Button>Add User</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default AddUserForm
