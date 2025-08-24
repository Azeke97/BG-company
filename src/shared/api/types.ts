import type { AnyRecord, Nullable } from '~/shared/types'

export enum ServerResponseStatus {
  Success = 1,
  Error = 0,
}

export interface ServerSuccessResponse {
  success: ServerResponseStatus.Success
  message?: string
}

export interface CaptchaRequest {
  'g-recaptcha-response': string
}

export interface ServerErrorResponse {
  success: ServerResponseStatus.Error
  message?: string
  errors?: AnyRecord
}

export type RequestMethod = 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE'

export interface RequestConfig {
  withCredentials?: boolean
  headers?: AnyRecord
  baseURL?: string
  method?: RequestMethod
  data?: AnyRecord
}

export const BASE_CONFIG: RequestConfig = {
  withCredentials: false,
  method: 'GET',
  baseURL: '',
  headers: {
    accept: 'application/json',
    'accept-encoding': 'gzip, deflate',
  },
  data: undefined,
}

// Пагинация

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface PaginationLink {
  url: Nullable<string>
  label: string
  active: boolean
}

export interface PaginationBase<T> extends PaginationMeta {
  data: T[]
  first_page_url?: string
  last_page_url?: string
  next_page_url?: Nullable<string>
  prev_page_url?: Nullable<string>
  path?: string
  links?: PaginationLink[]
}

/**
 вариант 1: пагинация на верхнем уровне ответа
 */
export interface RootPaginationResponse<T> extends ServerSuccessResponse {
  current_page: number
  data: T[]
  per_page: number
  total: number
  last_page: number
}

/**
 вариант 2: пагинация внутри data
 */
export interface NestedPaginationResponse<T> extends ServerSuccessResponse {
  data: PaginationBase<T>
}

/**
 вариант 3: минимальная пагинация (часть метаданных отсутствует)
 */
export interface MinimalPaginationResponse<T> extends ServerSuccessResponse {
  data: {
    current_page: number
    data: T[]
    total: number
  }
}
