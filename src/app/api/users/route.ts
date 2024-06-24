import isAdmin from '@/utils/is-admin'
import { createServerClient, createServiceRoleClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import generator from 'generate-password'

// create new user
export const POST = async (req: NextRequest) => {
  // check if admin
  const supabaseUser = createServerClient(cookies())
  if (!(await isAdmin(supabaseUser))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { first_name, last_name, email, department } = await req.json()

  const supabase = createServiceRoleClient()

  // const randomPassword = Math.random().toString(36).slice(-8)
  const randomPassword = generator.generate({
    length: 12,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
  })

  // get agent department id
  const { data: departmentData, error: departmentError } = await supabase
    .from('departments')
    .select('id')
    .eq('name', department)
    .single()

  if (!departmentData || departmentError) {
    return NextResponse.json({ error: 'Department not found' }, { status: 400 })
  }

  const { error } = await supabase.auth.admin.createUser({
    email,
    password: randomPassword,
    user_metadata: {
      first_name,
      last_name,
      department: departmentData?.id,
    },
  })

  if (error) {
    return NextResponse.json({ error: 'User creation failed' }, { status: 500 })
  }

  return NextResponse.json({ message: 'User created' }, { status: 200 })
}
