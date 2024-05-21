'use client'
import { useState } from 'react'
import TypesTitle from './types-title'
import CreateType from './create-type'
import TypeList from './type-list'

export type TypeTabs =
  | 'account_types'
  | 'hmo_providers'
  | 'mode_of_payments'
  | 'mode_of_premium'
  | 'plan_types'

const TypeCard = () => {
  const [page, setPage] = useState<TypeTabs>('account_types')

  return (
    <div className="pt-9">
      <TypesTitle page={page} />
      <CreateType page={page} />
      <TypeList page={page} />
    </div>
  )
}

export default TypeCard
