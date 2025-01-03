
import PageFile from "./pageFile";

export async function generateMetadata() {
  
  
  const title = `Landingvault - The best design inspiration for your next project`;
  const description = `Landingvault is dedicated to curating high-quality branding websites.This is a resource where you can discover some of the best branding and landing page designs for inspiration or reference.`;


  const image = "https://landingvault.com/cover.webp";
  return {
    title,
    description,
    icons: { icon: "https://landingvault.com/cover.webp" },
    openGraph: {
      type: "website",
      siteName: "Landingvault",
      title,
      description,
      url: `https://landingvault.com/about-us-page`,
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