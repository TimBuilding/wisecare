'use client'

import RenewalItem from '@/app/(dashboard)/(home)/(dashboard)/upcoming-renewals/renewal-item'
import { Tables } from '@/types/database.types'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

const RenewalList = () => {
  const supabase = createBrowserClient()
  const { data } = useQuery(
    supabase
      .from('accounts')
      .select('company_name, expiration_date, initial_contract_value, id')
      .eq('is_account_active', true)
      .eq('is_active', true)
      .order('expiration_date', { ascending: true })
      .limit(4),
  )

  return (
    <div className="max-h-[370px] space-y-4 overflow-y-auto">
      {data?.map((item) => (
        <RenewalItem key={item.id} data={item as Tables<'accounts'>} />
      ))}
    </div>
  )
}

export default RenewalList
