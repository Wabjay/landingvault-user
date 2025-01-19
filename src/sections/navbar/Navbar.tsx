"use client";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Logo from "/public/Logo.svg";
import Ham from "/public/hambugger.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Search from "@/components/Search";
import Vault from "/public/Vault icons.svg";
import { store } from "@/store";
import SubmitWebsite from "@/popups/Submit-Website";
import PromoteProduct from "@/popups/Promote-Product";
import Subscribe from "@/popups/Subscribe";
import ConfirmSubscription from "@/popups/Confirm-Subscription";

const getLinkClassName = (path: string, params: string) =>
  params === `/${path}` ? "active-link" : "";

const Navbar = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1023px)" });
  const params = usePathname();
  const [visibility, setVisibility] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const { setSubmitWebsite, setSubscribe, setPromoteProduct, setSearch } =
    store();
  // const [search, setSearch] = useState(''); // To control the search input
  const toggleNavbar = () => setVisibility((prev) => !prev);

  // Helper function to handle link click, clear search, and close modal
  const handleLinkClick = () => {
    setSearch(""); // Clear the search input
    setVisibility(false); // Close the mobile navbar if it's open
    console.log("closed")
  };

    // Helper function to handle link click, clear search, and close modal
    const setConfirmation = (res: boolean) => {
     setConfirm(res)
    };

  return (
    <header className="w-full bg-white dark:!bg-black dark:!text-white  px-4 tablet:px-6 laptop:px-8 xl:px-0 fixed top-0 z-40  border-b-[0.5px] border-b-grey-100 dark:!border-b-grey-500 ">
      <nav className="sticky top-0 z-10 block items-center my-[14px] ">
        <div className="flex gap-16 place-self-center items-center justify-between w-full laptop:max-w-[1152px] mx-auto">
          <Link
            href="/"
            className={`flex items-center h-fit  w-full max-w-[144px]`}
            onClick={() => {
              setSearch(""); // Clear the search input when the logo is clicked
              setVisibility(false);
            }}
          >
            <Image src={Logo} alt="Logo" width="144" height="36" layout="intrinsic"/>
          </Link>
          {isSmallScreen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6" onClick={toggleNavbar}>
                  <Image
                    src={Ham}
                    alt="Hamburger Icon"
                    width="100"
                    height="100"
                  />
                </div>
              </div>

              {visibility && (
                <div className="fixed top-[60px] left-0 h-full bg-white dark:!bg-black dark:!text-white w-full py-4 px-6 tablet:px-8">
                  <ul className="flex flex-col font-medium gap-8">
                    <li>
                      <Link
                        href="/"
                        className={`${getLinkClassName("", params)} text-14 text-grey-600 dark:!text-white`}
                        onClick={handleLinkClick}
                      >
                        Landing Pages
                      </Link>
                    </li>
                    <Search />
                    <li
                      className="cursor-pointer flex gap-x-1 mr-4 font-medium text-14 text-grey-600 dark:!text-white"
                      onClick={() => {
                        setPromoteProduct(true);
                        handleLinkClick()
                        setSearch(""); // Clear the search input
                      }}
                    >
                      <Image src={Vault} alt="sponsor icon" width={20} height={20} /> Become
                      a Sponsor
                    </li>
                    <li className="w-fit px-3 py-2 bg-white shadow-shareLinks border text-grey-800 rounded-lg">
                      <p
                        className={
                          "cursor-pointer font-medium text-14  text-grey-800"
                        }
                        onClick={() => {
                          setSubscribe(true);
                          handleLinkClick()
                          setSearch(""); // Clear the search input
                        }}
                      >
                        Subscribe
                      </p>
                    </li>
                    <li className="w-fit px-6 py-2 border-blue-400 border shadow-supportButton bg-blueBg bg-blue-200 hover:bg-blue-500 rounded-lg">
                      <p
                        className={
                          "cursor-pointer font-medium text-14 text-white"
                        }
                        onClick={() => {
                          setSubmitWebsite(true);
                          handleLinkClick()
                          setSearch(""); // Clear the search input
                        }}
                      >
                        Submit your website
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : 
            <div className="text-14 flex w-fit font-medium flex-row items-center gap-6 desktop:gap-[26px]">
              <li>
                <Link
                  href="/"
                  className={`${getLinkClassName("", params)} whitespace-nowrap text-grey-600 dark:!text-white`}
                  onClick={handleLinkClick}
                >
                  Landing Pages
                </Link>
              </li>
              <Search />
              <ul className="whitespace-nowrap flex w-fit font-medium flex-row items-center gap-4">
                <li
                  className="cursor-pointer px-3 py-2 flex items-center gap-x-1 text-grey-600 dark:!text-white mr-3"
                  onClick={() => {
                    setPromoteProduct(true);
                    setSearch(""); // Clear the search input
                  }}
                >
                  <Image src={Vault} alt="sponsor icon" width={20} height={20} /> Become a
                  Sponsor
                </li>
                <li className="px-3 py-2 h-9 bg-white hover:bg-grey-10 shadow-shareLinks border border-grey-50 rounded-lg">
                  <p
                    className={
                      "cursor-pointer font-medium text-14 text-grey-800"
                    }
                    onClick={() => {
                      setSubscribe(true);
                      setSearch(""); // Clear the search input
                    }}
                  >
                    Subscribe
                  </p>
                </li>
                <li className="px-3 py-2 h-9 border-blue-400 border shadow-supportButton bg-blue-200 bg-blueBg hover:bg-blue-500 rounded-lg">
                  <p
                    className={"cursor-pointer font-medium text-14 text-white"}
                    onClick={() => {
                      setSubmitWebsite(true);
                      setSearch(""); // Clear the search input
                    }}
                  >
                    Submit your website
                  </p>
                </li>
              </ul>
            </div>
          }
        </div>
      </nav>
      <SubmitWebsite />
      <PromoteProduct />
      <Subscribe setConfirmation={setConfirmation}/>
      <ConfirmSubscription setConfirm={setConfirmation} confirm={confirm} />
    </header>
  );
};

export default Navbar;
