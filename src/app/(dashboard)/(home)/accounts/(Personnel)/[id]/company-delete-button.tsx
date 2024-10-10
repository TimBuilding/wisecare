'use client'
import { DeleteCompanySchema } from '@/app/(dashboard)/(home)/accounts/(Personnel)/delete-company-schema'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import getAccountById from '@/queries/get-account-by-id'
import { createBrowserClient } from '@/utils/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'
import { Trash, X } from 'lucide-react'
import { FC, FormEventHandler, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  accountId: string
}

const CompanyDeleteButton: FC<Props> = ({ accountId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof DeleteCompanySchema>>({
    resolver: zodResolver(DeleteCompanySchema),
    defaultValues: {
      companyName: '',
    },
  })

  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, accountId))

  const { mutateAsync, isPending } = useUpdateMutation(
    // @ts-ignore
    supabase.from('accounts'),
    ['id'],
    'id',
    {
      onSuccess: () => {
        setIsOpen(false)
        form.reset()
        toast({
          variant: 'default',
          title: 'Success',
          description: 'Account deleted',
        })
      },
      onError: (error) => {
        console.log(error)
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.message,
        })
      },
    },
  )

  const onUpdateHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      form.handleSubmit(async (data) => {
        // check if companyName is same as account?.company_name
        if (data.companyName !== account?.company_name) {
          form.setError('companyName', {
            type: 'manual',
            message: 'Company name does not match',
          })
          return
        }

        await mutateAsync({
          id: accountId,
          is_active: false,
        })
      })(e)
    },
    [account?.company_name, accountId, form, mutateAsync],
  )

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild={true}>
        <Button className="w-fit rounded-md" variant={'destructive'}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={onUpdateHandler}>
            <AlertDialogCancel className="absolute right-5 top-5 h-fit w-fit border-0 p-0">
              <X className="h-4 w-4" />
            </AlertDialogCancel>
            <AlertDialogHeader className="mb-3">
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-black">
                This action <span className="font-bold">CANNOT</span> be undone.
                This will permanently delete the{' '}
                <span className="font-bold">{account?.company_name}</span>{' '}
                account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Please type in the name of the account to confirm.
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className="mt-3">
              <Button
                variant={'destructive'}
                className="w-full"
                type="submit"
                disabled={isPending}
              >
                I understand, delete this account
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CompanyDeleteButton
