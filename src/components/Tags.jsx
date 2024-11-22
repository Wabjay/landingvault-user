"use client";
import { useState, useEffect, useRef } from "react";
import { store } from "@/store";
import Image from "next/image";

export default function Tags() {
  const [activeTag, setActiveTag] = useState("All Tags");
  const [tags, setTags] = useState([]);
  const tagsContainerRef = useRef(null);

  const { components, loadedPages, fetchPages, fetchComponents } = store();

  // Get Tag
  const sortTag = (tag) => {
    setActiveTag(tag);
  };

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  useEffect(() => {
    const tag = {
      id: "672c7b173c4f",
      name: "All Tags",
      title: "All Tags",
    };
    if (components.data.length > 0) {
      const newTags = [tag, ...components?.data];
      setTags(newTags);
    } else {
      const newTags = [tag];
      setTags(newTags);
    }
  }, [components.data]);

  useEffect(() => {
    const sortPagesByTagOrSearch = () => {
      if (activeTag === "All Tags") {
        return loadedPages.data;
      }
      if (activeTag) {
        return loadedPages.data?.filter((page) =>
          page.componentType.includes(activeTag)
        );
      }
      return loadedPages.data;
    };

    fetchPages(sortPagesByTagOrSearch());
  }, [fetchComponents, activeTag, fetchPages, loadedPages.data]);

  const scrollTags = (direction) => {
    const container = tagsContainerRef.current;
    const scrollAmount = 200; // Pixels to scroll

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else if (direction === "right") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
            <div className="relative flex items-center mb-6">
        {/* Left Arrow */}
        <button
          className="absolute left-0 z-10 p-2 bg-grey-10 border-grey-10 border rounded-full hover:bg-grey-200"
          onClick={() => scrollTags("left")}
        >
          <Image src="/navArrow.svg" alt="" width={20} height={20} />
        </button>

        {/* Tags Container */}
        <div
          ref={tagsContainerRef}
          className="flex overflow-x-auto gap-3 py-2 scrollbar-hide w-full max-w-full  no-scrollbar"
        >
          {tags &&
            tags.map((tag) => (
              <p
                key={tag.name}
                onClick={() => sortTag(tag.name)}
                className={`whitespace-nowrap cursor-pointer text-14 font-medium rounded-full px-4 py-2 border capitalize transition-all ${
                  activeTag === tag.name
                    ? "border-blue-500 text-blue-500 bg-blue-100"
                    : "border-grey-50 text-grey-800 bg-white hover:border-grey-50 hover:text-grey-600 hover:bg-grey-10"
                } `}
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
          <Image src="/navArrow.svg" alt="" width={20} height={20} className="rotate-180"/>
          </button>
      </div>
  );
}
