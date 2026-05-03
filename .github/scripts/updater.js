const { chromium } = require('playwright');
const path = require('path');

(async () => {
  // Use the path provided by the workflow, or default to local dir
  const resumePath = process.env.RESUME_PATH || path.join(__dirname, '../../resume.pdf');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Starting Naukri update workflow...');
    await page.goto('https://www.naukri.com/nlogin/login');
    
    await page.fill('#usernameField', process.env.NAUKRI_EMAIL);
    await page.fill('#passwordField', process.env.NAUKRI_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for login to complete
    await page.waitForURL('**/mnjuser/homepage**');
    
    // Navigate to profile
    await page.goto('https://www.naukri.com/mnjuser/profile');

    // Upload using the file path passed from the runner
    const inputFile = await page.locator('input[type="file"]#attachCV');
    await inputFile.setInputFiles(resumePath);

    await page.waitForSelector('.attachCV .update-msg', { state: 'visible' });
    console.log('Success: Resume updated from ' + resumePath);

  } catch (error) {
    console.error('Workflow failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();