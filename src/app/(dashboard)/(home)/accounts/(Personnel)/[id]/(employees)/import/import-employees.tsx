'use client'
import importFields from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/import/fields'
import parseDate from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/import/parseDate'
import parseRow from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/import/parseRow'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ReactSpreadsheetImport } from 'react-spreadsheet-import'

interface ImportEmployeesProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
const ImportEmployees = ({ isOpen, setIsOpen }: ImportEmployeesProps) => {
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <ReactSpreadsheetImport
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={onSubmit}
        fields={importFields}
        rowHook={parseRow}
        uploadStepHook={parseDate}
      />
    </>
  )
}

export default ImportEmployees
