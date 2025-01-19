"use client";

import { store } from "@/store";
import PageCard from "@/components/PageCard";
import Hero from "../hero";
import Tags from "@/components/Tags";
import IndexFallback from "@/components/FallBack/IndexFallback";
import EmptyPage from "@/components/EmptyPage";
import { usePathname } from "next/navigation";
import { createSlug } from "@/components/slug";
import { useEffect, useState } from "react";
import { Page } from "../../../types";

export default function Home() {
  const pages = store((state: { pages: Page[]; }) => state.pages); // Zustand reactive store
  const hydrated = store((state: { hydrated: boolean; }) => state.hydrated);
  const pathname = usePathname();
  const [thisPages, setThisPages] = useState<Page[]>([]);

  // Generate slug
  // const slug = pathname ? (pathname === "/" ? "/landing" : pathname) : "";
  const slug = pathname && pathname !== "/" ? pathname : "/landing";

  // Filter pages based on slug
  useEffect(() => {
    if (hydrated && Array.isArray(pages)) {
      const component = slug + "-page";
      const newPages = pages.filter((page) => {
        const pageSlug = "/" + createSlug(page.componentType[0]);
        return pageSlug === component;
      });
      setThisPages(newPages);
    } else {
      setThisPages([]);
    }


    // console.log("Pathname:", pathname);
    // console.log("Slug:", slug);
    // console.log("Pages:", pages);
    // console.log("Hydrated:", hydrated);
    
  }, [pages, slug, hydrated]);

  // Loading state
  const isLoading = !hydrated;

  // if (isLoading || pages.length < 1) {
  //   console.log("Fallback: Loading or no pages available");
  //   console.log("Filtered Pages:", thisPages);
  // } else if (pages.length > 1 && thisPages.length < 1) {
  //   console.log("Fallback: No matching pages found");
  //   console.log("Filtered Pages:", thisPages);
  // } else {
  //   console.log("Fallback: Page found");
  //   console.log("Filtered Pages:", thisPages);
  // }
  

  return (
    <div className="flex flex-col gap-y-10 bg-white dark:!bg-black dark:!text-white tablet:gap-y-20 laptop:gap-y-[100px] py-10 tablet:py-20 laptop:py-[100px]">
      <Hero component={slug} />
      <div className="w-full max-w-[1150px] mx-auto overflow-hidden no-scrollbar px-4 tablet:px-6 laptop:px-8 desktop:px-0">
        <Tags component={slug} />
        {isLoading || pages.length < 1 ? (
          <IndexFallback />
        ) : pages.length > 1 && thisPages.length < 1 ? (
        <EmptyPage />
        ) : 
        (
          <div className="grid tablet:grid-cols-2 laptop:grid-cols-4 gap-5 desktop:gap-6 justify-between">
            {thisPages.map((page) => (
              <PageCard key={page._id} page={page} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
