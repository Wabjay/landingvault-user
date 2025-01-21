"use client";
import { store } from "@/store";
import PageCard from "@/components/PageCard";
import IndexFallback from "@/components/FallBack/IndexFallback";
import EmptyPage from "../EmptyPage";

export const PageModal =({type}:{type: string})=> {
  const { searchedPages, hydrated } = store();

  // Check if pages are still loading
  const isLoading = !hydrated;

  return (
      <div className="w-full h-fit flex  bg-white dark:!bg-black dark:!text-white">
        <div className="w-full h-fit mx-auto  max-w-[1150px] flex flex-wrap gap-7 p-4 py-10 tablet:py-20 laptop:py-[100px] tablet:px-10 laptop:px-10 desktop:px-0  justify-start">
          {isLoading ? (
            <IndexFallback />
          ) :  searchedPages.length < 1 ? <EmptyPage /> :
          <>
          <div>
          <p className="mb-2 text-16 tablet:text-24 text-grey-500 dark:!text-white">{searchedPages.length} search result for</p>
          <p className="font-bold w-full max-w-[255px] text-24 tablet:text-32 laptop:text-40 text-grey-800 dark:!text-white mb-1 capitalize">{type}</p>
          </div>

          <div className="grid tablet:grid-cols-2 laptop:grid-cols-4 gap-5 desktop:gap-6 justify-between">
          {
            searchedPages?.map((page) => (
              <PageCard
                key={page._id}
                page={page}
              />
            ))
          }
          </div>
          </>
}
        </div>
      </div>
  );
}
