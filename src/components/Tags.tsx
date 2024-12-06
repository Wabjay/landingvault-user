"use client";
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
  const [tags, setTags] = useState<Tag[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tagsContainerRef = useRef<HTMLDivElement | null>(null);

  const { components, loadedPages, fetchPages, fetchComponents, setSearch } = store();

  const sortTag = (tag: string) => {
    setActiveTag(tag);
    setSearch("");
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
    if (components?.data?.length) {
      const newTags = [tag, ...components.data];
      setTags(newTags);
    } else {
      setTags([tag]);
    }
  }, [components?.data]);

  useEffect(() => {
    const sortPagesByTagOrSearch = () => {
      if (activeTag === "All Tags") {
        return loadedPages?.data;
      }
      if (activeTag) {
        return loadedPages?.data?.filter((page) =>
          page.componentType.includes(activeTag)
        );
      }
      return loadedPages?.data;
    };

    fetchPages(sortPagesByTagOrSearch());
  }, [activeTag, loadedPages?.data, fetchPages]);

  const updateArrowsVisibility = () => {
    const container = tagsContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0); // Show left arrow if not at the start
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth); // Show right arrow if not at the end
    }
  };

  const scrollTags = (direction: "left" | "right") => {
    const container = tagsContainerRef.current;
    const scrollAmount = 200;

    if (container) {
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const container = tagsContainerRef.current;
    if (container) {
      // Initial check
      updateArrowsVisibility();

      // Add scroll listener
      container.addEventListener("scroll", updateArrowsVisibility);

      return () => {
        container.removeEventListener("scroll", updateArrowsVisibility);
      };
    }
  }, [tags]);

  return (
    <div className="relative flex items-center mb-6">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          className="absolute left-0 z-10 p-2 bg-grey-10 border-grey-10 border rounded-full hover:bg-grey-200"
          onClick={() => scrollTags("left")}
        >
          <Image src="/navArrow.svg" alt="Left Arrow" width={20} height={20} />
        </button>
      )}

      {/* Tags Container */}
      <div
        ref={tagsContainerRef}
        className="flex overflow-x-auto gap-3 py-2 scrollbar-hide w-full max-w-full no-scrollbar"
      >
        {tags.map((tag) => (
          <p
            key={tag.id}
            onClick={() => sortTag(tag.name)}
            className={`whitespace-nowrap cursor-pointer text-14 font-medium rounded-full px-3 py-2 border capitalize transition-all ${
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
      {showRightArrow && (
        <button
          className="absolute right-0 z-10 p-2 bg-grey-10 border-grey-10 border rounded-full hover:bg-grey-200"
          onClick={() => scrollTags("right")}
        >
          <Image
            src="/navArrow.svg"
            alt="Right Arrow"
            width={20}
            height={20}
            className="rotate-180"
          />
        </button>
      )}
    </div>
  );
}
