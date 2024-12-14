
import PageFile from "./pageFile";

export async function generateMetadata() {
  
  
  const title = `Landingvault - The best design inspiration for your next project`;
  const description = `Explore top design inspiration on Landingvault. Get inspired with curated examples featuring screenshots, industry, stack, typography, and color palette ideas.`;


  const image = "/seo-card.png";
  return {
    title,
    description,
    icons: { icon: "/icon.png" },
    openGraph: {
      type: "website",
      siteName: "Landingvault",
      title,
      description,
      url: `https://landingvault.com/`,
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