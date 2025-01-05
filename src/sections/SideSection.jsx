import React from "react";
import moment from "moment";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";
import Image from "next/image";


const SideSection = ({ page }) => {


  console.log(page)
  // Delete pitch handler

  // Conditional rendering for page data
  if (!page) return <Skeleton>Loading...</Skeleton>;

  return (
    <div className="laptop:sticky laptop:top-[66px] py-6 bg-white laptop:h-inherit laptop:mt-[-66px] mb-10 laptop:mb-0 w-full laptop:max-w-[500px] pb-4 px-4 tablet:px-6 laptop:px-10 sidesection__top laptop:pb-[100px] bigScreen:max-w-[700px] bigScreen:pr-[136px]">
      <h1 className="text-24 text-grey-800 font-semibold mb-2">
        <Skeleton>{page?.brandName}</Skeleton>
      </h1>
      <h2 className="text-[14px] text-grey-600 mb-6">
        <Skeleton>{page?.brandDescription}</Skeleton>
      </h2>

      <div className="flex flex-col gap-4 p-4 bg-grey-10 border border-grey-50 rounded-xl mb-10">
        <p className="w-full text-grey-600 grid grid-cols-5 text-14 gap-y-4 font-normal">
          <Skeleton>
            <span className="col-span-2 text-grey-600">Industry</span>
            <span className="col-span-3 text-grey-800 capitalize">{page?.industry.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Component Type</span>
            <span className="col-span-3 text-grey-800 capitalize">{page?.componentType.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Stack</span>
           <span className="col-span-3 text-grey-800 capitalize"> {page?.stacks.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Type</span>
            <span className="col-span-3 text-grey-800 capitalize">{page?.type.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Style</span>
            <span className="col-span-3 text-grey-800 capitalize">{page?.style.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Mode</span>
            <span className="col-span-3 text-grey-800 capitalize">{page?.mode}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Date</span>
            <span className="col-span-3 text-grey-800 capitalize">{moment(page?.createdAt).format("LL")}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Font</span>
            <span className="col-span-3 text-grey-800 capitalize">{page?.font?.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Color Palette</span>
            <span className="col-span-3 ml-6 text-grey-800">

  <span className="col-span-3 ml-[-8px] text-grey-800">
  {page?.colorPalette.map((color, index) => (
    <span
      key={index}
      className="relative group ml-[-16px] w-6 h-6 rounded-full inline-block mr-2"
      style={{ backgroundColor: `#${color}` }}
    >
      {/* Tooltip */}
      <span
      style={{ backgroundColor: `#${color}` }}
        className="uppercase absolute left-1/2 transform -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        #{color}
      </span>
    </span>
  ))}
</span>

</span>          </Skeleton>
        </p>
      </div>
<Link rel="noreferrer" target="_blank" href={page?.websiteUrl} >
      <div className="px-3 py-2 flex items-center justify-center border-blue-400 border shadow-supportButton bg-blue-200 bg-blueBg hover:bg-blue-500  rounded-lg text-center font-medium  text-white">
      
      View Website
      <Image src="/arrow-button.svg" width={24} height={24} alt="" className="" />

     
    </div> </Link>
    </div>
  );
};

export default SideSection;
