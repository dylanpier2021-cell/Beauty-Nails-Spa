// Optimizes curated salon photos into responsive WebP files in /public/images.
// Re-run with `npm run photos` after adding or changing the source list.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(root, 'public', 'images')
const SRC = '/Users/dylanpierson2021/Desktop/Beauty Nails'

// outName -> source filename. Curated premium shots + real storefront/interior.
const nails = {
  'nails-01': 'unnamed - 2026-06-10T122314.017.jpg',
  'nails-02': 'unnamed - 2026-06-10T122314.091.jpg',
  'nails-03': 'unnamed - 2026-06-10T122314.213.jpg',
  'nails-04': 'unnamed - 2026-06-10T122314.831.jpg',
  'nails-05': 'unnamed - 2026-06-10T122314.837.jpg',
  'nails-06': 'unnamed - 2026-06-10T122315.091.jpg',
  'nails-07': 'unnamed - 2026-06-10T122317.888.jpg',
  'nails-08': 'unnamed - 2026-06-10T122318.675.jpg',
  'nails-09': 'unnamed - 2026-06-10T122318.711.jpg',
  'nails-10': 'unnamed - 2026-06-10T122318.803.jpg',
  'nails-11': 'unnamed (34).jpg',
  'nails-12': 'unnamed (50).jpg',
  'nails-13': 'unnamed - 2026-06-10T122318.555.jpg',
  'nails-14': 'unnamed - 2026-06-10T122314.053.jpg',
  'nails-15': 'unnamed (45).jpg',
  'nails-16': 'unnamed (51).jpg',
  'nails-17': 'unnamed - 2026-06-10T122314.079.jpg',
  'nails-18': 'unnamed - 2026-06-10T122315.085.jpg',
  'nails-19': 'unnamed - 2026-06-10T122315.451.jpg',
  'nails-20': 'unnamed - 2026-06-10T122315.455.jpg',
  'nails-21': 'unnamed - 2026-06-10T122313.909.jpg',
  'nails-22': 'unnamed - 2026-06-10T122320.024.jpg',
  'nails-23': 'unnamed - 2026-06-10T122318.583.jpg',
}

const salon = {
  hero: 'unnamed - 2026-06-10T122318.911.jpg',
  'storefront-sign': 'unnamed (52).jpg',
  'storefront-door': 'unnamed (74).jpg',
  'salon-wall': 'unnamed (32).jpg',
  'salon-pedicure': 'unnamed (71).jpg',
  'salon-stations': 'unnamed - 2026-06-10T122319.843.jpg',
}

// New stock photos for services with no truly representative real shot yet.
// Drop each source file (named exactly as below) into SRC, then run `npm run photos`.
// outName -> source filename. See the shopping list in the project notes for the
// kind of stock image each one should be.
const stock = {
  'pedicure-closeup': 'pedicure-closeup.jpg',
  'pedicure-gel': 'pedicure-gel.jpg',
  'pedicure-spa': 'pedicure-spa.jpg',
  'pedicure-deluxe': 'pedicure-deluxe.jpg',
  'pedicure-kids': 'pedicure-kids.jpg',
  'callus-treatment': 'callus-treatment.jpg',
  'dip-powder': 'dip-powder.jpg',
  'acrylic-fullset': 'acrylic-fullset.jpg',
  'acrylic-fillin': 'acrylic-fillin.jpg',
  'gel-x': 'gel-x.jpg',
  'nail-removal': 'nail-removal.jpg',
  'manicure-kids': 'manicure-kids.jpg',
}

async function emit(outName, srcFile, widths) {
  const input = join(SRC, srcFile)
  for (const w of widths) {
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(join(OUT, `${outName}-${w}.webp`))
  }
}

async function run() {
  await mkdir(OUT, { recursive: true })
  const jobs = []
  for (const [name, src] of Object.entries(nails)) jobs.push(emit(name, src, [400, 800]))
  for (const [name, src] of Object.entries(stock)) jobs.push(emit(name, src, [400, 800]))
  for (const [name, src] of Object.entries(salon)) {
    jobs.push(emit(name, src, name === 'hero' ? [560, 1000] : [400, 800]))
  }
  await Promise.all(jobs)
  const total = Object.keys(nails).length + Object.keys(stock).length + Object.keys(salon).length
  console.log(`Optimized ${total} photos into public/images.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
