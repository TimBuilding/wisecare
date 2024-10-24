'use server'
import CompanyPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-page'
import getRole from '@/utils/get-role'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

const Page = async ({ params }: { params: { id: string } }) => {
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
