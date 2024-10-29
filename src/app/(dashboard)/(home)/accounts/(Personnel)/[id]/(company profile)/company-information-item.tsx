const CompanyInformationItem = ({
  label,
  value,
}: {
  label: string
  value?: string | undefined
}) => (
  <div className="flex flex-col py-1">
    <div className="text-sm font-medium text-muted-foreground">{label}</div>
    <div className="text-md text-pretty break-words font-semibold">
      {value || '-'}
    </div>
  </div>
)

export default CompanyInformationItem
