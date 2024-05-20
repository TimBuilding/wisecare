import { Tables } from '@/types/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

const getUsers = async (
  supabase: SupabaseClient,
): Promise<Tables<'user_profiles'>[]> => {
  const { data, error } = await supabase.from('user_profiles').select('*')
  if (error) {
    return []
  }
  return data
}

export default getUsers
