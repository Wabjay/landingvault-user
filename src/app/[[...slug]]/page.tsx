import { Metadata } from "next";
import PageFile from "./pageFile";

// Define the interface for params
interface Params {
  slug: string;
}

interface PageProps {
  params: Params; // Params is no longer a Promise
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug;

  const toString = slug !== undefined ? slug[0] : "Landing"
  const formattedSlug = toString.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  console.log("formattedSlug: ", formattedSlug)

  const title = `Landingvault: The best ${formattedSlug} page design inspiration `;
  const description = `Explore top ${formattedSlug} page design inspiration  on Landingvault. Get inspired with curated, high-quality landing page examples .`;

  return {
    title,
    description,
    icons: { icon: "/icon.png" },
    openGraph: {
      type: "website",
      siteName: "Landingvault",
      title,
      description,
      url: `https://landingvault.com/${toString}`,
      images: [{ url: "/seo-card.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/seo-card.png" }],
    },
  };
}

export default function Page() {
  return <PageFile />;
}
