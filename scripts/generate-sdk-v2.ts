#!/usr/bin/env tsx

/**
 * Generates the epilot-sdk v2 package files from existing clients:
 * - Copies openapi-runtime.json definitions
 * - Copies openapi.d.ts type files
 * - Generates per-API lazy loader files (apis/*.ts)
 * - Generates the API registry (apis/_registry.ts)
 * - Updates package.json subpath exports
 */

import { readdirSync, existsSync, copyFileSync, writeFileSync, readFileSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'
import { dereferenceSync } from 'dereference-json-schema'
import { mock } from 'mock-json-schema'

const ROOT = resolve(__dirname, '..')
const CLIENTS_DIR = resolve(ROOT, 'clients')
const V2_DIR = resolve(ROOT, 'packages/epilot-sdk-v2')
const DEFS_DIR = resolve(V2_DIR, 'src/definitions')
const TYPES_DIR = resolve(V2_DIR, 'src/types')
const APIS_DIR = resolve(V2_DIR, 'src/apis')

// Map client directory name -> SDK api name (camelCase)
const toCamelCase = (name: string): string => {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

type ClientInfo = {
  dirName: string // e.g. "entity-client"
  apiName: string // e.g. "entity" (camelCase, used for JS identifiers & registry keys)
  kebabName: string // e.g. "entity" or "entity-mapping" (kebab-case, used for file names & exports)
  hasDefinition: boolean
  hasTypes: boolean
}

const discoverClients = (): ClientInfo[] => {
  const dirs = readdirSync(CLIENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.endsWith('-client'))
    .map((d) => d.name)

  return dirs.map((dirName) => {
    const baseName = dirName.replace(/-client$/, '')
    const apiName = toCamelCase(baseName)
    const clientDir = resolve(CLIENTS_DIR, dirName, 'src')

    return {
      dirName,
      apiName,
      kebabName: baseName, // baseName is already kebab-case (e.g. "entity-mapping")
      hasDefinition: existsSync(resolve(clientDir, 'openapi-runtime.json')),
      hasTypes: existsSync(resolve(clientDir, 'openapi.d.ts')),
    }
  })
}

const copyDefinitions = (clients: ClientInfo[]) => {
  mkdirSync(DEFS_DIR, { recursive: true })

  for (const client of clients) {
    if (!client.hasDefinition) continue
    const src = resolve(CLIENTS_DIR, client.dirName, 'src/openapi-runtime.json')
    const dest = resolve(DEFS_DIR, `${client.kebabName}.json`)
    copyFileSync(src, dest)
  }
}

const copyTypes = (clients: ClientInfo[]) => {
  mkdirSync(TYPES_DIR, { recursive: true })

  for (const client of clients) {
    if (!client.hasTypes) continue
    const src = resolve(CLIENTS_DIR, client.dirName, 'src/openapi.d.ts')
    let content = readFileSync(src, 'utf-8')

    // Replace openapi-client-axios import paths if needed
    content = `/* Auto-copied from ${client.dirName} */\n${content}`

    const dest = resolve(TYPES_DIR, `${client.kebabName}.d.ts`)
    writeFileSync(dest, content)
  }
}

type SchemaDoc = {
  name: string
  description: string
  shape: string
}

const extractSchemaTypes = (client: ClientInfo): SchemaDoc[] => {
  const fullSpecPath = resolve(CLIENTS_DIR, client.dirName, 'src/openapi.json')
  const runtimeSpecPath = resolve(CLIENTS_DIR, client.dirName, 'src/openapi-runtime.json')
  const specPath = existsSync(fullSpecPath) ? fullSpecPath : runtimeSpecPath
  if (!existsSync(specPath)) return []

  const rawSpec = JSON.parse(readFileSync(specPath, 'utf-8'))
  const componentSchemas = rawSpec.components?.schemas as Record<string, Schema> | undefined
  if (!componentSchemas) return []

  let derefSchemas: Record<string, Schema>
  try {
    const derefSpec = dereferenceSync(rawSpec) as Record<string, unknown>
    derefSchemas = ((derefSpec.components as Record<string, unknown>)?.schemas as Record<string, Schema>) || componentSchemas
  } catch {
    derefSchemas = componentSchemas
  }

  return Object.entries(derefSchemas).map(([name, schema]) => ({
    name,
    description: ((schema.description as string) || '').substring(0, 300),
    shape: formatSchemaType(schema, 0, 2),
  }))
}

const MAX_EXAMPLE_LINES = 30

const MAX_DEPTH = 3

const toJsObject = (value: unknown, indent = 0, depth = 0): string => {
  const pad = '  '.repeat(indent)
  const inner = '  '.repeat(indent + 1)

  if (value === null || value === undefined) return 'null'
  if (typeof value === 'boolean' || typeof value === 'number') return String(value)
  if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    if (depth >= MAX_DEPTH) return '[ /* ... */ ]'
    const items = value.map((v) => `${inner}${toJsObject(v, indent + 1, depth + 1)}`)
    return `[\n${items.join(',\n')}\n${pad}]`
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value)
    if (entries.length === 0) return '{}'
    if (depth >= MAX_DEPTH) return '{ /* ... */ }'
    const props = entries.map(([k, v]) => {
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`
      return `${inner}${key}: ${toJsObject(v, indent + 1, depth + 1)}`
    })
    return `{\n${props.join(',\n')}\n${pad}}`
  }

  return String(value)
}

const toJsonObject = (value: unknown, indent = 0, depth = 0): string => {
  const pad = '  '.repeat(indent)
  const inner = '  '.repeat(indent + 1)

  if (value === null || value === undefined) return 'null'
  if (typeof value === 'boolean' || typeof value === 'number') return String(value)
  if (typeof value === 'string') return JSON.stringify(value)

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    if (depth >= MAX_DEPTH) return '[]'
    const items = value.map((v) => `${inner}${toJsonObject(v, indent + 1, depth + 1)}`)
    return `[\n${items.join(',\n')}\n${pad}]`
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value)
    if (entries.length === 0) return '{}'
    if (depth >= MAX_DEPTH) return '{}'
    const props = entries.map(([k, v]) => {
      return `${inner}${JSON.stringify(k)}: ${toJsonObject(v, indent + 1, depth + 1)}`
    })
    return `{\n${props.join(',\n')}\n${pad}}`
  }

  return String(value)
}

const mockJsExample = (schema: Schema): string | null => {
  try {
    const example = mock(schema as any)
    return toJsObject(example)
  } catch {
    return null
  }
}

const mockJsonExample = (schema: Schema): string | null => {
  try {
    const example = mock(schema as any)
    return toJsonObject(example)
  } catch {
    return null
  }
}

const extractExportedSchemas = (client: ClientInfo): string[] => {
  const typesPath = resolve(CLIENTS_DIR, client.dirName, 'src/openapi.d.ts')
  if (!existsSync(typesPath)) return []

  const content = readFileSync(typesPath, 'utf-8')
  const schemas: string[] = []

  // Match lines like: export type FooBar = Components.Schemas.FooBar;
  const re = /^export type (\w+) = Components\.Schemas\.\w+;/gm
  let m
  while ((m = re.exec(content)) !== null) {
    schemas.push(m[1])
  }

  return schemas
}

const generateApiFile = (client: ClientInfo): string => {
  const clientType = client.hasTypes ? 'Client' : 'AxiosInstance'

  const lines = [
    `import type { Document } from 'openapi-client-axios'`,
    ``,
    `import { createApiClient } from '../client-factory'`,
    `import { createApiHandle } from '../proxy'`,
    `import type { ApiHandle } from '../types'`,
    `export { authorize } from '../authorize'`,
    `export type { TokenArg } from '../authorize'`,
  ]

  if (client.hasTypes) {
    lines.push(`import type { Client } from '../types/${client.kebabName}'`)

    // Re-export types including all schema types for migration compatibility
    const schemas = extractExportedSchemas(client)
    const allExports = ['Client', 'PathsDictionary', 'OperationMethods', ...schemas]
    lines.push(`export type { ${allExports.join(', ')} } from '../types/${client.kebabName}'`)
  } else {
    lines.push(`import type { AxiosInstance } from 'axios'`)
  }

  lines.push(
    ``,
    `const loadDefinition = async (): Promise<Document> => {`,
    `  const mod = await import('../definitions/${client.kebabName}.json')`,
    `  return (mod.default ?? mod) as unknown as Document`,
    `}`,
    ``,
    `let _instance: ${clientType} | null = null`,
    ``,
    `const resolve = async (): Promise<${clientType}> => {`,
    `  if (!_instance) {`,
    `    const definition = await loadDefinition()`,
    `    _instance = createApiClient<${clientType}>({ definition })`,
    `  }`,
    `  return _instance`,
    `}`,
    ``,
    `const _handle: ApiHandle<${clientType}> = createApiHandle({`,
    `  resolveClient: resolve,`,
    `  loadDefinition,`,
    `})`,
    ``,
    `/** Get the cached singleton client (lazy-initialized on first call) */`,
    `export const getClient = _handle.getClient`,
    ``,
    `/** Create a fresh client instance (not cached) */`,
    `export const createClient = _handle.createClient`,
    ``,
    `/**`,
    ` * API handle — also exposes operations directly:`,
    ` * \`${client.apiName}.${client.apiName === 'entity' ? 'getEntity' : 'someOperation'}(...)\` calls forwarded to lazy singleton`,
    ` */`,
    `export const ${client.apiName} = _handle`,
  )

  return lines.join('\n')
}

const generateRegistry = (clients: ClientInfo[]): string => {
  const validClients = clients.filter((c) => c.hasDefinition)

  const imports = validClients.map(
    (c) => `import type { Document } from 'openapi-client-axios'`,
  )

  const lines = [
    `import type { Document } from 'openapi-client-axios'`,
    ``,
    `import { registerApi } from '../registry'`,
    `import type { ApiEntry } from '../types'`,
    ``,
    `export const registerBuiltinApis = (registry: Map<string, ApiEntry>) => {`,
  ]

  for (const client of validClients) {
    lines.push(
      `  registerApi({`,
      `    registry,`,
      `    name: '${client.apiName}',`,
      `    loader: async () => {`,
      `      const mod = await import('../definitions/${client.kebabName}.json')`,
      `      return (mod.default ?? mod) as unknown as Document`,
      `    },`,
      `  })`,
    )
  }

  lines.push(`}`)
  return lines.join('\n')
}

const generateClientMap = (clients: ClientInfo[]): string => {
  const validClients = clients.filter((c) => c.hasDefinition)

  const lines = [
    `import type { AxiosInstance } from 'axios'`,
    ``,
  ]

  // Import Client types with unique aliases
  for (const client of validClients) {
    if (client.hasTypes) {
      lines.push(`import type { Client as ${client.apiName.charAt(0).toUpperCase() + client.apiName.slice(1)}Client } from './types/${client.kebabName}'`)
    }
  }

  lines.push(``, `export type SDKClientMap = {`)

  for (const client of validClients) {
    if (client.hasTypes) {
      lines.push(`  ${client.apiName}: ${client.apiName.charAt(0).toUpperCase() + client.apiName.slice(1)}Client`)
    } else {
      lines.push(`  ${client.apiName}: AxiosInstance`)
    }
  }

  lines.push(`}`)

  return lines.join('\n')
}

const generateSubpathExports = (clients: ClientInfo[]): Record<string, Record<string, string>> => {
  const exports: Record<string, Record<string, string>> = {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.js',
      require: './dist/index.cjs',
    },
  }

  for (const client of clients.filter((c) => c.hasDefinition)) {
    exports[`./${client.kebabName}`] = {
      types: `./dist/apis/${client.kebabName}.d.ts`,
      import: `./dist/apis/${client.kebabName}.js`,
      require: `./dist/apis/${client.kebabName}.cjs`,
    }
  }

  return exports
}

type ParamInfo = {
  name: string
  in: string
  required: boolean
  type: string
  description: string
}

type OperationInfo = {
  method: string
  path: string
  operationId: string
  summary: string
  deprecated: boolean
  tags: string[]
  params: ParamInfo[]
  requestBodySchema: Schema | null
  responseSchema: Schema | null
}

type Schema = Record<string, unknown>

const formatSchemaType = (schema: Schema | undefined, indent = 0, maxDepth = 3): string => {
  if (!schema) return 'unknown'
  if (indent > maxDepth) return '{ ... }'

  const pad = '  '.repeat(indent)
  const innerPad = '  '.repeat(indent + 1)

  // Enums
  if (schema.enum) {
    return (schema.enum as unknown[]).map((v) => JSON.stringify(v)).join(' | ')
  }

  // Primitives
  if (schema.type === 'string') {
    if (schema.format === 'date-time') return 'string // date-time'
    if (schema.format === 'uuid') return 'string // uuid'
    if (schema.format) return `string // ${schema.format}`
    return 'string'
  }
  if (schema.type === 'integer' || schema.type === 'number') return 'number'
  if (schema.type === 'boolean') return 'boolean'

  // Arrays
  if (schema.type === 'array') {
    const items = schema.items as Schema | undefined
    const itemType = formatSchemaType(items, indent, maxDepth)
    if (itemType.includes('\n')) return `Array<${itemType}>`
    return `${itemType}[]`
  }

  // Union types
  if (schema.oneOf || schema.anyOf) {
    const variants = ((schema.oneOf || schema.anyOf) as Schema[])
    return variants.map((v) => formatSchemaType(v, indent, maxDepth)).join(' | ')
  }

  // allOf — merge or unwrap single-item
  if (schema.allOf) {
    const items = schema.allOf as Schema[]
    if (items.length === 1) return formatSchemaType(items[0], indent, maxDepth)
    // Merge object schemas
    const merged: Schema = { type: 'object', properties: {}, required: [] }
    for (const item of items) {
      Object.assign(merged.properties as Record<string, unknown>, (item.properties || {}) as Record<string, unknown>)
      ;(merged.required as string[]).push(...((item.required as string[]) || []))
    }
    return formatSchemaType(merged, indent, maxDepth)
  }

  // Objects with properties
  const properties = schema.properties as Record<string, Schema> | undefined
  if (properties && Object.keys(properties).length > 0) {
    const required = new Set((schema.required as string[]) || [])
    const propLines = Object.entries(properties).map(([key, propSchema]) => {
      const opt = required.has(key) ? '' : '?'
      const propType = formatSchemaType(propSchema, indent + 1, maxDepth)
      return `${innerPad}${key}${opt}: ${propType}`
    })
    return `{\n${propLines.join('\n')}\n${pad}}`
  }

  // additionalProperties (Record types)
  if (schema.type === 'object' && schema.additionalProperties) {
    if (schema.additionalProperties === true) return 'Record<string, unknown>'
    const valType = formatSchemaType(schema.additionalProperties as Schema, indent, maxDepth)
    return `Record<string, ${valType}>`
  }

  if (schema.type === 'object') return 'object'

  return 'unknown'
}

const sanitizeDescription = (desc: string): string => {
  // Take only the first paragraph (up to the first blank line or heading)
  const firstParagraph = desc.split(/\n\s*\n/)[0] || ''
  // Strip any markdown headings
  return firstParagraph.replace(/^#{1,6}\s+/gm, '').trim().substring(0, 200)
}

const extractOperations = (client: ClientInfo): { title: string; version: string; server: string; operations: OperationInfo[] } => {
  const fullSpecPath = resolve(CLIENTS_DIR, client.dirName, 'src/openapi.json')
  const runtimeSpecPath = resolve(CLIENTS_DIR, client.dirName, 'src/openapi-runtime.json')

  const specPath = existsSync(fullSpecPath) ? fullSpecPath : runtimeSpecPath
  if (!existsSync(specPath)) return { title: '', version: '', server: '', operations: [] }

  const rawSpec = JSON.parse(readFileSync(specPath, 'utf-8'))
  const title = rawSpec.info?.title || client.apiName
  const version = rawSpec.info?.version || ''
  const server = rawSpec.servers?.[0]?.url || ''

  let spec: Record<string, unknown>
  try {
    spec = dereferenceSync(rawSpec) as Record<string, unknown>
  } catch {
    spec = rawSpec
  }

  const operations: OperationInfo[] = []
  for (const [path, methods] of Object.entries((spec.paths || {}) as Record<string, Record<string, unknown>>)) {
    // Path-level parameters apply to all operations under this path
    const pathParams = (methods.parameters || []) as Record<string, unknown>[]

    for (const [method, rawOp] of Object.entries(methods)) {
      if (method === 'parameters') continue // skip path-level params key
      const op = rawOp as Record<string, unknown>
      if (typeof op !== 'object' || !op.operationId) continue

      // Merge path-level and operation-level parameters (operation overrides path)
      const opParams = (op.parameters || []) as Record<string, unknown>[]
      const mergedParams = [...pathParams]
      for (const p of opParams) {
        const idx = mergedParams.findIndex((pp) => pp.name === p.name && pp.in === p.in)
        if (idx >= 0) mergedParams[idx] = p
        else mergedParams.push(p)
      }

      const params: ParamInfo[] = mergedParams.map((p) => ({
        name: (p.name as string) || '',
        in: (p.in as string) || '',
        required: !!p.required,
        type: formatSchemaType(p.schema as Schema | undefined, 0, 0),
        description: ((p.description as string) || '').substring(0, 120),
      }))

      const reqBodyContent = (op.requestBody as Record<string, unknown>)?.content as Record<string, unknown> | undefined
      const reqBodySchema = (reqBodyContent?.['application/json'] as Record<string, unknown>)?.schema as Schema | undefined

      const successResponse = ((op.responses as Record<string, unknown>)?.['200'] || (op.responses as Record<string, unknown>)?.['201']) as Record<string, unknown> | undefined
      const respContent = successResponse?.content as Record<string, unknown> | undefined
      const respSchema = (respContent?.['application/json'] as Record<string, unknown>)?.schema as Schema | undefined

      operations.push({
        method: method.toUpperCase(),
        path,
        operationId: op.operationId as string,
        summary: sanitizeDescription(((op.summary as string) !== op.operationId ? op.summary : op.description) as string || ''),
        deprecated: !!op.deprecated,
        tags: (op.tags as string[]) || [],
        params,
        requestBodySchema: reqBodySchema || null,
        responseSchema: respSchema || null,
      })
    }
  }

  return { title, version, server, operations }
}

const extractTypeSignatures = (client: ClientInfo): Map<string, { params: string; body: string; response: string }> => {
  const typesPath = resolve(CLIENTS_DIR, client.dirName, 'src/openapi.d.ts')
  if (!existsSync(typesPath)) return new Map()

  const content = readFileSync(typesPath, 'utf-8')
  const signatures = new Map<string, { params: string; body: string; response: string }>()

  const re = /  '(\w+)'\(\s*\n\s*parameters\?: ([^\n]+),\s*\n\s*data\?: ([^\n]+),\s*\n\s*config\?: AxiosRequestConfig\s*\n\s*\): (OperationResponse<[^>]+>)/g
  let m
  while ((m = re.exec(content)) !== null) {
    const paramsType = m[2].replace(/ \| null$/, '').trim()
    const bodyType = m[3].replace(/,$/, '').trim()
    const responseType = m[4].trim()
    signatures.set(m[1], { params: paramsType, body: bodyType, response: responseType })
  }

  return signatures
}

const generateClientDoc = (client: ClientInfo): string => {
  const { title, version, server, operations } = extractOperations(client)
  const typeSignatures = extractTypeSignatures(client)

  const lines = [
    `# ${title || client.apiName}`,
    ``,
  ]

  if (server) lines.push(`**Base URL:** \`${server}\``)
  lines.push(`**Full API Docs:** [https://docs.epilot.io/api/${client.kebabName}](https://docs.epilot.io/api/${client.kebabName})`)
  lines.push(``)

  const firstOp = operations[0]?.operationId || 'someOperation'

  lines.push(
    `## Usage`,
    ``,
    '```ts',
    `import { epilot } from '@epilot/sdk'`,
    ``,
    `epilot.authorize(() => '<token>')`,
    ``,
    `// Call operations directly (lazy singleton under the hood)`,
    `const { data } = await epilot.${client.apiName}.${firstOp}(...)`,
    ``,
    `// Or get the client explicitly`,
    `const ${client.apiName}Client = await epilot.${client.apiName}.getClient()`,
    '```',
    ``,
    `### Tree-shakeable import`,
    ``,
    '```ts',
    `import { getClient, authorize } from '@epilot/sdk/${client.kebabName}'`,
    ``,
    `const ${client.apiName}Client = await getClient()`,
    `authorize(${client.apiName}Client, () => '<token>')`,
    `const { data } = await ${client.apiName}Client.${firstOp}(...)`,
    ``,
    `// Or create a fresh (non-singleton) client`,
    `import { createClient } from '@epilot/sdk/${client.kebabName}'`,
    `const fresh = await createClient()`,
    `authorize(fresh, () => '<token>')`,
    '```',
    ``,
  )

  lines.push(
  )

  const activeOps = operations.filter((op) => !op.deprecated)

  if (activeOps.length > 0) {
    lines.push(`## Operations`, ``)

    // Table of contents grouped by tags
    const hasTags = activeOps.some((op) => op.tags.length > 0)
    if (hasTags) {
      const tagOrder: string[] = []
      const tagOps = new Map<string, OperationInfo[]>()
      for (const op of activeOps) {
        const tag = op.tags[0] || 'Other'
        if (!tagOps.has(tag)) {
          tagOrder.push(tag)
          tagOps.set(tag, [])
        }
        tagOps.get(tag)!.push(op)
      }
      for (const tag of tagOrder) {
        lines.push(`**${tag}**`)
        for (const op of tagOps.get(tag)!) {
          const anchor = op.operationId.toLowerCase()
          lines.push(`- [\`${op.operationId}\`](#${anchor})`)
        }
        lines.push(``)
      }
    } else {
      for (const op of activeOps) {
        const anchor = op.operationId.toLowerCase()
        lines.push(`- [\`${op.operationId}\`](#${anchor})`)
      }
      lines.push(``)
    }

    for (const op of activeOps) {
      const desc = op.summary && op.summary.toLowerCase() !== op.operationId.toLowerCase() ? op.summary : ''
      lines.push(`### \`${op.operationId}\``)
      lines.push(``)
      if (desc) {
        lines.push(desc)
        lines.push(``)
      }
      lines.push(`\`${op.method} ${op.path}\``)
      lines.push(``)

      // Build call example
      const hasParams = op.params.length > 0
      const bodyExample = op.requestBodySchema ? mockJsExample(op.requestBodySchema) : null
      const responseExample = op.responseSchema ? mockJsonExample(op.responseSchema) : null

      lines.push('```ts')

      // Build the parameters object
      const paramEntries = op.params.map((p) => {
        const mockVal = p.type === 'boolean' ? 'true'
          : p.type === 'number' ? '1'
          : p.type.includes('[]') ? "['...']"
          : `'${p.name === 'id' ? '123e4567-e89b-12d3-a456-426614174000' : 'example'}'`
        return `  ${p.name}: ${mockVal}`
      })

      // Build the data object (indent body example for inline use)
      const bodyArg = bodyExample
        ? bodyExample.split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n')
        : null

      if (hasParams && bodyArg) {
        lines.push(`const { data } = await client.${op.operationId}(`)
        lines.push(`  {`)
        for (const entry of paramEntries) {
          lines.push(`  ${entry},`)
        }
        lines.push(`  },`)
        lines.push(`  ${bodyArg},`)
        lines.push(`)`)
      } else if (hasParams) {
        lines.push(`const { data } = await client.${op.operationId}({`)
        for (const entry of paramEntries) {
          lines.push(`${entry},`)
        }
        lines.push(`})`)
      } else if (bodyArg) {
        lines.push(`const { data } = await client.${op.operationId}(`)
        lines.push(`  null,`)
        lines.push(`  ${bodyArg},`)
        lines.push(`)`)
      } else {
        lines.push(`const { data } = await client.${op.operationId}()`)
      }

      lines.push('```')
      lines.push(``)

      // Response example
      if (responseExample) {
        lines.push(`**Response**`)
        lines.push(``)
        lines.push('```json')
        lines.push(responseExample)
        lines.push('```')
        lines.push(``)
      }

      lines.push(`---`)
      lines.push(``)
    }
  }

  // Schemas section
  const schemas = extractSchemaTypes(client)
  if (schemas.length > 0) {
    lines.push(`## Schemas`, ``)

    for (const schema of schemas) {
      lines.push(`### \`${schema.name}\``)
      lines.push(``)
      if (schema.description) {
        lines.push(schema.description)
        lines.push(``)
      }
      const typeDef = `type ${schema.name} = ${schema.shape}`
      const typeLines = typeDef.split('\n')
      lines.push('```ts')
      if (typeLines.length <= MAX_EXAMPLE_LINES) {
        lines.push(typeDef)
      } else {
        lines.push(typeLines.slice(0, MAX_EXAMPLE_LINES).join('\n'))
        lines.push('  // ...')
        lines.push('}')
      }
      lines.push('```')
      lines.push(``)
    }
  }

  return lines.join('\n')
}

const generateDocs = (clients: ClientInfo[]) => {
  const docsDir = resolve(V2_DIR, 'docs')
  mkdirSync(docsDir, { recursive: true })

  const validClients = clients.filter((c) => c.hasDefinition)

  for (const client of validClients) {
    const content = generateClientDoc(client)
    writeFileSync(resolve(docsDir, `${client.kebabName}.md`), content)
  }

  return validClients.length
}

const main = () => {
  console.log('Discovering clients...')
  const clients = discoverClients()
  console.log(`Found ${clients.length} clients`)

  const validClients = clients.filter((c) => c.hasDefinition)
  console.log(`${validClients.length} clients have openapi-runtime.json`)

  console.log('Copying definitions...')
  copyDefinitions(clients)

  console.log('Copying types...')
  copyTypes(clients)

  console.log('Generating per-API files...')
  mkdirSync(APIS_DIR, { recursive: true })
  for (const client of validClients) {
    const content = generateApiFile(client)
    writeFileSync(resolve(APIS_DIR, `${client.kebabName}.ts`), content)
  }

  console.log('Generating registry...')
  const registryContent = generateRegistry(clients)
  writeFileSync(resolve(APIS_DIR, '_registry.ts'), registryContent)

  console.log('Generating client map type...')
  const clientMapContent = generateClientMap(clients)
  writeFileSync(resolve(V2_DIR, 'src/client-map.ts'), clientMapContent)

  console.log('Updating package.json exports...')
  const pkgPath = resolve(V2_DIR, 'package.json')
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    pkg.exports = generateSubpathExports(clients)
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  }

  console.log('Generating docs...')
  const docCount = generateDocs(clients)

  console.log(`\nGenerated:`)
  console.log(`  - ${validClients.length} definition files`)
  console.log(`  - ${clients.filter((c) => c.hasTypes).length} type files`)
  console.log(`  - ${validClients.length} API entry files`)
  console.log(`  - 1 registry file`)
  console.log(`  - ${docCount} API docs + index`)
  console.log(`\nAPI names: ${validClients.map((c) => c.apiName).join(', ')}`)
}

main()
