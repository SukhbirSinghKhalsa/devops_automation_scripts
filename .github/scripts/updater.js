const { chromium } = require('playwright');
const path = require('path');

(async () => {
  // Path handling for Windows/Linux flexibility
  const resumePath = process.env.RESUME_PATH || path.join(process.cwd(), 'resume.pdf');
  
  const browser = await chromium.launch({ 
    headless: false, // Better for bypassing some detection on Windows agents
    args: ['--disable-blink-features=AutomationControlled'] 
  });

  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });

  // Stealth: Hide the automation signature
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  const page = await context.newPage();

  try {
    console.log('--- Step 1: Navigating to Naukri ---');
    await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'load' });

    console.log('--- Step 2: Entering Credentials ---');
    const userField = page.locator('input#usernameField');
    await userField.waitFor({ state: 'visible', timeout: 30000 });
    
    await userField.click();
    await page.keyboard.type(process.env.NAUKRI_EMAIL, { delay: 100 });

    await page.locator('input#passwordField').click();
    await page.keyboard.type(process.env.NAUKRI_PASSWORD, { delay: 100 });

    console.log('--- Step 3: Submitting Login ---');
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    try {
      await page.waitForURL('**/mnjuser/homepage**', { timeout: 20000 });
      console.log('--- Login Successful ---');
    } catch (e) {
      console.log('--- Login Redirect Failed. Checking for errors... ---');
      await page.screenshot({ path: 'login_fail_debug.png' });
      const errorText = await page.locator('.error-message, .er-msg').innerText().catch(() => 'No error text found');
      throw new Error(`Login failed. Page State: ${await page.title()}. Error on page: ${errorText}`);
    }

    console.log('--- Step 4: Navigating to Profile ---');
    await page.goto('https://www.naukri.com/mnjuser/profile', { waitUntil: 'networkidle' });

    console.log('--- Step 5: Uploading Resume ---');
    const fileInput = page.locator('input[type="file"]#attachCV');
    await fileInput.waitFor({ state: 'attached' });
    await fileInput.setInputFiles(resumePath);

    // Wait for the success toast/message
    await page.waitForSelector('.attachCV .update-msg, .save-msg', { state: 'visible', timeout: 20000 });
    console.log('✅ Success: Resume updated successfully!');

  } catch (error) {
    console.error('❌ ERROR CAUGHT:', error.message);
    await page.screenshot({ path: 'error_screenshot.png', fullPage: true });
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
