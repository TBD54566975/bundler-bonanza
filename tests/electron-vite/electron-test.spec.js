import { test, expect, _electron as electron } from '@playwright/test'

const SCREENSHOT_FOLDER = '../../playwright-report/electron-vite/screenshots'

test.describe('App Test Results', () => {
  let app
  let page

  test.beforeAll(async () => {
    app = await electron.launch({ args: ['.', '--no-sandbox'] })
    page = await app.firstWindow()
    await page.screenshot({ path: `${SCREENSHOT_FOLDER}/initial-load.png` })
  })

  test('main app should not present dwn error', async () => {
    const dwnError = await app.evaluate(async ({ app }) => app.getDwnError())
    console.error({ dwnError })
    expect(dwnError).toBeUndefined()
  })

  test('main app should not present web5 error', async () => {
    const web5Error = await app.evaluate(async ({ app }) => app.getWeb5Error())
    console.error({ web5Error })
    expect(web5Error).toBeUndefined()
  })

  test('should display Web5 results with success', async () => {
    await page.waitForSelector('#web5-results')
    const web5ResultsText = await page.textContent('#web5-results')
    await page.screenshot({ path: `${SCREENSHOT_FOLDER}/web5-loaded.png` })
    const web5Results = JSON.parse(web5ResultsText)
    expect(web5Results.success).toBe(true)
  })

  test('should display Dwn results with success', async () => {
    await page.waitForSelector('#dwn-results')
    const dwnResultsText = await page.textContent('#dwn-results')
    await page.screenshot({ path: `${SCREENSHOT_FOLDER}/dwn-loaded.png` })
    const dwnResults = JSON.parse(dwnResultsText)
    expect(dwnResults.success).toBe(true)
  })
})
