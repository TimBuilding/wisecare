import { Button } from '@/components/ui/button'
import { TypeTabs } from './type-card'
import { Menu } from 'lucide-react'

const TypesTitle = ({ page }: { page: TypeTabs }) => {
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

  return (
    <div className="flex flex-row items-center gap-1 px-3">
      <Button variant={'ghost'} size={'icon'}>
        <Menu className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-bold">{renderTitle()}</h1>
    </div>
  )
}

export default TypesTitle
