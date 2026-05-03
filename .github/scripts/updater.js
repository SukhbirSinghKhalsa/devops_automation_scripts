const { chromium } = require('playwright');

(async () => {
  const resumePath = process.env.RESUME_PATH;
  
  // Launching with "headless: false" on a CI runner requires specific flags 
  // to avoid crashing since there is no actual monitor.
  const browser = await chromium.launch({ 
    headless: false, // You requested this
    args: ['--start-maximized'] 
  });

  const context = await browser.newContext({
    viewport: null, // Let it use the full "window" size
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();

  try {
    // Add a randomized delay to look more human
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    console.log('--- Navigating ---');
    await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'load' });
    await delay(2000);

    // Check if we are being blocked by a "Cloudflare" or "Verify you are human" page
    const title = await page.title();
    console.log(`Page Title: ${title}`);

    const userField = page.locator('input#usernameField');
    
    // If it still fails here, the screenshot will tell us if it's a CAPTCHA
    await userField.waitFor({ state: 'visible', timeout: 30000 });
    
    await userField.click();
    await page.keyboard.type(process.env.NAUKRI_EMAIL, { delay: 100 });
    
    await page.locator('input#passwordField').click();
    await page.keyboard.type(process.env.NAUKRI_PASSWORD, { delay: 100 });
    
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await page.waitForURL('**/mnjuser/homepage**', { timeout: 30000 });
    console.log('Login Success');

    // ... rest of the upload logic ...

  } catch (error) {
    await page.screenshot({ path: 'naukri_debug.png' });
    console.error('Failed at state:', await page.title());
    process.exit(1);
  } finally {
    await browser.close();
  }
})();