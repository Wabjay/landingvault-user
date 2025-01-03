"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sitemap_1 = require("sitemap");
const zlib_1 = require("zlib");
const fs_1 = require("fs");
const path_1 = require("path");
const store_1 = require("../src/store");
// Utility function to convert strings to slugs
const toSlug = (str) => str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)/g, ''); // Remove leading and trailing dashes
const toSlugWithoutPage = (str) => str
    .toLowerCase()
    .replace(/page$/i, '') // Remove "Page" at the end (case-insensitive)
    .trim() // Trim trailing whitespace
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)/g, ''); // Remove leading and trailing dashes
async function generateSitemap() {
    const smStream = new sitemap_1.SitemapStream({ hostname: 'https://www.landingvault.com' });
    const pipeline = smStream.pipe((0, zlib_1.createGzip)());
    const { components, pages } = (0, store_1.store)();
    // Manually add static pages
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    smStream.write({ url: '/contact-us-page', changefreq: 'weekly', priority: 1.0 });
    smStream.write({ url: '/about-us-page', changefreq: 'weekly', priority: 1.0 });
    smStream.write({ url: '/useful-link', changefreq: 'weekly', priority: 1.0 });
    // Add dynamic pages
    pages.forEach((page) => {
        const componentSlug = toSlug(page.componentType[0]);
        const brandSlug = toSlug(page.brandName);
        smStream.write({
            url: `/categories/${componentSlug}/${brandSlug}`,
            changefreq: 'weekly',
            priority: 0.7,
        });
    });
    // Add dynamic components
    components.data.forEach((component) => {
        const componentSlug = toSlugWithoutPage(component.name);
        smStream.write({
            url: `/${componentSlug}`,
            changefreq: 'weekly',
            priority: 0.7,
        });
    });
    smStream.end();
    // Write sitemap to file
    const writeStream = (0, fs_1.createWriteStream)((0, path_1.join)(__dirname, '../public/sitemap.xml.gz'));
    const sitemap = await (0, sitemap_1.streamToPromise)(pipeline);
    writeStream.write(sitemap);
    writeStream.end();
    console.log('Sitemap generated successfully.');
}
generateSitemap().catch(console.error);
