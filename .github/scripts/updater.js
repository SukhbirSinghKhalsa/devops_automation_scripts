const { chromium } = require('playwright');

(async () => {
    console.log('🚀 Starting Naukri Automation...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });

    try {
        console.log('Step 1: Injecting Session Cookies...');
        let rawCookies = JSON.parse(process.env.NAUKRI_COOKIES);
        
        const sanitizedCookies = rawCookies.map(cookie => ({
            name: cookie.name,
            value: cookie.value,
            // Ensure domain is broad enough for all naukri subdomains
            domain: '.naukri.com', 
            path: '/',
            secure: true,
            sameSite: 'Lax'
        }));

        await context.addCookies(sanitizedCookies);
        const page = await context.newPage();

        // 1. Visit the root domain first to "activate" the session
        console.log('Step 2: Warming up session at root domain...');
        await page.goto('https://www.naukri.com/', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);

        // 2. Now navigate to the profile directly
        console.log('Step 3: Navigating directly to Profile page...');
        await page.goto('https://www.naukri.com/mnjuser/profile', { waitUntil: 'load' });
        
        // 3. CHECK: Are we still logged in?
        const currentUrl = page.url();
        console.log('Current URL:', currentUrl);
        if (currentUrl.includes('nlogin')) {
            throw new Error("Redirected to Login! Your cookies are likely invalid or expired.");
        }

        console.log('Step 4: Waiting for Profile UI to settle...');
        await page.waitForTimeout(7000); // Heavy SPA load time

        // 4. Locate the upload element
        console.log('Step 5: Locating the #attachCV input...');
        const fileInput = page.locator('input#attachCV');
        
        // Check if it exists before trying to scroll
        const isExisting = await fileInput.count();
        if (isExisting === 0) {
            console.log('⚠️ #attachCV not found. Taking debug screenshot...');
            await page.screenshot({ path: 'profile_not_found.png', fullPage: true });
            
            // Log all input IDs on the page to help debug
            const ids = await page.evaluate(() => Array.from(document.querySelectorAll('input')).map(i => i.id));
            console.log('Available input IDs on this page:', ids.filter(id => id));
            
            throw new Error("Target element #attachCV was not found on the profile page.");
        }

        console.log('Step 6: Uploading File...');
        await fileInput.setInputFiles(process.env.RESUME_PATH);

        // 5. Final Verification
        await page.waitForTimeout(5000);
        console.log('✅ Upload command sent. Check your profile for updates.');
        await page.screenshot({ path: 'final_check.png' });

    } catch (error) {
        console.error('❌ CRITICAL ERROR:', error.message);
        if (typeof page !== 'undefined') {
            await page.screenshot({ path: 'error_screenshot.png', fullPage: true });
        }
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
