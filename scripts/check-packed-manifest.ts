import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

type PackResult = { filename: string }
type PackageManifest = {
  name?: string
  version?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
  name: string
  version: string
}
const destination = mkdtempSync(join(tmpdir(), 'aihu-ai-pack-'))

try {
  const output = execFileSync(
    'npm',
    ['pack', '--json', '--ignore-scripts', '--pack-destination', destination],
    { encoding: 'utf8' },
  )
  const [pack] = JSON.parse(output) as PackResult[]
  if (!pack?.filename) throw new Error('npm pack returned no tarball')

  const tarball = join(destination, pack.filename)
  const manifest = JSON.parse(
    execFileSync('tar', ['-xOf', tarball, 'package/package.json'], { encoding: 'utf8' }),
  ) as PackageManifest

  if (manifest.name !== packageJson.name || manifest.version !== packageJson.version) {
    throw new Error(
      `packed manifest identity mismatch: expected ${packageJson.name}@${packageJson.version}, ` +
        `got ${manifest.name ?? '<missing>'}@${manifest.version ?? '<missing>'}`,
    )
  }

  const allDependencies = {
    ...manifest.dependencies,
    ...manifest.devDependencies,
    ...manifest.peerDependencies,
  }
  const workspaceSpecs = Object.entries(allDependencies).filter(([, range]) =>
    range.startsWith('workspace:'),
  )
  if (workspaceSpecs.length > 0) {
    throw new Error(
      `packed manifest contains workspace specs: ${workspaceSpecs.map(([name]) => name).join(', ')}`,
    )
  }

  const entries = execFileSync('tar', ['-tzf', tarball], { encoding: 'utf8' })
  for (const expected of [
    'package/dist/index.js',
    'package/dist/index.d.ts',
    'package/README.md',
    'package/LICENSE',
  ]) {
    if (!entries.split('\n').includes(expected))
      throw new Error(`packed tarball is missing ${expected}`)
  }
  for (const forbidden of ['package/src/', 'package/tests/']) {
    if (entries.split('\n').some((entry) => entry.startsWith(forbidden))) {
      throw new Error(`packed tarball contains forbidden source tree ${forbidden}`)
    }
  }

  console.log(`packed manifest verified for ${manifest.name}@${manifest.version}`)
} finally {
  rmSync(destination, { recursive: true, force: true })
}
