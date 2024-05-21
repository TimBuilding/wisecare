'use server'

import { cookies } from 'next/headers'
import { createServerClient } from './supabase'
import { redirect } from 'next/navigation'

const pageProtect = async (department: string) => {
  const supabase = createServerClient(cookies())

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userProfileData, error: userProfileError } = await supabase
    .from('user_profiles')
    .select('departments(name)')
    .eq('user_id', user?.id)
    .single()

  console.log(userProfileData)

  if (userProfileError) {
    return redirect('/')
  }

  // @ts-ignore
  if ((userProfileData.departments.name as any) !== department) {
    return redirect('/')
  }
}

export default pageProtect
