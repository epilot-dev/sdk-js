#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs'
import { resolve, dirname } from 'path'

const OVERRIDES_PATH = '.epilot/sdk-overrides.json'

const usage = () => {
  console.log(`
epilot-sdk CLI

Commands:
  override                              Apply all overrides from ${OVERRIDES_PATH}
  override <api-name> <spec-path>       Override or register a single API
  typegen                               Regenerate types from current specs

Examples:
  npx epilot-sdk override
  npx epilot-sdk override entity ./my-entity-spec.yaml
  npx epilot-sdk override myNewApi ./specs/my-new-api.yaml
  npx epilot-sdk typegen
`)
}

const readOverrides = (): Record<string, string> => {
  const filePath = resolve(process.cwd(), OVERRIDES_PATH)
  if (!existsSync(filePath)) return {}
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

const writeOverrides = (overrides: Record<string, string>) => {
  const filePath = resolve(process.cwd(), OVERRIDES_PATH)
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, JSON.stringify(overrides, null, 2) + '\n')
}

const fetchSpec = async (specPath: string): Promise<string> => {
  if (specPath.startsWith('http://') || specPath.startsWith('https://')) {
    const response = await fetch(specPath)
    if (!response.ok) throw new Error(`Failed to fetch ${specPath}: ${response.statusText}`)
    return await response.text()
  }

  const absolutePath = resolve(process.cwd(), specPath)
  if (!existsSync(absolutePath)) throw new Error(`Spec file not found: ${absolutePath}`)
  return readFileSync(absolutePath, 'utf-8')
}

const overrideCmd = async (args: string[]) => {
  if (args.length === 2) {
    // Single API override: override <name> <path>
    const [apiName, specPath] = args
    const overrides = readOverrides()
    overrides[apiName] = specPath
    writeOverrides(overrides)
    console.log(`Added override: ${apiName} -> ${specPath}`)
    console.log(`Run 'npx epilot-sdk typegen' to regenerate types.`)
    return
  }

  // Apply all overrides
  const overrides = readOverrides()
  const entries = Object.entries(overrides)

  if (entries.length === 0) {
    console.log(`No overrides found in ${OVERRIDES_PATH}`)
    console.log(`Create one with: npx epilot-sdk override <api-name> <spec-path>`)
    return
  }

  console.log(`Applying ${entries.length} override(s)...`)

  for (const [apiName, specPath] of entries) {
    try {
      console.log(`  ${apiName}: ${specPath}`)
      const spec = await fetchSpec(specPath)

      // Write spec to local overrides directory
      const overridesDir = resolve(process.cwd(), '.epilot/specs')
      mkdirSync(overridesDir, { recursive: true })

      const destPath = resolve(overridesDir, `${apiName}.json`)

      // Convert YAML to JSON if needed (basic check)
      if (specPath.endsWith('.yaml') || specPath.endsWith('.yml')) {
        console.log(`    Note: YAML specs should be converted to JSON. Saving as-is.`)
      }

      writeFileSync(destPath, spec)
      console.log(`    -> .epilot/specs/${apiName}.json`)
    } catch (err) {
      console.error(`    Error: ${(err as Error).message}`)
    }
  }

  console.log(`\nDone. Run 'npx epilot-sdk typegen' to regenerate types.`)
}

const typegenCmd = async () => {
  try {
    const { execSync } = await import('child_process')

    const specsDir = resolve(process.cwd(), '.epilot/specs')
    if (!existsSync(specsDir)) {
      console.log('No override specs found. Run "npx epilot-sdk override" first.')
      return
    }

    const { readdirSync } = await import('fs')
    const specs = readdirSync(specsDir).filter((f) => f.endsWith('.json'))

    const typesDir = resolve(process.cwd(), '.epilot/types')
    mkdirSync(typesDir, { recursive: true })

    for (const spec of specs) {
      const apiName = spec.replace('.json', '')
      const specPath = resolve(specsDir, spec)
      const typesPath = resolve(typesDir, `${apiName}.d.ts`)

      console.log(`Generating types for ${apiName}...`)
      try {
        execSync(
          `npx openapi-client-axios-typegen ${specPath} --client -b '/* eslint-disable */' > ${typesPath}`,
          { stdio: 'pipe' },
        )
        console.log(`  -> .epilot/types/${apiName}.d.ts`)
      } catch (err) {
        console.error(`  Error generating types for ${apiName}: ${(err as Error).message}`)
      }
    }

    console.log('\nDone. Types generated in .epilot/types/')
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`)
  }
}

const main = async () => {
  const [, , command, ...args] = process.argv

  switch (command) {
    case 'override':
      await overrideCmd(args)
      break
    case 'typegen':
      await typegenCmd()
      break
    case 'help':
    case '--help':
    case '-h':
      usage()
      break
    default:
      usage()
      process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
