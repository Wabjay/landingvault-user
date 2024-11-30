"use client"
import { useState, useEffect, useRef } from "react";
import { store } from "@/store";
import Image from "next/image";

interface Tag {
  id: string;
  name: string;
  title: string;
}

export default function Tags() {
  const [activeTag, setActiveTag] = useState<string>("All Tags");
  const [tags, setTags] = useState<Tag[]>([]);  // Define the type of tags array
  const tagsContainerRef = useRef<HTMLDivElement | null>(null);  // Ensure the ref is typed correctly

  const { components, loadedPages, fetchPages, fetchComponents, setSearch } = store();

  // Get Tag
  const sortTag = (tag: string) => {
    setActiveTag(tag);
    setSearch("")
  };

  useEffect(() => {
    fetchComponents();  // Fetch components on mount
  }, [fetchComponents]);

  useEffect(() => {
    const tag = {
      id: "672c7b173c4f",
      name: "All Tags",
      title: "All Tags",
    };
    if (components?.data?.length) {
      const newTags = [tag, ...components.data];  // Add "All Tags" as the first tag
      setTags(newTags);
    } else {
      setTags([tag]);
    }
  }, [components?.data]);  // Re-run when components data changes

  useEffect(() => {
    const sortPagesByTagOrSearch = () => {
      if (activeTag === "All Tags") {
        return loadedPages?.data;  // Return all pages
      }
      if (activeTag) {
        return loadedPages?.data?.filter((page) =>
          page.componentType.includes(activeTag)
        );
      }
      return loadedPages?.data;
    };

    fetchPages(sortPagesByTagOrSearch());  // Fetch pages based on active tag or search
  }, [activeTag, loadedPages?.data, fetchPages]);

  const scrollTags = (direction: "left" | "right") => {
    const container = tagsContainerRef.current;
    const scrollAmount = 200; // Pixels to scroll

    if (container) {
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative flex items-center mb-6">
      {/* Left Arrow */}
      <button
        className="absolute left-0 z-10 p-2 bg-grey-10 border-grey-10 border rounded-full hover:bg-grey-200"
        onClick={() => scrollTags("left")}
      >
        <Image src="/navArrow.svg" alt="Left Arrow" width={20} height={20} />
      </button>

      {/* Tags Container */}
      <div
        ref={tagsContainerRef}
        className="flex overflow-x-auto gap-3 py-2 scrollbar-hide w-full max-w-full no-scrollbar"
      >
        {tags.map((tag) => (
          <p
            key={tag.id}
            onClick={() => sortTag(tag.name)}
            className={`whitespace-nowrap cursor-pointer text-14 font-medium rounded-full px-4 py-2 border capitalize transition-all ${
              activeTag === tag.name
                ? "border-blue-500 text-blue-500 bg-blue-100"
                : "border-grey-50 text-grey-800 bg-white hover:border-grey-50 hover:text-grey-600 hover:bg-grey-10"
            }`}
          >
            {tag.name}
          </p>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 z-10 p-2 bg-grey-10 border-grey-10 border rounded-full hover:bg-grey-200"
        onClick={() => scrollTags("right")}
      >
        <Image src="/navArrow.svg" alt="Right Arrow" width={20} height={20} className="rotate-180" />
      </button>
    </div>
  );
}
