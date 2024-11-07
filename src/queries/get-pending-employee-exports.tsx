import { TypedSupabaseClient } from '@/types/typedSupabaseClient'
import { Enums } from '@/types/database.types'

const getPendingEmployeeExports = (
  supabase: TypedSupabaseClient,
  accountId: string,
  exportType: Enums<'export_type'>,
) => {
  return supabase
    .from('pending_export_requests')
    .select(`id, export_type`, {
      count: 'exact',
      head: true,
    })
    .eq('is_approved', false)
    .eq('is_active', true)
    .eq('export_type', exportType)
    .eq('account_id', accountId)
    .throwOnError()
}

export default getPendingEmployeeExports
