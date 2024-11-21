import Image from 'next/image'
import React from 'react'
// import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useNavigation } from '@/lib/navigations';


function BackButton({color='green-600'}: {color:string}) {
    // const router = 
    const { goBack } = useNavigation()
    // const appRouterInstance: AppRouterInstance = useRouter();


  return (
    <div className="w-full mx-auto laptop:px-0 laptop:bg-transparent desktop:px-0">
    <button
      className={`flex gap-2 h-10 mb-6 bg-${color}}`}
      onClick={goBack} type="button">
      <Image src="/back.svg" width={24} height={24} alt="" className="" />
      {/* <span className={`text-${color === 'green-600' ? 'white' : 'green-600'}`}>Back</span> */}
    </button>
  </div>
  )
}

export default BackButton