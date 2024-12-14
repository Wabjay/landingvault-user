"use client";
import BackButton from "@/components/BackButton";
import LoadImage from "@/components/LoadImage";
import SideSection from "@/sections/SideSection";
import { usePathname } from "next/navigation";
import Skeleton from "@/components/Skeleton";
import ISRFetcher from "@/lib/ISRFetcher";
import { PagesResponse } from "../../../../../types";
import SinglePageFallBack from "@/components/FallBack/SinglePageFallback";
import ErrorFallback from "@/components/FallBack/ErrorFallBack";
import FooterPages from "@/sections/FooterPages";

const SinglePage = () => {
  const pathname = usePathname();
  const slug = pathname.split("/")[2]?.toLowerCase();
  const pageName = pathname.split("/")[3]?.toLowerCase();

  if (!pageName) {
    return <div>Error: Page name is missing in the URL.</div>;
  }

  

console.log(pathname)
  return (
    <div className="w-full">
    <div className="bg-grey-10">
      <div className="w-full laptop:max-w-[1440px] mx-auto px-4 tablet:px-6 laptop:px-0 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14 desktop:gap-24">
        <div className="">
          <div className="w-full laptop:max-w-[1299px] mx-auto px-4 tablet:px-6 laptop:pl-8 laptop:pr-0 desktop:px-0 desktop:mr-0 desktop:ml-auto">
          <BackButton color={""} />
            <ISRFetcher<PagesResponse>
          url={`page/name/${pageName}`}
          fallback={<SinglePageFallBack/>}
          errorFallback={<ErrorFallback />}
          render={(page) => (
            <div className="laptop:flex laptop:gap-6 desktop:gap-8 laptop:justify-between">
              <SideSection page={page?.data[0]} />
              <div className=" order-first w-full">
                <div className="mx-auto w-fit">
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
        <FooterPages slug={slug} />
      </div>
    </div>
  </div>
  );
};

export default SinglePage;

