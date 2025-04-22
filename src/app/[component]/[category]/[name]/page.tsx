import { Metadata } from "next";
import SinglePage from "./pageFile";
import { createSlug } from "@/components/slug";
import axios from "@/lib/axios";
import { Page } from "../../../../../types";

interface Params {
  name: string;
  category: string;
  component: string;
}

interface PageProps {
  params: Promise<Params>; // Always treat `params` as a Promise
}

const fetchPageData = async ({category, name}:{category:string, name: string}) => {
  try {

    const response = await axios.get(`/page/${category}/${name}`);
    const result = await response.data;
    return result.page as Page;
  } catch (error) {
    console.error("Error fetching page data:", error);
  
  }
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params; // Always resolve the Promise
  const { category, component, name } = resolvedParams;
  const pageData = await fetchPageData({category, name});
  const formattedName = (name || "").replace(/-/g, " ");
  const title = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

  const pageTitle = pageData?.brandName + " page" || "Default Brand Name";
  const pageDescription = pageData?.brandDescription || "";
  const pageDesc =
    pageDescription.length > 150
      ? pageDescription.slice(0, 150) + "..."
      : pageDescription ||
        "Landingvault offers a wide range of learning tools designed to improve your learning experience.";
  const pageIcon =
    pageData?.pageCoverImage || "https://landingvault.com/cover.webp";

  return {
    title: `${pageTitle} | Landingvault`,
    description: `${pageDesc} Landingvault`,
    icons: {
      icon: "https://landingvault.com/cover.webp",
    },
    openGraph: {
      type: "website",
      siteName: "Landingvault",
      title: `${pageTitle} | Landingvault`,
      description: `${pageDesc} Landingvault`,
      url: `https://landingvault.com/${createSlug(component)}/${createSlug(
        category
      )}/${createSlug(title)}`,
      images: [
        {
          url: pageIcon,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | Landingvault`,
      description: `${pageDesc} Landingvault`,
      images: [
        {
          url: pageIcon,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

const MainPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { category, name } = resolvedParams;

  const pageData = await fetchPageData({category, name});
  const pageTitle = pageData?.brandName + " page" || "Default Brand Name";
  const pageDescription = pageData?.brandDescription || "";
  const pageDesc =
    pageDescription.length > 150
      ? pageDescription.slice(0, 150) + "..."
      : pageDescription ||
        "Landingvault offers a wide range of learning tools designed to improve your learning experience.";
  const pageIcon =
    pageData?.pageCoverImage || "https://landingvault.com/cover.webp";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${pageTitle} | Landingvault`,
    description: `${pageDesc} Landingvault`,
    url: `https://landingvault.com/${createSlug(category)}/${createSlug(
      category
    )}/${createSlug(name)}`,
    author: {
      "@type": "Person",
      name: "Landingvault",
    },
    publisher: {
      "@type": "Organization",
      name: "Pixelgum Studio",
      logo: {
        "@type": "ImageObject",
        url: pageIcon,
      },
    },
  };

  return (
    <>
      <SinglePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
};

export default MainPage;
