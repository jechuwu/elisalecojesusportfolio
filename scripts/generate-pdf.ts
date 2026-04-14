import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

/**
 * CONFIGURATION
 * Optimized for MacBook Pro 14" (1512 x 982 scaled resolution)
 */
const BASE_URL = 'http://localhost:3000';
const EXPORT_DIR = path.join(process.cwd(), 'exports');
const VIEWPORT_WIDTH = 1512;
const VIEWPORT_HEIGHT = 982;

const ROUTES = [
  '/',
  '/about',
  '/projects/lumix',
  '/projects/puriform',
];

async function generatePDF() {
  console.log('🚀 Starting Refined PDF generation (14" Mac Standard)...');

  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR);
    console.log(`📁 Created directory: ${EXPORT_DIR}`);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set standard Mac 14" viewport
  await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT, deviceScaleFactor: 2 });

  for (const route of ROUTES) {
    const filename = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
    const url = `${BASE_URL}${route}`;
    const outputPath = path.join(EXPORT_DIR, `${filename}.pdf`);

    console.log(`📄 Capturing ${route} (Desktop 1512px) -> ${filename}.pdf`);

    try {
      await page.goto(url, { waitUntil: 'load', timeout: 90000 }); // Increase timeout

      // Force dark mode
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' },
      ]);

      // Scroll to trigger all lazy loads and animations
      console.log(`   ...scrolling ${route}`);
      await autoScroll(page);

      // CRITICAL: Wait for all images to be decoded and loaded
      console.log(`   ...waiting for images in ${route}`);
      await page.evaluate(async () => {
        const selectors = Array.from(document.querySelectorAll('img'));
        await Promise.all(selectors.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Continue anyway if error
            setTimeout(resolve, 5000); // Max 5s per image
          });
        }));
      });

      // Extra stabilization delay for Framer Motion / Text effects
      await new Promise(r => setTimeout(r, 5000));

      // Get real document height after scroll and stabilization
      const height = await page.evaluate(() => document.documentElement.scrollHeight);

      await page.pdf({
        path: outputPath,
        printBackground: true,
        width: `${VIEWPORT_WIDTH}px`,
        height: `${height}px`,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        preferCSSPageSize: false,
      });

      console.log(`✅ Saved: ${outputPath} [Height: ${height}px]`);
    } catch (error) {
      console.error(`❌ Error capturing ${route}:`, error);
    }
  }

  await browser.close();
  console.log('✨ PDF refinement complete!');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function autoScroll(page: any) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // Reset to top for capture
          resolve(null);
        }
      }, 50);
    });
  });
}

generatePDF();
