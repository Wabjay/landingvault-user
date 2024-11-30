"use client"
import { store } from "@/store";
import PageCard from "@/components/PageCard";
import Hero from "./hero";
import Tags from "@/components/Tags";
import IndexFallback from "@/components/FallBack/IndexFallback";
import EmptyPage from "@/components/EmptyPage";

export default function Home() {
  const { pages, hydrated } = store();  // Ensure `hydrated` is used for the hydration state.
  
  // If `pages` is not hydrated or still loading, show skeleton loaders
  const isLoading = !hydrated ;

  return (
    <div className="flex flex-col gap-y-10 tablet:gap-y-20 laptop:gap-y-[100px] py-10 tablet:py-20 laptop:py-[100px]">
      <Hero />
      <div className="w-full max-w-[1150px] mx-auto overflow-hidden no-scrollbar">
        <Tags />
        <div className="flex flex-wrap gap-7 px-4 tablet:px-10 desktop:px-0 justify-start">
          {isLoading
            ? <IndexFallback />  :  pages.length < 1 ? <EmptyPage /> 
            : pages?.map((page) => (
                <PageCard key={page._id} page={page} />
              ))}
        </div>
      </div>
    </div>
  );
}
