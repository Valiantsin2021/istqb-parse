import { expect, test } from '@playwright/test'
import fs from 'fs/promises'

const filepath = './istqb.json'

test(`Scrape all ISTQB terms`, async ({ page }) => {
  test.setTimeout(1_600_000)
  const terms = {}
  await page.goto('https://glossary.istqb.org/en_US/search')
  await page.getByText('I agree').click()
  await page.waitForLoadState('domcontentloaded')
  await expect(page.getByText('All terms')).toBeVisible()
  await page.evaluate(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    for (let i = 0; i < document.body.scrollHeight; i += 100) {
      window.scrollTo(0, i)
      await delay(100)
    }
  })
  const keys = await page.locator('a h3').all()
  const values = await page.locator('a p').all()
  console.log(`Found ${keys.length} terms. Scrapping...`)
  for (let i = 0; i < keys.length; i++) {
    terms[await keys[i].innerText()] = await values[i].innerText()
  }
  console.log(`Saving ${keys.length} terms to ${filepath}...`)
  await fs.writeFile(filepath, JSON.stringify(terms, null, 2))
})
