import PageCard from "@/components/PageCard";
import  { useEffect, useState } from "react";
import { Page } from "../../types";
import { store } from "@/store";
import { createSlug, removeSlug } from "@/components/slug";


export default function FooterPages({slug, pageName:str}: {slug:string, pageName:string}) {
  const { pages, hydrated } = store(); // Access Zustand store
  const [thisPages, setThisPages] = useState<Page[]>([]);

  console.log(slug)
  const component = removeSlug(slug)
   // Safely filter pages based on the slug
   useEffect(() => {
    // convert pagename to lowercase string without slug 
    const pageName = str.split("-").join(" ").toLowerCase();

    const component = slug;
    const newPages = Array.isArray(pages)
      ? pages.filter((page) => {
        const pageSlug =  createSlug(page.componentType[0]);
        
        // return pageCard aside the current page
        if(page.brandName.toLowerCase() !== pageName){ 
          return pageSlug === component;
        }
        })
      : [];
    setThisPages(newPages);
    console.log("Pages:", thisPages);
      
    console.log("Is Hydrated:", hydrated);

  }, [pages, slug, hydrated]); 


  return (
    <div className="bg-white dark:!bg-black dark:!text-white w-full">
      <div className="w-full mx-auto px-4 py-[40px] tablet:px-6 tablet:py-[80px] laptop:max-w-[1152px] laptop:px-8 laptop:py-[100px] desktop:px-0">
        <p className="text-24 font-bold mb-5 tablet:text-32 tablet:mb-10 laptop:text-48 laptop:mb-[50px] capitalize">
        More {component}s
        </p>

        <div className="grid tablet:grid-cols-2 laptop:grid-cols-4 gap-5 desktop:gap-6 justify-between">
            {thisPages.map((page, index) => (
              index <= 7 &&
              <PageCard key={page._id} page={page} />
            ))}
          </div>
      </div>
    </div>
  );
}
