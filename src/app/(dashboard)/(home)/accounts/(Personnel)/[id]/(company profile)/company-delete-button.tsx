'use client'
import EditPendingRequest from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/edit-pending-request'
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
  useInsertMutation,
  useQuery,
} from '@supabase-cache-helpers/postgrest-react-query'
import { Loader2, Trash, X } from 'lucide-react'
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
  const [isEditPendingRequestOpen, setIsEditPendingRequestOpen] =
    useState(false)
  const [pendingRequestId, setPendingRequestId] = useState('')

  const supabase = createBrowserClient()
  const { data: account } = useQuery(getAccountById(supabase, accountId))

  const { mutateAsync, isPending } = useInsertMutation(
    // @ts-ignore
    supabase.from('pending_accounts'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Deletion Request Submitted',
          description:
            'Your request to delete the company account has been submitted successfully and is awaiting approval.',
        })

        setIsOpen(false)
      },
      onError: (error) => {
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

        // check if there is already a pending request
        const { data: pendingRequest } = await supabase
          .from('pending_accounts')
          .select('id')
          .eq('account_id', accountId)
          .eq('is_active', true)
          .eq('is_approved', false)
          .single()

        if (pendingRequest) {
          setIsEditPendingRequestOpen(true)
          setPendingRequestId(pendingRequest.id)
          return
        }

        const {
          data: { user },
        } = await supabase.auth.getUser()

        await mutateAsync([
          {
            account_id: accountId,
            is_delete_account: true,
            company_name: data.companyName,
            created_by: user?.id,
            operation_type: 'delete',
          },
        ])
      })(e)
    },
    [account?.company_name, accountId, form, mutateAsync],
  )

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild={true}>
          <Button className="w-fit" variant={'destructive'}>
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
                  This action <span className="font-bold">CANNOT</span> be
                  undone. This will permanently delete the{' '}
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
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'I understand, delete this account'
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
      <EditPendingRequest
        isOpen={isEditPendingRequestOpen}
        onClose={() => setIsEditPendingRequestOpen(false)}
        pendingRequestId={pendingRequestId}
      />
    </>
  )
}

export default CompanyDeleteButton
