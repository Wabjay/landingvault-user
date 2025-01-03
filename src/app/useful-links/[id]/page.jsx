import PageFile from "./pageFile";
import { createSlug } from "@/components/slug";
import { websiteLinks } from "@/app/useful-links/links";


export async function generateMetadata({
  params,
}) {
  const id  = await params.id;
console.log(id)
  // Convert ID into a readable format (replace dashes with spaces)
  const getTitle = (id || "").replace(/-/g, " ");
  const title = getTitle.charAt(0).toUpperCase() + getTitle.slice(1); // Capitalize the first letter

  // Find the corresponding page in websiteLinks based on slug match
  const page = websiteLinks.find(
    (page) => createSlug(page.title) === createSlug(title)
  );

  // If no page is found, fallback to a default title
  const pageTitle = page ? page.title : "";
  const pageIcon = page
    ? page.image
    : "https://landingvault.com/cover.webp";

  return {
    title: `Landingvault | ${pageTitle}`,
    description:
      "Landingvault offers a wide range of learning tools designed to improve your learning experience.",
    icons: {
      icon: "https://landingvault.com/cover.webp", // This sets the favicon for this specific page
    },
    openGraph: {
      type: "website",
      siteName: "Landingvault",
      title: `Landingvault | ${pageTitle}`,
      description:
        "Landingvault offers a wide range of learning tools designed to improve your learning experience.",
      url: `https://landingvault.com/useful-links/${createSlug(title)}`,
      images: [
        {
          url: `${pageIcon}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: `https://landingvault.com/useful-links/${createSlug(title)}`,
      title: `Landingvault | ${pageTitle}`,
      description:
        "Landingvault offers a wide range of learning tools designed to improve your learning experience.",
      images: [
        {
          url: `${pageIcon}`,
        },
      ],
    },
  };
}

const DailyWord = () => {
  // Pass the page name (or slug) to the PageFile component
 
  return <PageFile />;
};

export default DailyWord;
