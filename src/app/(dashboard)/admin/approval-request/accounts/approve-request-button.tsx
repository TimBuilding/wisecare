import { Button } from '@/components/ui/button'
import { FC, ReactNode } from 'react'

interface ApproveRequestButtonProps {
  children: ReactNode
}

const ApproveRequestButton: FC<ApproveRequestButtonProps> = ({ children }) => {
  return <div>{children}</div>
}

export default ApproveRequestButton
