import React from "react";
import moment from "moment";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";


const SideSection = ({ page }) => {


  console.log(page)
  // Delete pitch handler

  // Conditional rendering for page data
  if (!page) return <Skeleton>Loading...</Skeleton>;

  return (
    <div className="laptop:sticky laptop:top-[80px] py-6 text-[#2E2E27] bg-white laptop:h-fit laptop:mt-[-34px] mb-10 w-full laptop:max-w-[400px] pb-4 laptop:pb-[100px]">
      <h1 className="text-24 font-bold mb-2">
        <Skeleton>{page?.brandName}</Skeleton>
      </h1>
      <p className="text-[16px] leading-6 mb-6">
        <Skeleton>{page?.brandDescription}</Skeleton>
      </p>

      <div className="flex flex-col gap-4 p-4 bg-grey-50 border border-grey-10 rounded-xl mb-10">
        <p className="w-full text-grey-600 grid grid-cols-5 text-14 gap-y-4 font-normal">
          <Skeleton>
            <span className="col-span-2 text-grey-600">Industry</span>
            <span className="col-span-2 text-grey-800 capitalize">{page?.industry.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Component Type</span>
            <span className="col-span-3 text-grey-800 capitalize">{page?.componentType.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Stack</span>
           <span className="col-span-2 text-grey-800 capitalize"> {page?.stacks.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Type</span>
            <span className="col-span-2 text-grey-800 capitalize">{page?.type.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Style</span>
            <span className="col-span-2 text-grey-800 capitalize">{page?.style.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Mode</span>
            <span className="col-span-2 text-grey-800 capitalize">{page?.mode}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Date</span>
            <span className="col-span-2 text-grey-800 capitalize">{moment(page?.date).format("LL")}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Font</span>
            <span className="col-span-2 text-grey-800 capitalize">{page?.font?.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Color Palette</span>
            <span className="col-span-2 text-grey-800">{page?.colorPalette.join(', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Website Link</span>
            <span className="col-span-2 text-grey-800">
              <a href={page?.websiteUrl} target="_blank" rel="noopener noreferrer">
                {page?.websiteUrl}
              </a>
            </span>
          </Skeleton>
        </p>
      </div>

      <div className="px-3 py-2 text-center bg-blue-800 text-white rounded-lg">
      <Link href="/make-deck" >
      View Website
      </Link>
    </div>
    </div>
  );
};

export default SideSection;
