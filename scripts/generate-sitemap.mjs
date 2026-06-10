// Post-build: walks /dist for rendered pages, writes sitemap.xml, and copies
// the pre-rendered 404 to /dist/404.html so static hosts serve a custom 404.
import { readdir, writeFile, stat, copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
// Keep in sync with SITE_URL in src/data/business.ts.
const SITE_URL = 'https://www.beautynailsspacu.com'

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (entry.name === 'index.html') {
      files.push(full)
    }
  }
  return files
}

function toRoute(file) {
  const rel = relative(dist, file).replace(/index\.html$/, '').replace(/\/$/, '')
  return '/' + rel
}

function priority(route) {
  if (route === '/') return '1.0'
  if (/^\/nail-salon-/.test(route)) return '0.8'
  if (/^\/blog\//.test(route)) return '0.6'
  if (/^\/(services|pricing|gallery|book|contact-us|beauty-nails-spa)/.test(route)) return '0.8'
  if (/^\/(manicure|pedicure|acrylic|gel-x|dip-powder|nail-|callus|nails)/.test(route)) return '0.8'
  return '0.6'
}

async function run() {
  try {
    await stat(dist)
  } catch {
    console.error('No /dist directory. Run the build first.')
    process.exit(1)
  }

  const files = await walk(dist)
  const today = new Date().toISOString().slice(0, 10)

  const routes = files
    .map(toRoute)
    // Exclude the 404 page, the /thank-you redirect, and the /home alias
    // (it canonicalizes to /) from the sitemap.
    .filter((r) => r !== '/404' && r !== '/thank-you' && r !== '/home')
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))

  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${SITE_URL}${route === '/' ? '/' : route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority(route)}</priority>\n  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  await writeFile(join(dist, 'sitemap.xml'), xml)

  // Copy the pre-rendered 404 to the root for host-level 404 handling.
  try {
    await copyFile(join(dist, '404', 'index.html'), join(dist, '404.html'))
  } catch {
    console.warn('Could not copy 404/index.html to 404.html (it may not exist).')
  }

  console.log(`Wrote sitemap.xml with ${routes.length} URLs.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
