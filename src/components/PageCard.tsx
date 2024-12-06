"use client";
import Image from "next/image";
import Link from "next/link";
import { createSlug } from "./slug";
import { Page } from "../../types";
import { store } from "@/store";
import LoadImage from "./LoadImage";

const PageCard = ({ page }: { page: Page }) => {
  const { brandName, pageCoverImage, componentType } = page;
  const { setSearch } = store();

  const imageUrl = pageCoverImage || "/path/to/default-image.jpg"; // Default image
  const slug = createSlug(brandName || "default"); // Fallback slug
  const tag = createSlug(componentType?.[0] || "tag"); // Fallback tag
  const components = "landing-page"; // Static value

  return (
    <div className="w-full flex h-auto text-16 font-medium focus:outline-none mb-6">
      <Link
        href={`/${components}/${tag}/${slug}`}
        className="flex flex-col text-left gap-y-2 tablet:max-w-[528px] group" // Added `group` class for hover effects
        onClick={() => setSearch("")}
      >
        {/* Image section */}
        {/* <Image
          src={imageUrl}
          alt={brandName ? `${brandName} logo` : "No image available for this brand"}
          width={300}
          height={380}
          className="w-[300px] h-[380px] object-cover  group-hover:border-grey-50 group-hover:border"
        /> */}
          <LoadImage
          src={imageUrl}
          alt={brandName ? `${brandName} logo` : "No image available for this brand"}
          height={380}
          style={`w-[300px] h-[380px] object-cover group-hover:bg-overlay  group-hover:border-grey-50 group-hover:border`}
        />
        <div className="py-2 flex justify-between w-full">
          <div>
            <p className="font-semibold w-full max-w-[255px] text-16 text-[#2E2E27] mb-1">
              {brandName || "Unnamed Brand"}
            </p>
            <p className="text-16 text-[#64645F] font-normal">
              {componentType[0] || "No Brand Name"}
            </p>
          </div>

          {/* Arrow button - visibility controlled by hover */}
          <Image
            src="/arrow-button.png"
            alt="Arrow button"
            width={32}
            height={32}
            className="w-8 h-8 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
          />
        </div>
      </Link>
    </div>
  );
};

export default PageCard;
