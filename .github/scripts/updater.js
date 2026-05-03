const { chromium } = require('playwright');
const path = require('path');

(async () => {
  // Use path from env or default to root
  const resumePath = process.env.RESUME_PATH || path.join(__dirname, '../../resume.pdf');
  
  // Launching with stealth settings
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();

  try {
    console.log('--- Step 1: Navigating to Login ---');
    await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'networkidle' });

    // Flexible locators for 2026 login UI
    const userField = page.locator('input#usernameField, input[placeholder*="Email"]');
    const passField = page.locator('input#passwordField, input[placeholder*="Password"]');

    await userField.waitFor({ state: 'visible', timeout: 15000 });
    
    console.log('--- Step 2: Entering Credentials ---');
    await userField.fill(process.env.NAUKRI_EMAIL);
    await passField.fill(process.env.NAUKRI_PASSWORD);
    
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForURL('**/mnjuser/homepage**', { timeout: 30000 })
    ]);

    console.log('--- Step 3: Navigating to Profile ---');
    await page.goto('https://www.naukri.com/mnjuser/profile', { waitUntil: 'networkidle' });

    // Naukri uses a specific hidden input for CV uploads
    const fileInput = page.locator('input[type="file"]#attachCV');
    await fileInput.waitFor({ state: 'attached' });
    
    console.log('--- Step 4: Uploading Resume ---');
    await fileInput.setInputFiles(resumePath);

    // Wait for the success toast or "Uploaded on..." text to refresh
    await page.waitForSelector('.attachCV .update-msg, .save-msg', { state: 'visible', timeout: 20000 });
    
    console.log('✅ Success: Resume updated successfully!');

  } catch (error) {
    console.error('❌ Workflow Failed!');
    // Save screenshot for GitHub Actions Artifacts to debug
    await page.screenshot({ path: 'naukri_error.png', fullPage: true });
    console.error(error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();