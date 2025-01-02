"use client"
import LoadImage from "@/components/LoadImage"
import Confirm, { Note } from "@/popups/Confirm"
import axios from "axios"
import { useEffect, useState } from "react"

const Hero = ({component}:{component: string}) => {  
const [email, setEmail] = useState<string>("")
const [typing, setTyping] = useState(false)
const [pageName, setPageName] = useState<string>("")
const [confirm, setConfirm] = useState<boolean>(false);
const [notification, setNotification] = useState<Note>({status:"", message:""});


const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const showNotification =(status:string,message:string )=>{
  setNotification({status: status, message: message})
  setConfirm(true);
  setTimeout(() => setConfirm(false), 3000);
}

const sendEmail =  async (): Promise<void> => {
  console.log(email)
  if (!email || !emailPattern.test(email)) {
    console.error("Invalid email address");
    return;
  }
    try {
        await axios.post(
          "/api/subscribe",
          { email: email },
          { headers: { "Content-Type": "application/json" } }
        );
        setEmail("");
        showNotification("success", 'Subscribed')
      } catch (error) {
        console.error("Error submitting form:", error);
        showNotification("error", 'Error Subscribing')
      }
    };


useEffect(()=>{
  const pageName = component.replace(/[-/]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
setPageName(pageName)
},[component])

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
  <div className="laptop:h-full flex flex-col gap-6 text-left laptop:col-span-4">
    <h1 className="text-black font-semibold text-24 tablet:text-40 laptop:text-48 desktop:text-60">
    The Best <span>{pageName}</span> Page Design Inspiration 
    </h1>
    <p className="text-grey-500 text-16 tablet:text-20 laptop:text-24 laptop:leading-9">
    Explore top <span>{pageName}</span> design inspiration  on Landingvault. Get inspired with curated, high-quality <span>{pageName}</span> examples.
    </p>
  </div>

  {/* Subscription Box */}
  <div className="relative flex flex-col w-full laptop:col-span-3">
  
    <LoadImage alt="Hero" src="/subscribe.png" style=" ml-[10%] !w-fit" height={undefined} />
    <LoadImage alt="Hero" src="/pointer.png" style="animate-bounce overflow-visible ml-[12%] h-[59px] !w-auto" height={undefined} />
    <p className="text-grey-500 text-16 mb-4">
      Get weekly design inspiration sent to your email <br />
      every week
    </p>

    <div className={`border bg-white rounded-xl h-11 flex gap-2 tablet:gap-0 tablet:flex-row justify-between items-center pl-3 pr-2 ${typing
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
        className="w-full h-5 outline-none border-none bg-transparent placeholder-grey-300"
      />
      <button
        onClick={sendEmail}
        className="bg-grey-900 hover:bg-grey-800 py-[6px] w-fit px-3 rounded-lg shadow-supportButton text-white text-14 leading-5 border font-medium whitespace-nowrap ml-1"
      >
        Send me Inspiration
      </button>
    </div>

    {/* Email validation error message */}
    {(email.length > 5 && !emailPattern.test(email)) && (
      <p className="text-red-500 text-12 mt-2">
        Please enter a valid email address
      </p>
    )}
  </div>
</div>

      </div>
      {confirm && <Confirm status={notification.status} message={notification.message}/>}

      </div>)
  }
  
  export default Hero