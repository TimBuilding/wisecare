interface Props {
  title: string
  description?: string
}

const PageTitle = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="text-sm font-medium text-muted-foreground/75">
          {description}
        </p>
      )}
    </div>
  )
}

export default PageTitle
