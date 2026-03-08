import type { AxiosInstance } from 'axios'
import type { Document } from 'openapi-client-axios'

import { createApiClient } from '../client-factory'
import { createApiHandle } from '../proxy'
import type { ApiHandle } from '../types'
export { authorize } from '../authorize'
export type { TokenArg } from '../authorize'
import type { Client } from '../types/design'
export type { Client, PathsDictionary, OperationMethods, AddConsumerReq, AddDesignReq, AddDesignRes, BrandItem, ConsumerData, Custom_Style, CustomerPortalData, DesignItem, ErrorResp, FileData, FontData, FontResponseUrl, GetAllDesignsRes, GetBrandsRes, GetDesignRes, GetFilesRes, ItemMetada, Journey, LogoData, PaletteData, ShapeData, TypographyData, UpdateDesignReq, UploadFileReq, UploadFileRes, WidgetData, WidgetPortalData } from '../types/design'

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/design.json')
  return (mod.default ?? mod) as unknown as Document
}

let _instance: Client | null = null

const resolve = async (): Promise<Client> => {
  if (!_instance) {
    const definition = await loadDefinition()
    _instance = createApiClient<Client>({ definition })
  }
  return _instance
}

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  loadDefinition,
})

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient

/**
 * API handle — also exposes operations directly:
 * `design.someOperation(...)` calls forwarded to lazy singleton
 */
export const design = _handle