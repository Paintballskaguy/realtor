import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Users\\jwils\\.cache\\puppeteer\\chrome\\win64-127.0.6533.88\\chrome-win64\\chrome.exe';
const URL = 'https://www.century21.com/agent/detail/ok/tulsa/agents/kandice-nowak/aid-P00200000FPZlyXPPYO5QnomfFL62lVElK8Burxj';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for content to render
    await page.waitForSelector('h1, img', { timeout: 10000 }).catch(() => {});

    // Take a screenshot for reference
    await page.screenshot({ path: 'scripts/agent-page.png', fullPage: false });

    const data = await page.evaluate(() => {
      const getText = (sel) => {
        const el = document.querySelector(sel);
        return el ? el.innerText.trim() : null;
      };

      const getAttr = (sel, attr) => {
        const el = document.querySelector(sel);
        return el ? el.getAttribute(attr) : null;
      };

      const name = getText('h1');
      const phone = getText('a[href^="tel:"]');
      const email = getAttr('a[href^="mailto:"]', 'href')?.replace('mailto:', '');

      // Office info
      const officeEl = document.querySelector('[class*="office"], [class*="Office"]');
      const office = officeEl ? officeEl.innerText.trim() : null;

      // Better photo logic: look for profile/agent images, avoid tracking pixels
      const allImages = Array.from(document.querySelectorAll('img'));
      const agentImages = allImages.filter(img => {
        const src = img.src || '';
        const cls = img.className || '';
        const alt = img.alt || '';
        const w = img.naturalWidth || img.width || 0;
        // Exclude tiny images (tracking pixels) and adroll
        if (src.includes('adroll') || src.includes('doubleclick') || src.includes('googleads')) return false;
        if (w > 0 && w < 80) return false;
        return (
          alt.toLowerCase().includes('agent') ||
          alt.toLowerCase().includes('profile') ||
          alt.toLowerCase().includes(name?.toLowerCase() || '') ||
          cls.toLowerCase().includes('agent') ||
          cls.toLowerCase().includes('profile') ||
          cls.toLowerCase().includes('avatar') ||
          src.includes('agent') ||
          src.includes('profile')
        );
      });

      // Sort by size descending, pick biggest (likely the main agent photo)
      agentImages.sort((a, b) => {
        const aw = a.naturalWidth || a.width || 0;
        const bw = b.naturalWidth || b.width || 0;
        return bw - aw;
      });

      const photo = agentImages[0]?.src || null;

      // Bio
      let bio = getText('[class*="bio"]') || getText('[class*="about"]') || getText('[class*="description"]');
      if (!bio) {
        // Try paragraphs near the name
        const h1 = document.querySelector('h1');
        if (h1) {
          let sibling = h1.parentElement?.nextElementSibling || h1.nextElementSibling;
          while (sibling && !bio) {
            if (sibling.innerText.length > 50) {
              bio = sibling.innerText.trim();
            }
            sibling = sibling.nextElementSibling;
          }
        }
      }

      // Social links (specific to agent, not generic company)
      const social = {};
      document.querySelectorAll('a[href*="facebook"], a[href*="linkedin"], a[href*="instagram"]').forEach(a => {
        const href = a.href;
        // Only include if it looks like a personal/agent page, not generic company
        if (href.includes('century21')) return;
        if (href.includes('facebook')) social.facebook = href;
        if (href.includes('linkedin')) social.linkedin = href;
        if (href.includes('instagram')) social.instagram = href;
      });

      // Also grab any reviews/ratings
      const ratingEl = document.querySelector('[class*="rating"], [class*="Rating"], [class*="star"]');
      const rating = ratingEl ? ratingEl.innerText.trim() : null;

      return { name, phone, email, office, photo, bio, social, rating, url: window.location.href };
    });

    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Scrape error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
