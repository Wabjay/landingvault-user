"use client";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { store } from "@/store";

const Footer = () => {
  const {setSubmitWebsite, setPromoteProduct} = store()


  const isSmallScreen = useMediaQuery({ query: "(max-width: 1023px)" });
  return (
    <div className="w-full  bg-blue-900 " id="footer">
      <div className="w-full mx-auto bg-footer-bg bg-contain bg-center laptop:max-w-[1300px] px-4 tablet:px-6 laptop:px-8 xl:px-0">
        <div className="text-white w-full laptop:max-w-[1152px] mx-auto py-[40px] tablet:py-[80px] laptop:py-[100px]">
          <div className="flex flex-col gap-6 laptop:flex-row laptop:justify-between">
            <div>
            <Link
              href="/"
              className={`flex relative items-center w-full  h-10 ${
                isSmallScreen ? "max-w-[140px] mr-0" : " max-w-[180px] mr-3"
              } `}
            >
              <Image
                className="h-9 w-fit"
                src="/footer-logo.svg"
                fill
                alt="Domainslug Logo"
              />
            </Link>
            <h2 className="w-full max-w-[388px] text-16 mt-4 text-grey-100">
              Landing Vault is a place for finding high-quality design
              inspiration for your designs.
            </h2>
            </div>
            <div className="flex flex-col laptop:flex-row gap-4 laptop:gap-10">
            <div className='flex flex-col gap-3 desktop:gap-4'>
            <h2 className='text-16 text-grey-200  mb-2'>COMPONENTS</h2>
            <Link  href='/' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Landing page</Link>
            <Link  href='/' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Features</Link>
            <Link  href='/' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Pricing</Link>
            <Link  href='/contact-us' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Contact us</Link>
            <Link  href='/' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Testimonials</Link>
          </div>
          <div className='flex flex-col gap-3 desktop:gap-4'>
          <h2 className='text-16 text-grey-200  mb-2'>PRODUCTS</h2>
          <Link  href='/' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Templates</Link>
            <Link  href='/about-us' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>About Us</Link>
            <Link  href='/' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Become a sponsor</Link>
            <p onClick={()=>setPromoteProduct(true)} className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Subscribe</p>
            <p  onClick={()=>setSubmitWebsite(true)} className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Submit your website</p>
          </div>
          <div className='flex flex-col gap-3 desktop:gap-4'>
          <h2 className='text-16 text-grey-200  mb-2'>FREE TOOLS</h2>
          <Link target="_blank"  href='https://www.wordiebox.com/word-of-the-day' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Word of the day</Link>
          <Link target="_blank"  href='https://www.wordiebox.com/capitalization-tool' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Capitalise my title</Link>
          <Link target="_blank"  href='https://www.wordiebox.com/morse-code-translator' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Morse code generator</Link>
          <Link target="_blank"  href='https://www.wordiebox.com/character-counter' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Character counter</Link>
          <Link target="_blank"  href='https://www.wordiebox.com/word-counter' className='text-sm font-normal laptop:text-[16px] leading-[22px]'>Word counter</Link>
          </div>
             
            </div>
          </div>
          <p className="text-16 text-200 mt-20">Landingvault @ 2024. All rights reserved.</p>
        </div>
        <Image
          src="/footer-bg.svg"
          width={100}
          height={100}
          className="w-full"
          alt="LandingVault Logo"
        />
      </div>
    </div>
  );
};

export default Footer;
