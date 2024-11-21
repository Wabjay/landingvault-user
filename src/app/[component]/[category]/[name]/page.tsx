// import { Metadata } from "next";
import SinglePage from "./pageFile";
// import { createSlug } from "@/components/slug";
// import axios from "@/lib/axios";
// import { PagesResponse } from "../../../../../types";


// interface Params {
//   name: string;
//   category: string;
//   component: string;
// }

// interface PageProps {
//   params: Params | Promise<Params>; // Accommodate the possibility of async params
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   // Resolve params if it's a Promise
//   const resolvedParams = params instanceof Promise ? await params : params;
//   const { category, component, name } = resolvedParams;

//   // Fetch page data asynchronously
//   let pageData: PagesResponse = {
//     data: [],
//     status: false,
//     statusCode: 0,
//     message: "",
//     errors: null
//   };
//   try {
//     const response = await axios.get(`/page/name/${name}`);
//     pageData = response.data as PagesResponse;
//     console.log(response.data )
//   } catch (error) {
//     console.error("Error fetching page data:", error);
//   }

//   // Convert the name into a readable format (replace dashes with spaces)
//   const formattedName = (name || "").replace(/-/g, " ");
//   const title = formattedName.charAt(0).toUpperCase() + formattedName.slice(1); // Capitalize the first letter

//   // Extract metadata values from pageData or use defaults
//   const pageTitle = pageData.data[0]?.brandName || "Default Brand Name";
//   const pageIcon = pageData.data[0]?.pageCoverImage || "https://landingvault.com/seo-card.png";

//   // Construct the metadata object
//   return {
//     title: `Landingvault | ${pageTitle}`,
//     description:
//       "Landingvault offers a wide range of learning tools designed to improve your learning experience. It includes a random word generator, word counter, character counter and so much more!",
//     icons: {
//       icon: "https://landingvault.com/icon.png", // Sets the favicon for this specific page
//     },
//     openGraph: {
//       type: "website",
//       siteName: "Landingvault",
//       title: `Landingvault | ${pageTitle}`,
//       description:
//         "Landingvault offers a wide range of learning tools designed to improve your learning experience. It includes a random word generator, word counter, character counter and so much more!",
//       url: `https://landingvault.com/${createSlug(component)}/${createSlug(category)}/${createSlug(title)}`,
//       images: [
//         {
//           url: pageIcon,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       site: `https://landingvault.com/${createSlug(component)}/${createSlug(category)}/${createSlug(title)}`,
//       title: `Landingvault | ${pageTitle}`,
//       description:
//         "Landingvault offers a wide range of learning tools designed to improve your learning experience. It includes a random word generator, word counter, character counter and so much more!",
//       images: [
//         {
//           url: pageIcon,
//         },
//       ],
//     },
//   };
// }

const Page = () => {


  return <SinglePage />;
};

export default Page;
