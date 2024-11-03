'use client'

import { useCompanyEditContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-edit-provider'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import EditPendingRequest from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/edit-pending-request'
import { Button } from '@/components/ui/button'
import { createBrowserClient } from '@/utils/supabase'
import { Pencil } from 'lucide-react'
import { FC, useState, useCallback, useMemo } from 'react'

interface Props {
  role: string | null
}

const CompanyEditButton: FC<Props> = ({ role }) => {
  const { editMode, setEditMode } = useCompanyEditContext()
  const { accountId } = useCompanyContext()
  const [isEditPendingRequestOpen, setIsEditPendingRequestOpen] =
    useState(false)
  const [pendingRequestId, setPendingRequestId] = useState('')

  const allowedRole = useMemo(
    () => ['admin', 'marketing', 'finance', 'under-writing', 'after-sales'],
    [],
  )

  const supabase = createBrowserClient()

  const handleClick = useCallback(async () => {
    const { data } = await supabase
      .from('pending_accounts')
      .select('id')
      .eq('account_id', accountId)
      .eq('is_active', true)
      .eq('is_approved', false)
      .single()

    if (data) {
      setIsEditPendingRequestOpen(true)
      setPendingRequestId(data.id)
    } else {
      setEditMode(true)
    }
  }, [accountId, setEditMode, supabase])

  if (!role || !allowedRole.includes(role)) {
    return null
  }

  return (
    <>
      {!editMode && (
        <Button className="w-full gap-2 md:max-w-xs" onClick={handleClick}>
          <Pencil /> <span> Edit Company Details </span>
        </Button>
      )}
      <EditPendingRequest
        isOpen={isEditPendingRequestOpen}
        onClose={() => setIsEditPendingRequestOpen(false)}
        pendingRequestId={pendingRequestId}
      />
    </>
  )
}

export default CompanyEditButton
