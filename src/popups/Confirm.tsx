import React from 'react'

export interface Note {
  status: string,
  message: string,
}
function Confirm({status, message}:Note) {
  return (
  <div className={`absolute right-4 top-20 ${status == "success" ? "bg-green-500" : "bg-red-500"} rounded-lg w-fit px-6 py-2 text-white`}>
    <p className='text-16 font-semibold mb-2'>{status}</p>
    <p className='text-16 font-normal mr-4'>{message}</p>
</div>
  )
}

export default Confirm