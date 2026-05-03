const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });

    try {
        console.log('--- Step 1: Sanitizing and Injecting Cookies ---');
        
        // 1. Parse and sanitize cookies
        let rawCookies = JSON.parse(process.env.NAUKRI_COOKIES);
        
        const sanitizedCookies = rawCookies.map(cookie => {
            // Playwright is strict about sameSite. Fix any invalid values.
            const validSameSite = ['Strict', 'Lax', 'None'].includes(cookie.sameSite) 
                ? cookie.sameSite 
                : 'Lax'; // Default to Lax if empty or invalid

            return {
                name: cookie.name,
                value: cookie.value,
                domain: cookie.domain.startsWith('.') ? cookie.domain : `.${cookie.domain}`,
                path: cookie.path || '/',
                expires: cookie.expirationDate || (Date.now() / 1000) + 3600 * 24 * 30, // Default 30 days
                httpOnly: cookie.httpOnly || false,
                secure: cookie.secure || false,
                sameSite: validSameSite
            };
        });

        await context.addCookies(sanitizedCookies);

        const page = await context.newPage();

        console.log('--- Step 2: Navigating to Profile ---');
        await page.goto('https://www.naukri.com/mnjuser/profile', { waitUntil: 'networkidle' });

        const profileTitle = await page.title();
        if (profileTitle.toLowerCase().includes("login")) {
            throw new Error("Cookies expired or domain mismatch. Redirected to Login.");
        }

        console.log('--- Logged in Successfully ---');

        // Step 3: Upload logic...
        const fileInput = page.locator('input[type="file"]#attachCV');
        await fileInput.waitFor({ state: 'attached' });
        await fileInput.setInputFiles(process.env.RESUME_PATH);
        await page.waitForSelector('.attachCV .update-msg, .save-msg', { state: 'visible' });

        console.log('✅ Success: Resume updated!');

    } catch (error) {
        console.error('❌ ERROR:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
