"use client";
import { store } from "@/store";
import LayoutFallBack from "@/components/FallBack/LayoutFallback";
import { Suspense } from "react";
import { PageModal } from "@/components/Modal/PageModal";

export default function Main({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const { searchInput, showSearch } = store();


  return (
    <>
     {/* Wrap children in Suspense for fallback */}
     <Suspense fallback={<LayoutFallBack />}>
          
     {/* Show modal when search is not empty */}
     {showSearch ? <PageModal type={searchInput} /> : children}
         </Suspense>
         </>
  );
}
