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
      />
    </>
  )
}

export default ImportEmployees
