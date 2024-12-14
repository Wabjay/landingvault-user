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
  const { pages, hydrated } = store(); // Access Zustand store
  const pathname = usePathname();
  const [thisPages, setThisPages] = useState<Page[]>([]);

  const slug = pathname === "/" ? "/landing" : pathname;

  // Safely filter pages based on the slug
  useEffect(() => {
    const component = slug + "-page";
    const newPages = Array.isArray(pages)
      ? pages.filter((page) => {
          const pageSlug = "/" + createSlug(page.componentType[0]);
          console.log(pageSlug, component);
          return pageSlug === component;
        })
      : [];
    setThisPages(newPages);
    console.log("Pages:", thisPages);
      
    console.log("Is Hydrated:", hydrated);

  }, [pages, slug, hydrated]); // Adding hydrated to the dependency array to ensure it is considered



  // Determine loading state
  const isLoading = !hydrated;

  return (
    <div className="flex flex-col gap-y-10 tablet:gap-y-20 laptop:gap-y-[100px] py-10 tablet:py-20 laptop:py-[100px]">
      <Hero  component={slug}/>
      <div className="w-full max-w-[1150px] mx-auto overflow-hidden no-scrollbar px-4 tablet:px-6 laptop:px-8 desktop:px-0">
        <Tags component={slug} />

        {isLoading ? (
          // Show fallback if still loading
          <IndexFallback />
        ) : thisPages.length < 1 ? (
          // Show empty state if no pages exist
          <EmptyPage />
        ) : (
          // Render the filtered pages
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
