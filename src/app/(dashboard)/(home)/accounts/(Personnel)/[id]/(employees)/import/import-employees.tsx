'use client'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import importFields from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/import/fields'
import parseDate from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/import/parseDate'
import parseRow from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/import/parseRow'
import themeOverrides from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/import/themeOverrides'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { ReactSpreadsheetImport } from 'react-spreadsheet-import'
import { Result } from 'react-spreadsheet-import/types/types'
import { v4 as uuidv4 } from 'uuid'

interface ImportEmployeesProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ImportEmployees = ({ isOpen, setIsOpen }: ImportEmployeesProps) => {
  const supabase = createBrowserClient()
  const { toast } = useToast()
  const { accountId } = useCompanyContext()

  const { mutateAsync } = useInsertMutation(
    // @ts-ignore
    supabase.from('pending_company_employees'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          title: 'Employees imported successfully',
          description: 'Employees are now pending approval',
        })
      },
      onError: () => {
        toast({
          title: 'Error importing employees',
          description: 'Please try again',
        })
      },
    },
  )

  const handleSubmit = async (data: Result<any>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('User not found')

    const batchId = uuidv4()
    const employees = data.validData.map((employee) => ({
      account_id: accountId,
      first_name: employee.first_name,
      last_name: employee.last_name,
      birth_date: employee.birth_date,
      gender: employee.gender,
      civil_status: employee.civil_status,
      card_number: employee.card_number,
      effective_date: employee.effective_date,
      room_plan: employee.room_plan,
      maximum_benefit_limit: employee.maximum_benefit_limit,
      created_by: user.id,
      operation_type: 'insert',
      batch_id: batchId,
    }))

    await mutateAsync(employees)
  }
  return (
    <ReactSpreadsheetImport
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      fields={importFields}
      rowHook={parseRow}
      uploadStepHook={parseDate}
      customTheme={themeOverrides}
    />
  )
}

export default ImportEmployees
