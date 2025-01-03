import PageFile from "./pageFile";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // If no slug (i.e., root path), set a default page title and description
  const formattedSlug = Array.isArray(slug) && slug.length > 0
      ? slug.join(" ").replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
      : "Landing";

  const title = `Landingvault - The best ${formattedSlug} design inspiration for your next project`;
  const description = `Explore top ${formattedSlug} design inspiration on Landingvault. Get inspired with curated examples featuring screenshots, industry, stack, typography, and color palette ideas.`;

  const image = "/cover.webp";
  return {
    title,
    description,
    icons: { icon: "/cover.webp" },
    openGraph: {
      type: "website",
      siteName: "Landingvault",
      title,
      description,
      url: `https://landingvault.com/${slug ? slug.join("/") : ""}`,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image }],
    },
  };
}

export default function Page() {
 

  return (
    <div>
      <PageFile />
    </div>
  );
}
