const { chromium } = require('playwright');

(async () => {
    const resumePath = process.env.RESUME_PATH;
    
    const browser = await chromium.launch({ 
        headless: false, 
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--disable-infobars',
            '--window-position=0,0'
        ] 
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });

    // Remove the automation flag
    await context.addInitScript(() => {
        delete navigator.webdriver;
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    const page = await context.newPage();

    try {
        console.log('--- Navigating with Session Warmup ---');
        // Visit homepage first to look like a natural entry
        await page.goto('https://www.naukri.com/', { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'load' });

        const userField = page.locator('input#usernameField');
        await userField.waitFor({ state: 'visible', timeout: 30000 });

        console.log('--- Emulating Human Input ---');
        await userField.click();
        // Slower, more erratic typing
        for (const char of process.env.NAUKRI_EMAIL) {
            await page.keyboard.type(char, { delay: Math.random() * 100 + 50 });
        }

        const passField = page.locator('input#passwordField');
        await passField.click();
        for (const char of process.env.NAUKRI_PASSWORD) {
            await page.keyboard.type(char, { delay: Math.random() * 100 + 50 });
        }

        await page.waitForTimeout(1000); // Wait before clicking

        console.log('--- Submitting Login ---');
        // Use a more generic button selector in case ID changes
        const loginBtn = page.locator('button[type="submit"], .login-button').first();
        
        // Use 'Promise.all' only if you are sure about the redirect, 
        // otherwise, click and wait manually.
        await loginBtn.click();

        // 15-second grace period for the dashboard to load
        await page.waitForURL('**/mnjuser/homepage**', { timeout: 15000 });
        console.log('--- Login Confirmed ---');

        // Proceed to upload...
        await page.goto('https://www.naukri.com/mnjuser/profile');
        const fileInput = page.locator('input[type="file"]#attachCV');
        await fileInput.setInputFiles(resumePath);
        await page.waitForSelector('.attachCV .update-msg, .save-msg', { state: 'visible' });
        
        console.log('✅ Update Complete');

    } catch (error) {
        console.error('--- Failure Investigation ---');
        // Take a "Snap" of the screen at the moment of failure
        await page.screenshot({ path: 'login_failure.png', fullPage: true });
        
        // Log the current URL - if it's still the login page, the click was ignored
        console.log('Current URL:', page.url());
        
        // Log any visible text that might be an error hidden in the DOM
        const bodyText = await page.innerText('body');
        if (bodyText.includes("OTP")) console.log("Detected: Site is asking for OTP!");
        if (bodyText.includes("robot")) console.log("Detected: Bot challenge active!");
        
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
