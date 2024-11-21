"use client"
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Logo from '/public/Logo.svg';
import Ham from '/public/hambugger.svg';
import { usePathname } from "next/navigation";
import Link from "next/link";
// import MobileNavbar from "./MobileNavbar";
// import DesktopNavbar from "./DesktopNavbar";
import Image from "next/image";
import Search from "@/components/Search";
import Vault from '/public/Vault icons.svg';
import { store } from "@/store";
import SubmitWebsite from "@/popups/Submit-Website";
import PromoteProduct from "@/popups/Promote-Product";


const getLinkClassName = (path: string, params: string) =>
  params === `/${path}` ? "active-link" : "";

const Navbar = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1023px)" });
  const params = usePathname();
  const [visibility, setVisibility] = useState<boolean>(false);
const {setSubmitWebsite, setPromoteProduct} = store()
  const toggleNavbar = () => setVisibility((prev) => !prev);

  // useEffect(() => {
  //   console.log(pages)
  // },[pages])
  

  return (
    <header className="w-full bg-white px-4 tablet:px-6 laptop:px-8 xl:px-0 fixed top-0 z-40  border-b border-b-grey-700">
      <nav className="sticky top-0 z-10 block items-center h-[40px] my-[10px] ">
        <div className="flex flex-wrap place-self-center items-center justify-between w-full laptop:max-w-[1152px] mx-auto">
          <Link
            href="/"
            className={`flex items-center  h-[37px]`}
            onClick={() => setVisibility(false)}
          >
            <Image src={Logo} alt="Logo" width="100" height="37" />
          </Link>

          {isSmallScreen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6" onClick={toggleNavbar}>
                  <Image src={Ham} alt="Hamburger Icon" width="100" height="100" />
                </div>
              </div>

              {visibility && (
                <div className="fixed top-[60px] left-0 h-full bg-white w-full py-4 px-6 tablet:px-8">
                <ul className="flex flex-col font-medium gap-8">
                  <li>
                    <Link href="/" className={getLinkClassName("pitchdecks", params)}>
                    Landing Pages
                    </Link>
                  </li>
                <Search />
                <li className="flex gap-x-1 mr-4">
                          <Image src={Vault} alt="" width={20} height={20} /> Become a Sponsor
                          <Link href="/" className={`${getLinkClassName("template", params)}`}>
                          </Link>
                        </li>
                        <li className="px-3 py-2 bg-white border text-black rounded-lg">
                          <p className={'cursor-pointer'} onClick={()=>setPromoteProduct(true)}>
                          Subscribe
                          </p>
                        </li>
                        <li className="px-3 py-2 bg-blue-800 text-white rounded-lg">
                          <p className={'cursor-pointer'} onClick={()=>setSubmitWebsite(true)}>
                          Submit your website
                          </p>
                        </li>
                </ul>
              </div>
              )}
            </>
          ) : (
            <ul className="whitespace-nowrap text-14 flex w-fit font-medium flex-row items-center gap-6 desktop:gap-10">
            <li className="">
              <Link href="/" className={getLinkClassName("", params)}>
              Landing Pages
              </Link>
            </li>
        <Search />
        <ul className="whitespace-nowrap flex w-fit font-medium flex-row items-center gap-4">
           
            <li className="flex gap-x-1 mr-4">
              <Image src={Vault} alt="" width={20} height={20} /> Become a Sponsor
              <Link href="/template" className={`${getLinkClassName("template", params)}`}>
              </Link>
            </li>
            <li className="px-3 py-2 bg-white border text-black rounded-lg">
              <p className={'cursor-pointer'} onClick={()=>setPromoteProduct(true)}>
              Subscribe
              </p>
            </li>
            <li className="px-3 py-2 bg-blue-800 text-white rounded-lg">
              <p className={'cursor-pointer'} onClick={()=>setSubmitWebsite(true)}>
              Submit your website
              </p>
            </li>
        
            </ul>
          </ul>
          )}
        </div>
      </nav>
      <SubmitWebsite />
      <PromoteProduct />
    </header>
  );
};

export default Navbar;
