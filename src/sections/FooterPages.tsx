import PageCard from "@/components/PageCard";
import  { useEffect } from "react";
import { store } from "@/store";


export default function FooterPages({slug}: {slug:string, pageName:string}) {
  const { pages, fetchPages } = store(); 

  const component = slug.split('%')[0];
  
  useEffect(() => {
    fetchPages({ component: component, page: "" });
  }, [component, fetchPages]);



  return (
    <div className="bg-white dark:!bg-black dark:!text-white w-full">
      <div className="w-full mx-auto px-4 py-[40px] tablet:px-6 tablet:py-[80px] laptop:max-w-[1152px] laptop:px-8 laptop:py-[100px] desktop:px-0">
        <p className="text-24 font-bold mb-5 tablet:text-32 tablet:mb-10 laptop:text-48 laptop:mb-[50px] capitalize">
        More {component} Pages
        </p>

        <div className="grid tablet:grid-cols-2 laptop:grid-cols-4 gap-5 desktop:gap-6 justify-between">
            {pages.map((page, index) => (
              index <= 7 &&
              <PageCard key={page._id} page={page} />
            ))}
          </div>
      </div>
    </div>
  );
}
