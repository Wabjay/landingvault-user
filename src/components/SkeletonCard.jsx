import React from 'react'
import LoadImage from './LoadImage'
import Skeleton from './Skeleton'

function SkeletonCard() {
  return (
    <div className={`flex flex-col h-full  border border-[#D2D2CF] hover:border-[#21AB68]  `}>
        <LoadImage
          alt="Pitch deck"
          effect="blur"
          src=""
          height={240}
          style={`w-full h-[240px]`}
        />
        <div className='p-3 laptop:p-[14px] desktop:p-4 bg-white'>
          <div className='flex justify-between mb-1'>
            <Skeleton height={20}>
            </Skeleton>
          </div>

          <p className='text-12 font-normal text-[#2E2E27] P-3 flex'>
            <Skeleton  height={20}></Skeleton>
            <Skeleton height={20} ></Skeleton>
          </p>
        </div>
      </div>
  )
}

export default SkeletonCard