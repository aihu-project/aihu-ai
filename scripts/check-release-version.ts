import { readFile } from 'node:fs/promises'

const tag = process.argv[2]
if (!tag) throw new Error('usage: bun scripts/check-release-version.ts v<package-version>')

const packageJson = JSON.parse(await readFile('package.json', 'utf8')) as { version: string }
const expected = `v${packageJson.version}`
if (tag !== expected) {
  throw new Error(`release tag ${tag} does not match package version ${expected}`)
}

console.log(`release tag ${tag} matches @aihu/ai@${packageJson.version}`)
