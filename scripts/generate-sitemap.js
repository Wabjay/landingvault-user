import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { createWriteStream } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility function to convert strings to slugs
const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)/g, ''); // Remove leading and trailing dashes

// Utility function to create slugs and remove "Page"
const toSlugWithoutPage = (str) =>
  str
    .toLowerCase()
    .replace(/page$/i, '') // Remove "Page" at the end (case-insensitive)
    .trim() // Trim trailing whitespace
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)/g, ''); // Remove leading and trailing dashes

// Fetch dynamic components
async function fetchDynamicComponents() {
  try {
    const response = await fetch('https://api.landingvault.com/components');
    const data = await response.json();
    return data.data.map((component) => {
      const componentSlug = toSlugWithoutPage(component.name);
      return {
        url: `/${componentSlug}`,
        changefreq: 'daily',
        priority: 0.8,
      };
    });
  } catch (error) {
    console.error('Error fetching components:', error);
    return [];
  }
}

// Fetch dynamic pages
async function fetchDynamicPages() {
  try {
    const response = await fetch('https://api.landingvault.com/page');
    const data = await response.json();
    return data.data.map((page) => {
      const componentSlug = toSlug(page.componentType[0]);
      const brandSlug = toSlug(page.brandName);
      return {
        url: `/categories/${componentSlug}/${brandSlug}`,
        changefreq: 'daily',
        priority: 0.8,
      };
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

// Generate sitemap
async function generateSitemap() {
  const smStream = new SitemapStream({ hostname: 'https://www.landingvault.com' });
  const smStreams = new SitemapStream({ hostname: 'http://www.landingvault.com' });
  const pipeline = smStream.pipe(createGzip());

  // Add static pages
  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStreams.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/contact-us-page', changefreq: 'weekly', priority: 1.0 });
  smStream.write({ url: '/about-us-page', changefreq: 'weekly', priority: 1.0 });
  smStream.write({ url: '/useful-link', changefreq: 'weekly', priority: 1.0 });

  // Add dynamic pages
  try {
    const dynamicPages = await fetchDynamicPages();
    dynamicPages.forEach((page) => smStream.write(page));

    const dynamicComponents = await fetchDynamicComponents();
    dynamicComponents.forEach((component) => smStream.write(component));
  } catch (error) {
    console.error('Error adding dynamic content to sitemap:', error);
  }

  smStream.end();

  // Write sitemap to file
  const writeStream = createWriteStream(join(__dirname, '../public/sitemap.xml.gz'));
  const sitemap = await streamToPromise(pipeline);
  writeStream.write(sitemap);
  writeStream.end();

  console.log('Sitemap generated successfully.');
}

// Run the script
generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error);
});
