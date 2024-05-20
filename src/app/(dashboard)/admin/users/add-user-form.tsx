'use client'

import userSchema from '@/app/(dashboard)/admin/users/user-schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { SheetClose } from '@/components/ui/sheet'
import { createBrowserClient } from '@/utils/supabase'
import { useState } from 'react'
import Message from '@/components/message'
import { Loader2 } from 'lucide-react'

const AddUserForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      department: 'marketing',
      // password: '',
    },
  })

  const handleSubmit: SubmitHandler<z.infer<typeof userSchema>> = async (
    data,
  ) => {
    setIsLoading(true)
    const supabase = createBrowserClient()
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: 'password123',
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          department: 'marketing',
        },
      },
    })
    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    // clear form
    form.reset()
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-8 px-6 pb-10">
          {error && <Message variant={'error'}>{error}</Message>}
          <FormField
            name={'firstName'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={'lastName'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={'email'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={'department'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue placeholder={'Select department'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="after-sales">After Sales</SelectItem>
                    <SelectItem value="under-writing">Under Writing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="fixed bottom-0 flex w-full flex-row items-center justify-between gap-2 bg-[#f1f5f9] px-4 py-3 md:max-w-2xl">
          <Button
            type="button"
            variant="ghost"
            className="text-destructive"
            disabled={isLoading}
          >
            Delete
          </Button>
          <div className="flex flex-row items-center justify-center">
            <SheetClose asChild={true}>
              <Button type="button" variant="ghost" disabled={isLoading}>
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Add User'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default AddUserForm
