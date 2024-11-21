"use client";
import { useState, useEffect, useRef } from "react";
import { store } from "@/store";

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
            <div className="relative flex items-center mb-10">
        {/* Left Arrow */}
        <button
          className="absolute left-0 z-10 px-[5px] bg-white rounded-full shadow-md hover:bg-gray-200"
          onClick={() => scrollTags("left")}
        >
          &#9664;
        </button>

        {/* Tags Container */}
        <div
          ref={tagsContainerRef}
          className="flex overflow-x-auto gap-3 py-2 px-4 scrollbar-hide w-full max-w-full"
        >
          {tags &&
            tags.map((tag) => (
              <p
                key={tag.name}
                onClick={() => sortTag(tag.name)}
                className={`whitespace-nowrap cursor-pointer text-sm font-medium rounded-full px-4 py-2 border capitalize transition-all ${
                  activeTag === tag.name
                    ? "border-blue-500 text-blue-500 bg-blue-100"
                    : "border-gray-200 text-gray-600 bg-gray-100"
                } hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50`}
              >
                {tag.name}
              </p>
            ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 z-10 px-[5px] bg-white rounded-full shadow-md hover:bg-gray-200"
          onClick={() => scrollTags("right")}
        >
          &#9654; {/* Right arrow */}
        </button>
      </div>
  );
}
