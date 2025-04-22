"use client";
import Image from "next/image";
import Link from "next/link";
// import { createSlug } from "./slug";
import { Page } from "../../types";
import { store } from "@/store";
import LoadImage from "./LoadImage";
import Skeleton from "./Skeleton";

const PageCard = ({ page }: { page: Page }) => {
  const { brandName, pageCoverImage, componentType } = page;
  const { setSearch, components: tags } = store();

  const imageUrl = pageCoverImage || "";
  const slug = (brandName);
  const tag: string = componentType?.[0]?.title || "tag";
  const components = "categories";

  console.log(tags, "Pages")


  return (
    <div className="pageCard w-full h-auto text-16 font-medium focus:outline-none mb-6">
      <Skeleton width={"320px"} height={"380px"}>
        <Link
          href={`/${components}/${tag}/${slug}`}
          className="flex flex-col text-left gap-y-2 tablet:max-w-[528px] group"
          onClick={() => setSearch("")}
        >
          <LoadImage
            src={imageUrl}
            alt={
              brandName
                ? `${brandName} logo`
                : "No image available for this brand"
            }
            height={380}
            style={`w-full h-[380px] object-cover  group-hover:bg-overlay  group-hover:shadow-shareCard border border-grey-50`}
          />
          <div className="py-2 flex justify-between w-full">
            <div>
              <p className="font-semibold w-full max-w-[255px] text-16 text-[#2E2E27] dark:!text-white mb-1">
                {brandName}
              </p>
              {/* <p className="text-16 text-[#64645F] dark:!text-white  font-normal">
                {tag || "No Brand Name"}
              </p> */}
            </div>
            <Image
              src="/arrow-button.png"
              alt="Arrow button"
              width={32}
              height={32}
              className="w-8 h-8 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
            />
          </div>
        </Link>
      </Skeleton>
    </div>
  );
};

export default PageCard;
