"use client"
import { useState, useEffect } from "react";
import { store } from "@/store";
import PageCard from "@/components/PageCard";
import Hero from "./hero";
import Tags from "@/components/Tags";

export default function Home() {
  const { pages } = store();
  
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
    <div className="w-full max-w-[1150px] mx-auto overflow-hidden no-scrollbar">
      <Tags /> 
      <div className="flex flex-wrap gap-7 justify-start">
      {pages?.map((page) => (
        <PageCard key={page._id} page={page} />
      ))}
      </div>

    </div>
    </>
  );
}
