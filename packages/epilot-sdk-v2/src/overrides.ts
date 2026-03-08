import type { Document } from 'openapi-client-axios'

import { registerApi } from './registry'
import type { ApiEntry, OverridesConfig } from './types'

const OVERRIDES_PATH = '.epilot/sdk-overrides.json'

let _loaded = false

const createSpecLoader = (specPath: string, baseDir: string): (() => Promise<Document>) => {
  if (specPath.startsWith('http://') || specPath.startsWith('https://')) {
    return async () => {
      const response = await fetch(specPath)
      return (await response.json()) as Document
    }
  }

  return async () => {
    const { readFileSync } = await import('fs')
    const { resolve } = await import('path')
    const absolutePath = resolve(baseDir, specPath)
    const content = readFileSync(absolutePath, 'utf-8')
    return JSON.parse(content) as Document
  }
}

/**
 * Lazily loads overrides from .epilot/sdk-overrides.json.
 * Only performs filesystem reads on first call - subsequent calls are no-ops.
 * Safe to call in browser environments (fs import is deferred).
 */
export const loadOverrides = (registry: Map<string, ApiEntry>) => {
  if (_loaded) return
  _loaded = true

  try {
    // Guard against browser environments
    if (typeof process === 'undefined' || typeof process.cwd !== 'function') return

    // Lazy require to avoid top-level fs import (tree-shaking friendly)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs') as typeof import('fs')
    const path = require('path') as typeof import('path')

    // Search up from cwd for overrides file
    let dir = process.cwd()
    let overridesFile: string | null = null
    while (true) {
      const candidate = path.resolve(dir, OVERRIDES_PATH)
      if (fs.existsSync(candidate)) {
        overridesFile = candidate
        break
      }
      const parent = path.dirname(dir)
      if (parent === dir) break
      dir = parent
    }

    if (!overridesFile) return

    const baseDir = path.dirname(overridesFile)
    const overrides: OverridesConfig = JSON.parse(fs.readFileSync(overridesFile, 'utf-8'))

    for (const [name, specPath] of Object.entries(overrides)) {
      const loader = createSpecLoader(specPath, baseDir)

      const existing = registry.get(name)
      if (existing) {
        existing.loader = loader
        existing.instance = null
      } else {
        registerApi({ registry, name, loader })
      }
    }
  } catch {
    // Silently ignore - overrides are optional
  }
}

/** Reset override loading state (for testing) */
export const _resetOverrides = () => {
  _loaded = false
}
