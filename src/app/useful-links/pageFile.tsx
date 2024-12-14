"use client";

import { websiteLinks } from "@/app/useful-links/links";
import LinkCard from "./linksCard";

const PageFile = () => {

  
  return (
    <div className="w-full bg-[#FFFFFF] py-[50px] tablet:py-[80px] laptop:py-[100px]">
      <div className="relative px-4 tablet:px-6 laptop:px-8 desktop:px-0 max-w-[1152px] mx-auto text-left mb-8">
        <div className="relative w-full laptop:max-w-[1021px]">
          <h2 className="text-24 laptop:text-48 font-semibold mb-4 text-[#1c1c1c]">
            Useful Links
          </h2>
          <p className="text-[#484848] text-16 tablet:text-24 tablet:leading-9 text-left mb-6 tablet:mb-10">
            Some of the links that might be useful for companies
          </p>
        </div>

        <div className="w-fit mx-auto">
        <div className="flex flex-wrap gap-8 justify-start">
{websiteLinks.map(website => <LinkCard key={website.title} image={website.image} url={website.url} title={website.title}/>)}
        </div>
        </div>
      </div>
    </div>
  );
};

export default PageFile;
