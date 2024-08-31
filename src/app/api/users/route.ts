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

  // check if being created is an agent
  if (department === 'agent') {
    const randomPassword = generator.generate({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    })

    const { error } = await supabase.auth.admin.createUser({
      email,
      password: randomPassword,
      user_metadata: {
        first_name,
        last_name,
        department: department,
      },
    })

    if (error) {
      return NextResponse.json(
        { error: 'Agent creation failed' },
        { status: 500 },
      )
    }

    return NextResponse.json({ message: 'Agent created' }, { status: 200 })
  }

  const emailRedirectTo = `${process.env.NEXT_PUBLIC_DOMAIN}/confirm-account`

  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: {
      first_name,
      last_name,
      department: department,
    },
    redirectTo: emailRedirectTo,
  })

  if (error) {
    return NextResponse.json({ error: 'User creation failed' }, { status: 500 })
  }

  // // send confirmation email
  // const { error: emailConfirmationError } = await supabase.auth.resend({
  //   type: 'signup',
  //   email: email,
  //   options: {
  //     emailRedirectTo: emailRedirectTo,
  //   },
  // })

  // if (emailConfirmationError) {
  //   return NextResponse.json(
  //     { error: 'Email confirmation failed' },
  //     { status: 500 },
  //   )
  // }

  return NextResponse.json({ message: 'User created' }, { status: 200 })
}
