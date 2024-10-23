'use server'

import { cookies } from 'next/headers'
import { createServerClient } from './supabase'
import { redirect } from 'next/navigation'

const pageProtect = async (departments: string[]) => {
  const supabase = createServerClient(cookies())

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userProfileData, error: userProfileError } = await supabase
    .from('user_profiles')
    .select('departments(name)')
    .eq('user_id', user?.id)
    .single()

  if (userProfileError) {
    return redirect('/')
  }

  // @ts-ignore
  if (!departments.includes(userProfileData.departments.name as any)) {
    return redirect('/')
  }
}

export default pageProtect
