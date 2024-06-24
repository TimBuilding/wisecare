const PreviousStatement = () => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-card p-6 shadow-md">
      <div className="flex flex-col">
        <span className="font-medium tracking-normal">Previous Statement</span>
        <span className="text-xs font-medium text-green-500">
          Paid on June 9, 2024
        </span>
      </div>
      <div className="grid grid-cols-3 py-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground/75">
            Card Limit
          </span>
          <span className="text-2xl font-medium text-card-foreground">
            $34,500.00
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground/75">
            Card Limit
          </span>
          <span className="text-2xl font-medium text-card-foreground">
            $34,500.00
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground/75">
            Card Limit
          </span>
          <span className="text-2xl font-medium text-card-foreground">
            $34,500.00
          </span>
        </div>
      </div>
    </div>
  )
}

export default PreviousStatement
