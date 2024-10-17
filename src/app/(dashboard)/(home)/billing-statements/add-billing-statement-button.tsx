import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FC } from 'react'
import BillingStatementForm from '@/components/billing-statement/billing-statement-form'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const AddBillingStatementButton: FC<Props> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={true}>
        <Button>Add Billing Statement</Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Add Billing Statement</DialogTitle>
          <DialogDescription>
            Add a new billing statement to the account
          </DialogDescription>
        </DialogHeader>
        <BillingStatementForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddBillingStatementButton
