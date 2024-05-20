import { ReactNode } from 'react'

const PageHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col bg-card px-6 py-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      {children}
    </div>
  )
}

const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-3xl font-extrabold text-card-foreground">{children}</h1>
  )
}

const PageDescription = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm font-medium text-muted-foreground">{children}</p>
}

export { PageHeader, PageTitle, PageDescription }
