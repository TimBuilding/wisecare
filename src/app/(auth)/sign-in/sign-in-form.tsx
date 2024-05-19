'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import signInSchema from './sign-in-schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createBrowserClient } from '@/utils/supabase'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import WisecareLogo from '@/assets/images/wisecare-logo-2 1.png'
import Image from 'next/image'
import Message from '@/components/message'
import { zodResolver } from '@hookform/resolvers/zod'

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSignIn: SubmitHandler<z.infer<typeof signInSchema>> = async ({
    email,
    password,
  }) => {
    const supabase = createBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return setError(error.message.toString())
    }

    // if success, then redirect to home page
    router.push('/')
  }
  return (
    <div className="mx-auto flex min-w-[300px] max-w-xs flex-col gap-8 md:max-w-md">
      <Image src={WisecareLogo} alt={'Wisecare'} />
      <h1 className="text-left text-3xl font-extrabold">Sign in</h1>
      {error && <Message variant={'error'}>{error}</Message>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignIn)} className="w-full">
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password*</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-7 flex w-full justify-start py-2.5">
            <Link href={'#'} className="text-xs font-medium text-primary">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="mt-8 w-full">
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignInForm
