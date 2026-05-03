const { chromium } = require('playwright');

(async () => {
    // 1. Launch Browser
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });

    try {
        console.log('--- Step 1: Injecting Cookies ---');
        // Parse the secret from GitHub Env
        const cookies = JSON.parse(process.env.NAUKRI_COOKIES);
        
        // Ensure cookies are applied to the correct domain
        await context.addCookies(cookies);

        const page = await context.newPage();

        console.log('--- Step 2: Navigating Directly to Profile ---');
        // Bypass login page entirely
        await page.goto('https://www.naukri.com/mnjuser/profile', { waitUntil: 'networkidle' });

        // Verification: Check if we are actually logged in
        const profileTitle = await page.title();
        if (profileTitle.includes("Login")) {
            throw new Error("Cookies expired or invalid. Script redirected to Login page.");
        }
        console.log('--- Logged in as:', profileTitle.split('|')[0].trim(), '---');

        console.log('--- Step 3: Uploading Resume ---');
        const fileInput = page.locator('input[type="file"]#attachCV');
        await fileInput.waitFor({ state: 'attached', timeout: 10000 });
        
        // Use the path provided by GitHub Action
        await fileInput.setInputFiles(process.env.RESUME_PATH);

        // Wait for success message
        await page.waitForSelector('.attachCV .update-msg, .save-msg', { state: 'visible', timeout: 20000 });
        console.log('✅ Success: Resume updated via Cookie Injection!');

    } catch (error) {
        console.error('❌ ERROR:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
