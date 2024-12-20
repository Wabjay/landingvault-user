import { Metadata } from "next";
import SinglePage from "./pageFile";
import { createSlug } from "@/components/slug";
import axios from "@/lib/axios";
import { PagesResponse } from "../../../../../types";

interface Params {
  name: string;
  category: string;
  component: string;
}

interface PageProps {
  params: Promise<Params>; // Always treat `params` as a Promise
}

const fetchPageData = async (name: string): Promise<PagesResponse> => {
  try {
    const response = await axios.get(`/page/name/${name}`);
    return response.data as PagesResponse;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return {
      data: [],
      status: false,
      statusCode: 0,
      message: "",
      errors: null,
    };
  }
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params; // Always resolve the Promise
  const { category, component, name } = resolvedParams;

  const pageData = await fetchPageData(name);
  const formattedName = (name || "").replace(/-/g, " ");
  const title = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

  const pageTitle = pageData.data[0]?.brandName || "Default Brand Name";
  const pageDescription = pageData.data[0]?.brandDescription || "";
  const pageDesc =
    pageDescription.length > 150
      ? pageDescription.slice(0, 150) + "..."
      : pageDescription ||
        "Landingvault offers a wide range of learning tools designed to improve your learning experience.";
  const pageIcon =
    pageData.data[0]?.pageCoverImage || "https://landingvault.com/seo-card.png";

  return {
    title: `${pageTitle} | Landingvault`,
    description: `${pageDesc} Landingvault`,
    icons: {
      icon: "https://landingvault.com/icon.png",
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

const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { category, component, name } = resolvedParams;

  const pageData = await fetchPageData(name);
  const pageTitle = pageData.data[0]?.brandName || "Default Brand Name";
  const pageDescription = pageData.data[0]?.brandDescription || "";
  const pageDesc =
    pageDescription.length > 150
      ? pageDescription.slice(0, 150) + "..."
      : pageDescription ||
        "Landingvault offers a wide range of learning tools designed to improve your learning experience.";
  const pageIcon =
    pageData.data[0]?.pageCoverImage || "https://landingvault.com/seo-card.png";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${pageTitle} | Landingvault`,
    description: `${pageDesc} Landingvault`,
    url: `https://landingvault.com/${createSlug(component)}/${createSlug(
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

export default Page;
