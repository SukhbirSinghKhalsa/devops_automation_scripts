const { chromium } = require('playwright');

(async () => {
    // 1. Launch with stealth arguments
    const browser = await chromium.launch({ 
        headless: false, // Windows agent allows this, even if invisible to us
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox'
        ] 
    });

    const context = await browser.newContext({
        viewport: { width: 1366, height: 768 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });

    // 2. CRITICAL: Inject script to hide Playwright
    await context.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    const page = await context.newPage();

    try {
        console.log('--- Navigating to Naukri ---');
        // Go to the main site first to get a cookie, then to login
        await page.goto('https://www.naukri.com/', { waitUntil: 'networkidle' });
        await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'load' });

        console.log('--- Searching for Login Form ---');
        
        // Sometimes Naukri uses an iframe or lazy-loads the form. 
        // We wait for the 'usernameField' specifically.
        const userField = page.locator('input#usernameField');
        
        // Increase timeout to 45s for slow CI runners
        await userField.waitFor({ state: 'visible', timeout: 45000 });

        console.log('--- Form Found, Typing... ---');
        await userField.click();
        await page.keyboard.type(process.env.NAUKRI_EMAIL, { delay: 150 });

        await page.locator('input#passwordField').click();
        await page.keyboard.type(process.env.NAUKRI_PASSWORD, { delay: 150 });

        // Click login and wait for navigation
        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForURL('**/mnjuser/homepage**', { timeout: 30000 })
        ]);

        console.log('--- Login Successful ---');

        // Move to Profile
        await page.goto('https://www.naukri.com/mnjuser/profile', { waitUntil: 'networkidle' });

        // Upload Resume
        const fileInput = page.locator('input[type="file"]#attachCV');
        await fileInput.setInputFiles(process.env.RESUME_PATH);

        // Wait for the success message
        await page.waitForSelector('.attachCV .update-msg, .save-msg', { state: 'visible' });
        console.log('✅ Resume Updated Successfully');

    } catch (error) {
        console.error('--- ERROR CAUGHT ---');
        const currentURL = page.url();
        console.log('Final URL before failure:', currentURL);
        
        // Capture a screenshot to see what the bot actually saw
        await page.screenshot({ path: 'final_debug_state.png', fullPage: true });
        process.exit(1);
    } finally {
        await browser.close();
    }
})();