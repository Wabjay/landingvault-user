

import PageFile from "./pageFile";

export async function generateMetadata() {
  
  
  const title = `Landingvault - Contact us`;
  const description = `Get in touch with our support teams for demos, onboarding support, or listing questions.`;

  
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
      url: `https://landingvault.com/contact-us-page`,
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


const DailyWord = () => {

return <PageFile />
};

export default DailyWord;