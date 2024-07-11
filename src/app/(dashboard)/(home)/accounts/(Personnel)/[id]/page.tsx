import React from 'react'
import InitialsAvatar from 'react-initials-avatar'

const Page = () => {
  return (
    <div className="flex w-full flex-col bg-background ">
      <div className="h-40 w-full bg-slate-400 object-cover xl:h-80 ">
        <div className="mx-auto flex h-32 w-32 translate-y-24 flex-col items-center justify-between rounded-full bg-sky-950 ring-4 ring-background xl:ml-10  xl:translate-y-64 ">
          <InitialsAvatar
            name="Tamara Company"
            className="translate-y-10 text-center text-5xl text-white "
          />
        </div>
      </div>
    </div>
  )
}

export default Page
