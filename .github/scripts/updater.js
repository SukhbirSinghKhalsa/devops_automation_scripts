const { chromium } = require('playwright');

(async () => {
    console.log('🚀 Starting Naukri Automation...');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });

    try {
        // --- Step 1: Cookie Injection ---
        console.log('Step 1: Injecting Session Cookies...');
        let rawCookies = JSON.parse(process.env.NAUKRI_COOKIES);
        const sanitizedCookies = rawCookies.map(cookie => ({
            ...cookie,
            sameSite: ['Strict', 'Lax', 'None'].includes(cookie.sameSite) ? cookie.sameSite : 'Lax',
            domain: cookie.domain.startsWith('.') ? cookie.domain : `.${cookie.domain}`
        }));

        await context.addCookies(sanitizedCookies);
        const page = await context.newPage();

        // --- Step 2: Navigate to Homepage ---
        console.log('Step 2: Navigating to Dashboard...');
        await page.goto('https://www.naukri.com/mnjuser/homepage', { waitUntil: 'load', timeout: 60000 });
        
        // Safety Delay for SPA rendering
        console.log('⏱️ Waiting 5 seconds for dashboard elements to load...');
        await page.waitForTimeout(5000);

        // --- Step 3: Click "View Profile" ---
        console.log('Step 3: Looking for "View Profile" link...');
        const viewProfileBtn = page.locator('a[href="/mnjuser/profile"]:has-text("View profile")');
        
        if (await viewProfileBtn.count() > 0) {
            console.log('✅ "View Profile" link found. Clicking...');
            await viewProfileBtn.click();
        } else {
            console.log('⚠️ Could not find "View Profile" link. Attempting direct navigation to profile...');
            await page.goto('https://www.naukri.com/mnjuser/profile', { waitUntil: 'load' });
        }

        // --- Step 4: Profile Page Warmup ---
        console.log('Step 4: Arrived at Profile page. Waiting for upload section...');
        await page.waitForURL('**/mnjuser/profile**', { timeout: 30000 });
        
        // Crucial delay: Naukri profile pages often "flicker" while loading data
        await page.waitForTimeout(5000); 

        // --- Step 5: Locate and Upload ---
        console.log('Step 5: Scrolling to find the Resume Upload section...');
        const uploadSection = page.locator('#attachCV');
        await uploadSection.scrollIntoViewIfNeeded();

        console.log('📤 Preparing to upload file from path:', process.env.RESUME_PATH);
        
        // Wait for the specific input ID you provided
        await uploadSection.waitFor({ state: 'attached', timeout: 20000 });
        
        // Perform the upload
        await uploadSection.setInputFiles(process.env.RESUME_PATH);
        console.log('⏳ Upload triggered. Waiting for Naukri to process the file...');

        // --- Step 6: Success Verification ---
        // We look for the "Update resume" button or the success toast
        const successMsg = page.locator('.update-msg, .save-msg, text="successfully uploaded"').first();
        
        try {
            await successMsg.waitFor({ state: 'visible', timeout: 30000 });
            console.log('✅ SUCCESS: Resume updated successfully at ' + new Date().toLocaleString());
        } catch (e) {
            console.log('⚠️ Success message not seen, but upload was triggered. Taking final screenshot...');
            await page.screenshot({ path: 'final_state.png', fullPage: true });
        }

    } catch (error) {
        console.error('❌ CRITICAL ERROR:', error.message);
        // Take a screenshot on failure to debug via GitHub Artifacts
        if (typeof page !== 'undefined') {
            await page.screenshot({ path: 'error_screenshot.png', fullPage: true });
            console.log('📸 Error screenshot saved as error_screenshot.png');
        }
        process.exit(1);
    } finally {
        console.log('🧹 Closing browser session...');
        await browser.close();
    }
})();
