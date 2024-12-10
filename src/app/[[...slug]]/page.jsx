import PageFile from "./pageFile";

export async function generateMetadata({ params }) {
  const { slug } = params;

  // Ensure slug is valid and not undefined or empty
  const formattedSlug = slug ? slug[0].replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Landing";
  console.log("formattedSlug: ", formattedSlug);
  const title = `Landingvault: The best ${formattedSlug} page design inspiration`;
  const description = `Explore top ${formattedSlug} page design inspiration on Landingvault. Get inspired with curated, high-quality landing page examples.`;

  return {
    title,
    description,
    icons: { icon: "/icon.png" },
    openGraph: {
      type: "website",
      siteName: "Landingvault",
      title,
      description,
      url: `https://landingvault.com/${slug}`,
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
