const puppeteer = require('puppeteer');
const urls = ['/', '/about', '/projects/lumix'];
const base = process.argv[2] || 'http://localhost:3003';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  for (const u of urls) {
    const url = base + u;
    console.log('Capturing', url);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    const name = u === '/' ? 'home' : u.replace(/\//g, '').replace('#', '-');
    const path = `/tmp/visual-${name}.png`;
    await page.screenshot({ path, fullPage: true });
    console.log('Saved', path);
  }
  await browser.close();
  console.log('Visual check completed successfully');
})();

process.on('unhandledRejection', (e) => {
  console.error('Unhandled rejection', e);
  process.exit(1);
});
