import { TypeTabs } from '@/app/(dashboard)/admin/types/type-card'
import typeSchema from '@/app/(dashboard)/admin/types/type-schema'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Pencil } from 'lucide-react'
import dynamic from 'next/dynamic'
import { FC, FormEventHandler, Suspense, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const EditTypeFields = dynamic(() => import('./edit-type-fields'), {
  ssr: false,
})

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
    [id, mutateAsync, form],
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
          <Suspense fallback={<div>Loading...</div>}>
            <EditTypeFields
              handleEdit={handleEdit}
              isPending={isPending}
              name={name}
            />
          </Suspense>
        </DialogContent>
      </Form>
    </Dialog>
  )
}

export default EditType
