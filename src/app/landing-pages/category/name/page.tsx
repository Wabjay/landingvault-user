"use client"
import { useState, useEffect } from "react";
import { store } from "@/store";
import PageCard from "@/components/PageCard";
import Tags from "@/components/Tags";
import Hero from "../../../hero";
import { usePathname } from "next/navigation";

export default function Home() {
  const { pages } = store();
  const pathname = usePathname();
  console.log(pathname)
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);


    // Check if we're on the client side
    useEffect(() => {
      console.log(pages);
    }, [pages]);
  
  // Early return or loading state to prevent hydration issues
  if (!isClient) {
    return null; // Return nothing or a loading spinner during SSR
  }

  return (
    <>
    <Hero />
    <div className="grid items-center justify-items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Tags />
      <div className="flex flex-wrap gap-8 justify-start">
      {pages?.map((page) => (
        <PageCard key={page._id} page={page} />
      ))}
      </div>
    </div>
    </>
  );
}
