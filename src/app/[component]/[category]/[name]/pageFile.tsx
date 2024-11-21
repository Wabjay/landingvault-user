"use client";
import { useEffect } from "react";
// import { usePathname } from "next/navigation";
import BackButton from "@/components/BackButton";
import LoadImage from "@/components/LoadImage";
import SideSection from "@/sections/SideSection";
import { store } from "@/store";
import { usePathname } from "next/navigation";

const SinglePage = () => {
  const {fetchSinglePage, page: pageData } = store();
  const pathname = usePathname();

  useEffect(() => {
    const pageName = pathname.split("/")[3]?.toLowerCase(); 
    console.log(pageName)// Ensure page name is in lowercase for matching
    if (pageName) {
      fetchSinglePage(pageName);  // Fetch the page data based on the page name
    }
  }, [fetchSinglePage, pathname]);

console.log(pathname)
  return (
    <div className="w-full">
    <div className="bg-[#FFF]">
      <div className="w-full laptop:max-w-[1152px] desktop:max-w-full mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14 desktop:gap-24">
        <div className="">
          <div className="w-full laptop:max-w-[1152px] mx-auto px-4 tablet:px-6 laptop:px-0 desktop:px-0 bg-white">
            <BackButton color={""} />
            <div className="laptop:flex laptop:gap-6 desktop:gap-8 laptop:justify-between">
              <SideSection page={pageData?.data[0]} />
              <div className=" order-first w-full">
                <div className="mx-auto px-4 tablet:px-6 laptop:px-8 desktop:px-0">
                  <div className="flex flex-col gap-8 laptop:w-fit">
                    <LoadImage
                      alt={pageData?.data[0].brandName || "Page Image"}
                      src={pageData?.data[0].pageImage || "/path/to/placeholder.jpg"}
                      style="w-full h-full laptop:w-[640px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SinglePage;
