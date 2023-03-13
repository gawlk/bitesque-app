import { parse } from 'node-html-parser'

export const fetchRSSJSONFromURL = async (url: string) => {
  console.log(`RSS ${url}`)

  return (await import('rss-to-json')).parse(url)
}

export const fetchFaviconURLFromURL = async (url: string) => {
  const origin = new URL(url).origin

  const links = (
    (await (
      await (await fetch(origin)).text()
    ).match(/<link.*href=".+\.(ico|png)"/gm)) || []
  )
    .map((link) => link.split('>'))
    .flat()

  const link =
    links.find((link) => link.includes('rel="apple-touch-icon"')) ||
    links.find((link) => link.includes('type="image/x-icon"')) ||
    links.find((link) => link.includes('.ico')) ||
    ''

  const href = link.split('href="').at(1)?.split('"').at(0) || ''

  // console.log(url, links, href)

  const final = href.startsWith('http')
    ? href
    : `${origin}${href || '/favicon.ico'}`

  const imageUrlData = await fetch(final)

  const buffer = await imageUrlData.arrayBuffer()

  const stringifiedBuffer = Buffer.from(buffer).toString('base64')

  const contentType = imageUrlData.headers.get('content-type')

  return `data:image/${contentType};base64,${stringifiedBuffer}`
}

export const fetchOrdinalsPreviews = async () => {
  try {
    const url = 'https://ordinals.com'

    const text = await (await fetch(`${url}/inscriptions`)).text()

    return [...parse(text).getElementsByTagName('iframe')].map(
      (element) => `${url}${element.rawAttributes.src}`
    )
  } catch (error) {
    console.log(error)

    return []
  }
}
