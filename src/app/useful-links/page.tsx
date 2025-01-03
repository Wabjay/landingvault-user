
import { Metadata } from "next";
import PageFile from "./pageFile";

export const metadata: Metadata = {
  
  title: 'Landingvault Useful Links',
  description: 'Explore top landing page design inspiration on Landingvault. Get inspired with curated, high-quality landing page examples.',
  icons: {
    icon: 'https://landingvault.com/cover.webp',  // This sets the favicon for this specific page
  },
  openGraph: {
    type: "website",
    siteName: "Landingvault",
    title: 'Landingvault Useful Links',
    description: 'Explore top landing page design inspiration on Landingvault. Get inspired with curated, high-quality landing page examples.',
    url: 'https://landingvault.com/useful-links',
    images: [{
      url: 'https://landingvault.com/cover.webp',
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: 'https://landingvault.com/useful-links',
    title: 'Landingvault Useful Links',
    description: 'Explore top landing page design inspiration on Landingvault. Get inspired with curated, high-quality landing page examples.',
    images: [{
      url: 'https://landingvault.com/cover.webp',
    }],
  },
};


const DailyWord = () => {

return <PageFile />
};

export default DailyWord;