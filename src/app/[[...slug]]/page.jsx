import PageFile from "./pageFile";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  function limitChars(str, chars) {
    if (str.length > chars) {
      return str.substring(0, chars) + "...";
    }
    return str;
  }
  // If no slug (i.e., root path), set a default page title and description
  const formattedSlug = Array.isArray(slug) && slug.length > 0
      ? slug.join(" ").replace(/-/g, " ").replace(/\b\w/g, (char) => char.toLowerCase())
      : "Landing";

  const title = ` Landingvault - The best ${formattedSlug} page design inspiration for your next project`;
  const description = `Explore top ${formattedSlug} page design inspiration on Landingvault. Get inspired with curated, high-quality ${formattedSlug} page examples featuring screenshots, industry, stack, typography, and color palette ideas.`;

  const image = "https://landingvault.com/cover.webp";
  return {
    title: limitChars(title, 67),
    description: description.substring(0, 150) + "...",
    icons: { icon: "https://landingvault.com/cover.webp" },
    openGraph: {
      type: "website",
      siteName: "Landingvault",
      title: limitChars(title, 67),
      description: limitChars(description, 150),
      url: `https://landingvault.com/${slug ? slug.join("/") : ""}`,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: limitChars(title, 67),
      description: limitChars(description, 150),
      images: [{ url: image }],
    },
  };
}


const Page = async ({ params }) => {
 
  const { slug } = await params;

  // If no slug (i.e., root path), set a default page title and description
  const formattedSlug = Array.isArray(slug) && slug.length > 0
      ? slug.join(" ").replace(/-/g, " ").replace(/\b\w/g, (char) => char.toLowerCase())
      : "Landing";

  const title = `Landingvault - The best ${formattedSlug} page design inspiration | for your next project`;
  const description = `Explore top ${formattedSlug} page design inspiration on Landingvault. Get inspired with curated, high-quality ${formattedSlug} page examples featuring screenshots, industry, stack, typography, and color palette ideas.`;

  const image = "https://landingvault.com/cover.webp";


  const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description: description,
  url: `https://landingvault.com/${slug ? slug.join("/") : ""}`,
  author: {
    "@type": "Person",
    name: "Landingvault",
  },
  publisher: {
    "@type": "Organization",
    name: "Pixelgum Studio",
    logo: {
      "@type": "ImageObject",
      url: image,
    },
  },
}

  return (
    <div>
      <PageFile />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </div>
  );
}

export default Page;