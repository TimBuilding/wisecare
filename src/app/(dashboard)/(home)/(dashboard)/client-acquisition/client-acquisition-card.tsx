import ClientAcquisitionChart from '@/app/(dashboard)/(home)/(dashboard)/client-acquisition/client-acquisition-chart'

const ClientAcquisitionCard = () => {
  return (
    <div className="rounded-2xl bg-navigation shadow-md md:col-span-2 ">
      <div className="flex flex-col pl-10 pr-5 pt-10">
        <h3 className="text-xl font-semibold text-white md:text-2xl">
          Accounts Acquisition
        </h3>
        <span className="text-sm font-medium text-navigation-foreground">
          Number of new accounts (last 12 months)
        </span>
      </div>
      <div className="pt-4">
        <ClientAcquisitionChart />
      </div>
    </div>
  )
}

export default ClientAcquisitionCard
