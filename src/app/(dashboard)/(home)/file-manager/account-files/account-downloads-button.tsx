import React from 'react'
import { Button } from '@/components/ui/button'

const AccountDownloadsButton = () => {
  return (
    <>
      <Button className="w-full">Export File</Button>
      <Button variant="outline" className="w-full">
        Cancel
      </Button>
    </>
  )
}

export default AccountDownloadsButton
