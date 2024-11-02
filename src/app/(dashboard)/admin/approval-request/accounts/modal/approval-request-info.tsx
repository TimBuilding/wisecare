'use client'
import {
  formatCurrency,
  formatPercentage,
} from '@/app/(dashboard)/(home)/accounts/columns/accounts-columns'
import { useApprovalRequestContext } from '@/app/(dashboard)/admin/approval-request/accounts/approval-request-provider'
import ApprovalInformationItem from '@/app/(dashboard)/admin/approval-request/accounts/modal/approval-information-item'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog'
import { formatDate } from 'date-fns'

const ApprovalRequestInfo = () => {
  const { isModalOpen, setIsModalOpen, selectedData } =
    useApprovalRequestContext()

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>New Account Approval Request</DialogTitle>
          <DialogDescription>
            Created by {(selectedData as any)?.created_by?.first_name}{' '}
            {(selectedData as any)?.created_by?.last_name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-5">
          <div className="col-span-2 flex flex-col gap-y-6">
            {/* Contract Information */}
            <div className="grid grid-cols-1 gap-y-2">
              <span className="font-medium underline underline-offset-2">
                Contract Information
              </span>
              <ApprovalInformationItem
                label="Initial Contract Value"
                value={formatCurrency(selectedData?.initial_contract_value)}
              />
              <ApprovalInformationItem
                label="Initial Head Count"
                value={selectedData?.initial_head_count?.toString()}
              />
              <ApprovalInformationItem
                label="Mode of Payment"
                value={(selectedData as any)?.mode_of_payment?.name}
              />
              <ApprovalInformationItem
                label={'Expiration Date'}
                value={
                  selectedData?.expiration_date
                    ? formatDate(selectedData.expiration_date, 'PP')
                    : 'undefined'
                }
              />
              <ApprovalInformationItem
                label={'Effectivity Date'}
                value={
                  selectedData?.effectivity_date
                    ? formatDate(selectedData.effectivity_date, 'PP')
                    : 'undefined'
                }
              />
              <ApprovalInformationItem
                label={'COC Issue Date'}
                value={
                  selectedData?.coc_issue_date
                    ? formatDate(selectedData.coc_issue_date, 'PP')
                    : 'undefined'
                }
              />
              <ApprovalInformationItem
                label={'Wellness Lecture Date'}
                value={
                  selectedData?.wellness_lecture_date
                    ? formatDate(selectedData.wellness_lecture_date, 'PP')
                    : 'undefined'
                }
              />
              <ApprovalInformationItem
                label={'Annual Physical Examination Date'}
                value={
                  selectedData?.annual_physical_examination_date
                    ? formatDate(
                        selectedData.annual_physical_examination_date,
                        'PP',
                      )
                    : 'undefined'
                }
              />
            </div>

            {/* Account Information */}
            <div className="grid grid-cols-1 gap-y-2">
              <span className="font-medium underline underline-offset-2">
                Account Information
              </span>
              <ApprovalInformationItem
                label={'Account Type'}
                value={(selectedData as any)?.account_type?.name}
              />
              <ApprovalInformationItem
                label={'Agent'}
                value={`${(selectedData as any)?.agent?.first_name} ${
                  (selectedData as any)?.agent?.last_name
                }`}
              />
              <ApprovalInformationItem
                label={'Commission Rate'}
                value={
                  selectedData?.commision_rate !== undefined
                    ? formatPercentage(selectedData.commision_rate)
                    : 'undefined'
                }
              />
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-y-6">
            {/* Company Information */}
            <div className="grid grid-cols-2 gap-y-2">
              <span className="col-span-2 font-medium underline underline-offset-2">
                Company Information
              </span>
              <ApprovalInformationItem
                label={'Company Name'}
                value={(selectedData as any)?.company_name}
              />
              <ApprovalInformationItem
                label={'Company Address'}
                value={(selectedData as any)?.company_address}
              />
              <ApprovalInformationItem
                label={'Nature of Business'}
                value={(selectedData as any)?.nature_of_business}
              />
              <ApprovalInformationItem
                label={'Contact Person'}
                value={(selectedData as any)?.contact_person}
              />
              <ApprovalInformationItem
                label={'Contact Number'}
                value={(selectedData as any)?.contact_number}
              />
              <ApprovalInformationItem
                label={'Signatory Designation'}
                value={(selectedData as any)?.signatory_designation}
              />
              <ApprovalInformationItem
                label={'Name of Signatory'}
                value={(selectedData as any)?.name_of_signatory}
              />
              <ApprovalInformationItem
                label={'Designation of Contact Person'}
                value={(selectedData as any)?.designation_of_contact_person}
              />
              <ApprovalInformationItem
                label={'Email Address of Contact Person'}
                value={(selectedData as any)?.email_address_of_contact_person}
              />
            </div>

            {/* HMO Information */}
            <div className="grid grid-cols-2 gap-y-2">
              <span className="col-span-2 font-medium underline underline-offset-2">
                HMO Information
              </span>

              <ApprovalInformationItem
                label={'HMO Provider'}
                value={(selectedData as any)?.hmo_provider?.name}
              />
              <ApprovalInformationItem
                label={'Previous HMO Provider'}
                value={(selectedData as any)?.previous_hmo_provider?.name}
              />
              <ApprovalInformationItem
                label={'Current HMO Provider'}
                value={(selectedData as any)?.current_hmo_provider?.name}
              />
              <ApprovalInformationItem
                label={'Principal Plan Type'}
                value={(selectedData as any)?.principal_plan_type?.name}
              />
              <ApprovalInformationItem
                label={'Dependent Plan Type'}
                value={(selectedData as any)?.dependent_plan_type?.name}
              />
              <ApprovalInformationItem
                label={'Total Utilization'}
                value={
                  selectedData?.total_utilization
                    ? formatCurrency(selectedData.total_utilization)
                    : 'undefined'
                }
              />
              <ApprovalInformationItem
                label={'Total Premium Paid'}
                value={
                  selectedData?.total_premium_paid
                    ? formatCurrency(selectedData.total_premium_paid)
                    : 'undefined'
                }
              />
              <ApprovalInformationItem
                label={'Additional Benefits'}
                value={(selectedData as any)?.additional_benefits}
              />
              <ApprovalInformationItem
                label={'Special Benefits'}
                value={(selectedData as any)?.special_benefits}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-x-2">
              <Button variant={'destructive'}>Reject</Button>
              <Button variant={'default'}>Approve</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ApprovalRequestInfo
