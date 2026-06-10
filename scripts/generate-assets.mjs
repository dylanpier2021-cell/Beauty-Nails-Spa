// Generates favicon, app icons, OG image and web manifest into /public.
// Run once with `npm run assets`; the output is committed and copied to /dist at build.
import sharp from 'sharp'
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')

const GOLD = '#CC9F33'
const GOLD_DARK = '#A17A22'
const GOLD_LIGHT = '#DCC388'
const CREAM = '#FDFCF8'
const CHARCOAL = '#2A2622'

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GOLD}"/>
      <stop offset="1" stop-color="${GOLD_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <text x="32" y="46" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-style="italic" font-weight="700" fill="${CREAM}" text-anchor="middle">B</text>
</svg>`

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${GOLD}"/>
      <stop offset="0.5" stop-color="${GOLD_LIGHT}"/>
      <stop offset="1" stop-color="${GOLD}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${CREAM}"/>
  <rect width="1200" height="12" fill="url(#gold)"/>
  <rect y="618" width="1200" height="12" fill="url(#gold)"/>
  <circle cx="1040" cy="150" r="220" fill="${GOLD}" opacity="0.08"/>
  <circle cx="170" cy="500" r="180" fill="${GOLD}" opacity="0.08"/>
  <text x="600" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="118" font-style="italic" fill="${GOLD_DARK}" text-anchor="middle">Beauty</text>
  <text x="600" y="330" font-family="Helvetica, Arial, sans-serif" font-size="52" letter-spacing="20" fill="${CHARCOAL}" text-anchor="middle">NAILS SPA</text>
  <rect x="540" y="372" width="120" height="3" fill="url(#gold)"/>
  <text x="600" y="430" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${CHARCOAL}" text-anchor="middle">Champaign County's Premier Luxury Nail Salon</text>
  <text x="600" y="490" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#7A736B" text-anchor="middle">Champaign, IL  ·  (217) 398-1898</text>
</svg>`

const manifest = {
  name: 'Beauty Nails Spa',
  short_name: 'Beauty Nails',
  description: "Champaign County's premier luxury nail salon.",
  start_url: '/',
  display: 'standalone',
  background_color: CREAM,
  theme_color: GOLD,
  icons: [
    { src: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
  ],
}

async function run() {
  await mkdir(pub, { recursive: true })
  const fav = Buffer.from(faviconSvg)
  const og = Buffer.from(ogSvg)

  await Promise.all([
    writeFile(join(pub, 'favicon.svg'), faviconSvg),
    sharp(fav).resize(32, 32).png().toFile(join(pub, 'favicon-32.png')),
    sharp(fav).resize(180, 180).png().toFile(join(pub, 'apple-touch-icon.png')),
    sharp(fav).resize(192, 192).png().toFile(join(pub, 'icon-192.png')),
    sharp(fav).resize(512, 512).png().toFile(join(pub, 'icon-512.png')),
    sharp(og).resize(1200, 630).png({ quality: 90 }).toFile(join(pub, 'og-image.png')),
    writeFile(join(pub, 'site.webmanifest'), JSON.stringify(manifest, null, 2)),
  ])

  console.log('Generated favicon, app icons, og-image.png and site.webmanifest in /public')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
