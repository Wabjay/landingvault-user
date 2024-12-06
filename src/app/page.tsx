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
      <div className="w-full max-w-[1150px] mx-auto overflow-hidden no-scrollbar px-4 tablet:px-6 laptop:px-8 desktop:px-0">
        <Tags />
         {isLoading
            ? <IndexFallback />  :  pages.length < 1 ? <EmptyPage /> 
            :
        <div className="grid tablet:grid-cols-2 laptop:grid-cols-4 gap-5 desktop:gap-6 justify-between">
          {pages?.map((page) => (
                <PageCard key={page._id} page={page} />
              ))}
        </div>}
      </div>
    </div>
  );
}
