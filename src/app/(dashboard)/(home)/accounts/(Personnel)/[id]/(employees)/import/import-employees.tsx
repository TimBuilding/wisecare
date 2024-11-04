'use client'
import importFields from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/import/fields'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ReactSpreadsheetImport } from 'react-spreadsheet-import'

const ImportEmployees = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Import</Button>
      <ReactSpreadsheetImport
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={onSubmit}
        fields={importFields}
        rowHook={(data) => {
          // Parse full name
          // Split into first and last name
          if (
            typeof data.full_name === 'string' &&
            data.full_name.includes(' ') &&
            data.full_name.includes(',')
          ) {
            return {
              ...data,
              first_name: data.full_name.split(',')[1],
              last_name: data.full_name.split(',')[0],
            }
          }

          // Parse birth date
          if (typeof data.birth_date === 'string') {
            return {
              ...data,
              birth_date: new Date(data.birth_date).toLocaleDateString(
                'en-PH',
                {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                },
              ),
            }
          }

          // Parse effective date
          if (typeof data.effective_date === 'string') {
            return {
              ...data,
              effective_date: new Date(data.effective_date).toLocaleDateString(
                'en-PH',
                {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                },
              ),
            }
          }
          return data
        }}
      />
    </>
  )
}

export default ImportEmployees
