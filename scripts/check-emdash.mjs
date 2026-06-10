// Fails if an em dash or en dash appears in source files. Hyphens are allowed.
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative, extname } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDirs = [join(root, 'src')]
const exts = new Set(['.ts', '.tsx', '.css', '.html', '.mjs'])
const banned = /[—–]/ // em dash, en dash

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (exts.has(extname(entry.name))) out.push(full)
  }
  return out
}

let hits = 0
for (const dir of srcDirs) {
  for (const file of await walk(dir)) {
    const text = await readFile(file, 'utf8')
    const lines = text.split('\n')
    lines.forEach((line, i) => {
      if (banned.test(line)) {
        hits++
        console.log(`${relative(root, file)}:${i + 1}: ${line.trim()}`)
      }
    })
  }
}

if (hits > 0) {
  console.error(`\nFound ${hits} line(s) with an em dash or en dash. Replace with commas, periods, or "and".`)
  process.exit(1)
}
console.log('No em dashes or en dashes found in source.')
