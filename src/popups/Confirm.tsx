import React from 'react'

export interface Note {
  status: string,
  message: string,
}
function Confirm({status, message}:Note) {
  return (
  <div className={`absolute right-4 top-20 ${status == "success" ? "bg-green-500" : "bg-red-500"} rounded-lg w-fit px-6 py-2 text-white text-center`}>
    {message}
</div>
  )
}

export default Confirm