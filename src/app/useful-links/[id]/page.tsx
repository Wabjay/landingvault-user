import { Metadata } from "next";
import PageFile from "./pageFile";
import { createSlug } from "@/components/slug";
import { websiteLinks } from "@/app/useful-links/links";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;

  // Convert ID into a readable format (replace dashes with spaces)
  const getTitle = (id || "").replace(/-/g, " ");
  const title = getTitle.charAt(0).toUpperCase() + getTitle.slice(1);  // Capitalize the first letter

  // Find the corresponding page in websiteLinks based on slug match
  const page = websiteLinks.find(page => createSlug(page.title) === createSlug(title));

  // If no page is found, fallback to a default title
  const pageTitle = page ? page.title : "";
  const pageIcon = page ? page.image : "https://wordiebox.com/seo-card.png";

  return {
    title: `Wordiebox | ${pageTitle}`,
    description: 'Wordiebox offers a wide range of learning tools designed to improve your learning experience. It includes a random word generator, word counter, character counter and so much more!',
    icons: {
      icon: 'https://wordiebox.com/icon.png',  // This sets the favicon for this specific page
    },
    openGraph: {
      type: "website",
      siteName: "Wordiebox",
      title: `Wordiebox | ${pageTitle}`,
      description: 'Wordiebox offers a wide range of learning tools designed to improve your learning experience. It includes a random word generator, word counter, character counter and so much more!',
      url: `https://wordiebox.com/useful-links/${createSlug(title)}`,
      images: [{
        url: `${pageIcon}`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      site: `https://wordiebox.com/useful-links/${createSlug(title)}`,
      title: `Wordiebox | ${pageTitle}`,
      description: 'Wordiebox offers a wide range of learning tools designed to improve your learning experience. It includes a random word generator, word counter, character counter and so much more!',
      images: [{
        url: `${pageIcon}`,
      }],
    },
  };
}

const DailyWord = ({ params }: { params: { id: string } }) => {
  // Pass the page name (or slug) to the PageFile component
  const { id } = params;
  const pageName = createSlug((id || "").replace(/-/g, " "));
  
  return <PageFile pageName={pageName} />;
};

export default DailyWord;
