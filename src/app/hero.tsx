"use client"
import LoadImage from "@/components/LoadImage"
import { useState } from "react"

const Hero = () => {  
const [email, setEmail] = useState<string>("")
const [typing, setTyping] = useState(false)


const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const sendEmail =()=>{
  if(emailPattern.test(email)){
    console.log(email)
  }
  
}

  // Handle focus/typing state
  const handleFocus = () => {
    setTyping(true)
  }

  const handleBlur = () => {
    setTyping(false)
  }

  return (
      <div className='w-full' id='hero'>
        <div className='w-full laptop:max-w-[1152px] px-4 tablet:px-6 laptop:px-8 desktop:px-0 mx-auto'>
        <div className="grid laptop:grid-cols-7 items-center justify-between gap-8">
  {/* Main Content (Text Block) */}
  <div className="laptop:h-full laptop:flex laptop:flex-col laptop:justify-between text-left laptop:col-span-4">
    <h1 className="text-black font-bold text-32 tablet:text-48 laptop:text-60 mb-6">
      The best Landing Page Design inspiration
    </h1>
    <p className="text-grey-500 mb-10 laptop:mb-0 text-24">
      Explore top landing page design inspiration on Landingvault. Get inspired with curated, high-quality landing page examples.
    </p>
  </div>

  {/* Subscription Box */}
  <div className="relative flex flex-col gap-4 w-full laptop:col-span-3">
  
    <LoadImage alt="Hero" src="/subscribe.png" style=" ml-[10%] !w-fit" />
    <LoadImage alt="Hero" src="/pointer.png" style="animate-bounce ml-[12%] h-[59px] !w-auto" />
    <p className="text-grey-500 text-16">
      Get weekly design inspiration sent to your email <br />
      every week
    </p>

    <div className={`border bg-white   rounded-xl h-11 flex justify-between items-center px-3  ${typing
          ? 'border-blue-400 shadow-buttonFocus bg-white hover:bg-white'
          : 'border-grey-50 shadow-buttonDefault hover:bg-grey-10 hover:border-grey-50'}
          `}  onMouseLeave={handleBlur} // Set typing to false on mouseout
          >
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={handleFocus} // Set typing to true on focus
        onBlur={handleBlur} // Set typing to false on blur
        className="w-full outline-none border-none placeholder-grey-300"
      />
      <button
        onClick={sendEmail}
        className="bg-grey-900 py-[6px] px-3 h-8 rounded-lg shadow-supportButton text-white text-14 font-medium whitespace-nowrap ml-1"
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