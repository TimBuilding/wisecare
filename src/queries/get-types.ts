import { TypeTabs } from '@/app/(dashboard)/admin/types/type-card'
import { TypedSupabaseClient } from '@/types/typedSupabaseClient'

const getTypes = (supabase: TypedSupabaseClient, page: TypeTabs) => {
  return supabase
    .from(page)
    .select('name, id, created_at')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .throwOnError()
}

export default getTypes
