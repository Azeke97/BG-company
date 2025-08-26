import type { HTTPMethod } from 'h3'
import type { FetchOptions } from 'ofetch'
import type { RequestConfig } from '~/shared/api/types'

export function makeFetchConfig(
  url: string,
  baseConfig: RequestConfig
): FetchOptions & { method: HTTPMethod } {
  const config = JSON.parse(JSON.stringify(baseConfig))

  const fetchConfig: FetchOptions & { method: HTTPMethod } = {
    redirect: 'follow',
    method: config.method,
    headers: config.headers,
    baseURL: url.startsWith('http') ? '' : config.baseURL,
  }

  if (config.withCredentials) {
    fetchConfig.credentials = 'include'
  }

  if (config.method === 'GET') {
    fetchConfig.params = config.data
  } else {
    fetchConfig.body = config.data
  }

  return fetchConfig
}
