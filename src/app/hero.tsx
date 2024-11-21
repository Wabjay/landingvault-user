"use client"
import LoadImage from "@/components/LoadImage"
import { useState } from "react"

const Hero = () => {  
const [email, setEmail] = useState<string>("")


const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const sendEmail =()=>{
  if(emailPattern.test(email)){
    console.log(email)
  }
  
}

  return (
      <div className='w-full' id='hero'>
        <div className='w-full laptop:max-w-[1152px] px-4 tablet:px-6 laptop:px-8 desktop:px-0 mx-auto py-12'>
        <div className="grid laptop:grid-cols-7 items-center justify-between gap-8">
  {/* Main Content (Text Block) */}
  <div className="text-left max-w-xl laptop:col-span-4">
    <h1 className="text-black font-bold text-32 tablet:text-48 laptop:text-54 mb-6">
      The best Landing Page Design inspiration
    </h1>
    <p className="text-gray-500 mb-10 text-24">
      Explore top landing page design inspiration on Landingvault. Get inspired with curated, high-quality landing page examples.
    </p>
  </div>

  {/* Subscription Box */}
  <div className="relative flex flex-col gap-4 w-full laptop:col-span-3">
  
    <LoadImage alt="Hero" src="/subscribe.png" style="mx-auto !w-auto" />
    <LoadImage alt="Hero" src="/pointer.png" style="animate-bounce mx-auto !w-auto" />
    <p className="text-gray-500 mb-2 text-16">
      Get weekly design inspiration sent to your email <br />
      every week
    </p>

    <div className="border border-gray-50 shadow-shareLinks rounded-xl flex justify-between px-3 py-2">
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full outline-none border-none placeholder-gray-300"
      />
      <button
        onClick={sendEmail}
        className="bg-gray-900 py-[6px] px-2 rounded-lg shadow-shareLinks text-white text-14 font-medium whitespace-nowrap ml-1"
      >
        Send me Inspiration
      </button>
    </div>

    {/* Email validation error message */}
    {(email.length > 5 && !emailPattern.test(email)) && (
      <p className="text-red-500 text-12 mt-[-8px]">
        Please enter a valid email address
      </p>
    )}
  </div>
</div>

      </div>
      </div>)
  }
  
  export default Hero