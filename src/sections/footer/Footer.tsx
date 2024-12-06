"use client";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { store } from "@/store";

// Define the type for FooterLink props
interface FooterLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  target?: "_blank" | "normal";
}

// Reusable Link Component
const FooterLink = ({ href, onClick, children, target="normal" }: FooterLinkProps) => {
  return (
    <Link
      href={href}
      className="text-sm font-normal laptop:text-[16px] leading-[22px]"
      onClick={onClick}
      target= {target}
    >
      {children}
    </Link>
  );
};

const Footer = () => {
  const { setSubmitWebsite, setPromoteProduct, setSearch } = store();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1023px)" });

  const handleLinkClick = () => {
    setSearch(""); // Clear search when any link is clicked
  };

  return (
    <div className="w-full bg-blue-900" id="footer">
      <div className="w-full mx-auto bg-footer-bg bg-contain bg-center laptop:max-w-[1300px] px-4 tablet:px-6 laptop:px-8 xl:px-0">
        <div className="text-white w-full laptop:max-w-[1152px] mx-auto py-[40px] tablet:py-[80px] laptop:py-[100px]">
          <div className="flex flex-col gap-6 laptop:flex-row laptop:justify-between">
            <div>
              <Link
                href="/"
                className={`flex relative items-center w-full  h-10 max-w-[209px] ${
                  isSmallScreen ? "mr-0" : "mr-3"
                }`}
              >
                <Image
                  className="h-10 w-[209px]"
                  src="/footer-logo.png"
                  fill
                  alt="Landingvault Logo"
                />
              </Link>
              <h2 className="w-full max-w-[388px] text-16 mt-4 text-grey-100">
                Landing Vault is a place for finding high-quality design
                inspiration for your designs.
              </h2>
            </div>

            <div className="flex flex-col laptop:flex-row gap-4 laptop:gap-16">
              <div className="flex flex-col gap-3 desktop:gap-4">
                <h5 className="text-16 text-grey-200 mb-2">COMPONENTS</h5>
                <FooterLink href="/" onClick={handleLinkClick}>
                  Landing page
                </FooterLink>
                <FooterLink href="/" onClick={handleLinkClick}>
                  Features
                </FooterLink>
                <FooterLink href="/" onClick={handleLinkClick}>
                  Pricing
                </FooterLink>
                <FooterLink href="/contact-us" onClick={handleLinkClick}>
                  Contact us
                </FooterLink>
                <FooterLink href="/" onClick={handleLinkClick}>
                  Testimonials
                </FooterLink>
              </div>

              <div className="flex flex-col gap-3 desktop:gap-4">
                <h5 className="text-16 text-grey-200 mb-2">PRODUCTS</h5>
                <FooterLink href="/" onClick={handleLinkClick}>
                  Templates
                </FooterLink>
                <FooterLink href="/about-us" onClick={handleLinkClick}>
                  About Us
                </FooterLink>
                <FooterLink href="/" onClick={handleLinkClick}>
                  Become a sponsor
                </FooterLink>
                <p
                  onClick={() => {
                    setPromoteProduct(true);
                    handleLinkClick();
                  }}
                  className="cursor-pointer text-sm font-normal laptop:text-[16px] leading-[22px]"
                >
                  Subscribe
                </p>
                <p
                  onClick={() => {
                    setSubmitWebsite(true);
                    handleLinkClick();
                  }}
                  className="cursor-pointer text-sm font-normal laptop:text-[16px] leading-[22px]"
                >
                  Submit your website
                </p>
              </div>

              <div className="flex flex-col gap-3 desktop:gap-4">
                <h5 className="text-16 text-grey-200 mb-2">OTHER PRODUCTS</h5>
                <FooterLink
                  href="https://www.pixelgumstudio.com"
                  onClick={handleLinkClick}
                  target="_blank"
                >
                  Pixelgumstudio
                </FooterLink>
                <FooterLink
                  href="https://www.pitchdeck.design"
                  onClick={handleLinkClick}
                  target="_blank"
                >
                  Pitch Deck Design
                </FooterLink>
                <FooterLink
                  href="https://www.indieniche.substack.com"
                  onClick={handleLinkClick}
                  target="_blank"
                >
                  Indieniche News letter
                </FooterLink>
                <FooterLink
                  href="https://www.pixelfounder.substack.com"
                  onClick={handleLinkClick}
                  target="_blank"
                >
                  Pixelfounder News letter 
                </FooterLink>
                <FooterLink
                  href="https://www.wordiebox.com"
                  onClick={handleLinkClick}
                  target="_blank"
                >
                  Wordiebox
                </FooterLink>
               
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
