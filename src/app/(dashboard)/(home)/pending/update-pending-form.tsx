import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import PendingInputs from './forms/pending-inputs'
import pendingSchema from './forms/pending-schema'
import MarketingInputs from '../accounts/forms/marketing-inputs'
import { Separator } from '@/components/ui/separator'
import DisabledInputs from './forms/disabled-inputs'
import { Button } from '@/components/ui/button'
import { FC } from 'react'

interface Props {
  accountId: string
}

const UpdatePendingForm: FC<Props> = ({ accountId }) => {
  const form = useForm<z.infer<typeof pendingSchema>>({
    resolver: zodResolver(pendingSchema),
    defaultValues: {
      mode_of_premium_id: '',
      due_date: new Date(),
      or_number: '',
      or_date: new Date(),
      sa_number: '',
      amount: 0,
      total_contract_value: 0,
      balance: 0,
      billing_period: 1,
    },
  })

  return (
    <Form {...form}>
      <form>
        <div className="w-full space-y-5 px-8 py-5">
          <DisabledInputs isLoading={false} id={accountId} />
          <Separator className="my-5" />
          <PendingInputs />
          <Button>Update</Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdatePendingForm
