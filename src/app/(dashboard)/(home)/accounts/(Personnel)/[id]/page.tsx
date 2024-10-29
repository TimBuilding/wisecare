'use server'
import CompanyPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-page'
import getRole from '@/utils/get-role'
import { createServerClient } from '@/utils/supabase'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const supabase = createServerClient(cookies())
  const { data } = await supabase
    .from('accounts')
    .select('company_name')
    .eq('id', params.id)
    .single()

  return { title: data?.company_name }
}

const Page = async ({ params }: Props) => {
  const supabase = createServerClient(cookies())
  const { data } = await supabase
    .from('accounts')
    .select('id')
    .eq('id', params.id)
    .eq('is_active', true)
    .single()

  if (!data) {
    notFound()
  }

  const role = await getRole()

  return <CompanyPage companyId={params.id} role={role} />
}

export default Page
