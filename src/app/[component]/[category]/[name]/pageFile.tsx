"use client";
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
import BackButton from "@/components/BackButton";
import LoadImage from "@/components/LoadImage";
import SideSection from "@/sections/SideSection";
// import { store } from "@/store";
import { usePathname } from "next/navigation";
import Skeleton from "@/components/Skeleton";
import ISRFetcher from "@/lib/ISRFetcher";
import { PagesResponse } from "../../../../../types";
import SinglePageFallBack from "@/components/FallBack/SinglePageFallback";
import ErrorFallback from "@/components/FallBack/ErrorFallBack";

const SinglePage = () => {
  // const {hydrated, fetchSinglePage, page: pageData } = store();
  // const pathname = usePathname();

  // useEffect(() => {
  //   const pageName = pathname.split("/")[3]?.toLowerCase(); 
  //   console.log(pageName)// Ensure page name is in lowercase for matching
  //   if (hydrated) {
  //     fetchSinglePage(pageName);  // Fetch the page data based on the page name
  //   }
  // }, [fetchSinglePage, pathname, hydrated]);
  const pathname = usePathname();
  const pageName = pathname.split("/")[3]?.toLowerCase(); // Extract page name from URL

  if (!pageName) {
    return <div>Error: Page name is missing in the URL.</div>;
  }

  

console.log(pathname)
  return (
    <div className="w-full">
    <div className="bg-[#FFF]">
      <div className="w-full laptop:max-w-[1152px] desktop:max-w-full mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14 desktop:gap-24">
        <div className="">
          <div className="w-full laptop:max-w-[1152px] mx-auto px-4 tablet:px-6 laptop:px-0 desktop:px-0 bg-white">
            <BackButton color={""} />
            <ISRFetcher<PagesResponse>
          url={`page/name/${pageName}`}
          fallback={<SinglePageFallBack/>}
          errorFallback={<ErrorFallback />}
          render={(page) => (
            <div className="laptop:flex laptop:gap-6 desktop:gap-8 laptop:justify-between">
              <SideSection page={page?.data[0]} />
              <div className=" order-first w-full">
                <div className="mx-auto ">
                  <Skeleton width={'w-full'} height={'90vh'}>
                  <div className="flex flex-col gap-8 laptop:w-fit">
                    <LoadImage
                        alt={page?.data[0].brandName || "Page Image"}
                        src={page?.data[0].pageImage || "/path/to/placeholder.jpg"}
                        style="w-full h-full laptop:w-[640px]" height={undefined}                    />
                  </div>
                  </Skeleton>
                </div>
              </div>
            </div>
             )}
             />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SinglePage;

