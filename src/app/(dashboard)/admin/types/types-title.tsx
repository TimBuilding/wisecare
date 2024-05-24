import { Button } from '@/components/ui/button'
import { TypeTabs } from './type-card'
import { Menu } from 'lucide-react'
import { FC } from 'react'

interface Props {
  page: TypeTabs
  handleClick: () => void
}

const TypesTitle: FC<Props> = ({ page, handleClick }) => {
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
    <div className="flex flex-row items-center gap-1 px-3 lg:px-12">
      <Button
        variant={'ghost'}
        size={'icon'}
        onClick={handleClick}
        className="lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-bold">{renderTitle()}</h1>
    </div>
  )
}

export default TypesTitle
