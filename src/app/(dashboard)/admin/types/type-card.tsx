'use client'
import { createContext, useContext, useState } from 'react'
import TypesTitle from './types-title'
import CreateType from './create-type'
import TypeList from './type-list'
import TypesNavigation from './types-navigation'

export type TypeTabs =
  | 'account_types'
  | 'hmo_providers'
  | 'mode_of_payments'
  | 'mode_of_premium'
  | 'plan_types'

const useTypesContext = () => {
  const context = useContext(TypesContext)
  if (context === undefined) {
    throw new Error('useTypesContext must be used within a TypesProvider')
  }
  return context
}

const TypesContext = createContext({
  isNavOpen: false,
  setIsNavOpen: (value: boolean) => {},
  page: 'account_types',
  setPage: (value: TypeTabs) => {},
})

const TypeCard = () => {
  const [page, setPage] = useState<TypeTabs>('account_types')
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <TypesContext.Provider value={{ isNavOpen, setIsNavOpen, page, setPage }}>
      <div className="flex w-full flex-row">
        <TypesNavigation open={isNavOpen} />
        <div className="w-full pt-9">
          <TypesTitle handleClick={() => setIsNavOpen(true)} page={page} />
          <CreateType page={page} />
          <TypeList page={page} />
        </div>
      </div>
    </TypesContext.Provider>
  )
}

export default TypeCard
export { useTypesContext }
