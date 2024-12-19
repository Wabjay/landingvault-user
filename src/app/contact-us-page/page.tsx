
import { Metadata } from "next";
import PageFile from "./pageFile";

export const metadata: Metadata = {
  
  title: 'Landingvault - Contact us ',
  description: 'Get in touch with our support teams for demos, onboarding support, or listing questions.',
  icons: {
    icon: 'https://landingvault.com/icon.png',  // This sets the favicon for this specific page
  },
  openGraph: {
    type: "website",
    siteName: "Landingvault",
    title: 'Landingvault - Contact us ',
    description: 'Get in touch with our support teams for demos, onboarding support, or listing questions.',
    url: 'https://landingvault.com/about-us-page',
    images: [{
      url: 'https://landingvault.com/seo-card.png',
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: 'https://landingvault.com/about-us-page',
    title: 'Landingvault - Contact us ',
    description: 'Get in touch with our support teams for demos, onboarding support, or listing questions.',
    images: [{
      url: 'https://landingvault.com/seo-card.png',
    }],
  },
};


const DailyWord = () => {

return <PageFile />
};

export default DailyWord;