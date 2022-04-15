import puppeteer from 'puppeteer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const addToDb = async (name: string, gameDescription: string, effect: string, imgUrl: string, weight: number, value: number) => {
  return await prisma.item.create({
    data: {
      name, gameDescription, effect, imgUrl, weight, value
    }
  })
}

(async () => {

  const BASE_URL: string = "https://dragonsdogma.fandom.com"

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`${BASE_URL}/wiki/Category:Curatives`)
  await page.waitForSelector('.category-page__members')

  const linkList = await page.$$eval('.category-page__member-link', el => el.map(link => {
    if (link.innerHTML.includes("Category")) return
    return link.getAttribute("href")
  }))

  for(const link of linkList) {
    if(link) {
      await page.goto(`${BASE_URL}${link}`)
      await page.waitForSelector('.page-content')
      
      try {
        const name = await page.$eval('aside.portable-infobox > h2', text => text.innerHTML) 
        const gameDescription = await page.$eval('dl > dd > i', text => text.innerHTML)
        const effect = await page.$eval('dl + p', text => text.innerHTML.replace(/<[^>]*>/g, ''))
        const imgUrl = await page.$eval('img.pi-image-thumbnail', img => img.getAttribute('src')!.split("/revision")[0])
        const weight = await page.$eval('section.pi-item > div > div', text => Number(text.innerHTML.replace(",", ".")))
        const value = await page.$eval('section.pi-item > div + div + div > div', text => 
          Number(
            text.innerHTML
              .split(" ")[0]
              .replace(",", "").replace(".", "")
            )
        ) // 🥵

        const result = await Promise.all([
          await addToDb(name, gameDescription, effect, String(imgUrl), weight, value)
        ])

        console.log(`${BASE_URL}${link} added: ${JSON.stringify(result)}\n`)

      } catch(e) {
        console.error(e)
      }

    }
  }

  await browser.close();
})();