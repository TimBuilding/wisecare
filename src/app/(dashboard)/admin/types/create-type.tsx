'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import typeSchema from './type-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { TypeTabs } from './type-card'
import { FC } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface Props {
  page: TypeTabs
}

const CreateType: FC<Props> = ({ page }) => {
  const renderTitle = () => {
    switch (page) {
      case 'account_types':
        return 'Account Types'
      case 'hmo_providers':
        return 'HMO Providers'
      case 'mode_of_payments':
        return 'Mode of Payments'
      case 'mode_of_premium':
        return 'Mode of Premium'
      case 'plan_types':
        return 'Plan Types'
    }
  }

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: {
      name: '',
    },
  })

  return (
    <Form {...form}>
      <form className="mt-8 px-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Add <span className="lowercase">{renderTitle()}</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} />
                  <Button
                    className="absolute right-1 top-1"
                    size={'icon'}
                    variant={'ghost'}
                  >
                    <div className="rounded-full bg-[#97a2b1] p-1">
                      <Plus className="h-4 w-4" />
                    </div>
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default CreateType
