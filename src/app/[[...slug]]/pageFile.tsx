"use client";

import { store } from "@/store";
import PageCard from "@/components/PageCard";
import Hero from "../[component]/hero";
import Tags from "@/components/Tags";
import IndexFallback from "@/components/FallBack/IndexFallback";
// import EmptyPage from "@/components/EmptyPage";
import { usePathname } from "next/navigation";
// import { createSlug } from "@/components/slug";
import { useEffect } from "react";
import { Page } from "../../../types";
import { removeSlug } from "@/components/slug";
// import { Page } from "../../../types";

export default function Home() {
  const { pages, fetchPages, fetchComponents, } = store();

  const hydrated = store((state: { hydrated: boolean; }) => state.hydrated);
  const pathname = usePathname();

  // Generate slug
  const slug = pathname ? (pathname === "/" ? "/landing" : pathname) : "";
 
  const cleanSlugA = removeSlug(pathname.replace('/', ''));

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  useEffect(() => {
    // fetchPages(loadedPages?.data);
    fetchPages({ component: cleanSlugA, page: "" });

  }, [cleanSlugA, fetchPages]);

  // Loading state
  const isLoading = !hydrated;


  

  return (
    <div className="flex flex-col gap-y-10 bg-white dark:!bg-black dark:!text-white tablet:gap-y-20 laptop:gap-y-[100px] py-10 tablet:py-20 laptop:py-[100px]">
      <Hero component={slug} />
      <div className="w-full max-w-[1150px] mx-auto overflow-hidden no-scrollbar px-4 tablet:px-6 laptop:px-8 desktop:px-0">
        <Tags activeTag={slug} />
        {isLoading || pages.length < 1 ? (
          <IndexFallback />
        ) :
        (
          <div className="grid tablet:grid-cols-2 laptop:grid-cols-4 gap-5 desktop:gap-6 justify-between">
            {pages && pages.map((page: Page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
