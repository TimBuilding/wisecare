import { TypeTabs } from '@/app/(dashboard)/admin/types/type-card'
import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getTypes = (supabase: TypedSupabaseClient, page: TypeTabs) => {
  return supabase.from(page).select('name, id').throwOnError()
}

export default getTypes
