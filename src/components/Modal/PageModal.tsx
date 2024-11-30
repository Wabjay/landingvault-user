"use client";
import { store } from "@/store";
import PageCard from "@/components/PageCard";
import IndexFallback from "@/components/FallBack/IndexFallback";
import EmptyPage from "../EmptyPage";

export const PageModal =()=> {
  const { searchedPages, hydrated } = store();

  // Check if pages are still loading
  const isLoading = !hydrated;



  return (
      <div className="fixed top-[60px] w-full h-fit left-0 pb-16 flex bg-white">
        <div className="w-full h-fit mx-auto  max-w-[1150px] flex flex-wrap gap-7 my-6 p-4 tablet:px-10 laptop:px-10 desktop:px-0  justify-start">
          {isLoading ? (
            <IndexFallback />
          ) :  searchedPages.length < 1 ? <EmptyPage /> :(
            searchedPages?.map((page) => (
              <PageCard
                key={page._id}
                page={page}
              />
            ))
          )}
        </div>
      </div>
  );
}
