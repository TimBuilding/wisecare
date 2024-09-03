import { TypeTabs } from '@/app/(dashboard)/admin/types/type-card'
import typeSchema from '@/app/(dashboard)/admin/types/type-schema'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Loader2, Pencil } from 'lucide-react'
import { FC, FormEvent, FormEventHandler, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EditTypeProps {
  id: string
  name: string
  page: TypeTabs
}

const EditType: FC<EditTypeProps> = ({ id, name, page }) => {
  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: {
      name: name,
    },
  })

  const supabase = createBrowserClient()
  const { toast } = useToast()

  const { mutateAsync, isPending, error } = useUpdateMutation(
    // @ts-ignore
    supabase.from(page),
    ['id'],
    'name, id, created_at',
    {
      onSuccess: () => {
        toast({
          title: 'Type updated',
          description: 'The type has been updated',
        })
      },
    },
  )

  const handleEdit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      form.handleSubmit((data) => {
        mutateAsync({ id, name: data.name })
      })(e)
    },
    [id, name, mutateAsync, form],
  )

  return (
    <Dialog>
      <Form {...form}>
        <DialogTrigger asChild={true}>
          <Button
            variant={'ghost'}
            size={'icon'}
            className="text-muted-foreground/50 hover:text-destructive"
          >
            <Pencil className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Edit {name} type</DialogTitle>
              <DialogDescription>Edit the type name</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        className="col-span-3"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Save changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  )
}

export default EditType
