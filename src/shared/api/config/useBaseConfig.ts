import defu from 'defu'
import { BASE_CONFIG, type RequestConfig } from '~/shared/api/types'
import { authTokenStorage } from '~/shared/helpers'

export function useBaseConfig(userConfig: RequestConfig = {}): RequestConfig {
  const { ssrContext } = useNuxtApp()
  const $config = useRuntimeConfig()
  const config = defu(userConfig, BASE_CONFIG)

  const token = import.meta.client ? authTokenStorage.get()?.token : null

  if (token) {
    config.headers!['Authorization'] = `Bearer ${token}`
  }

  if (import.meta.server) {
    const nodeHeaders = ssrContext?.event.node.req.headers

    config.headers = {
      ...nodeHeaders,
      ...config.headers,
    }

    if ('host' in config.headers) {
      delete config.headers.host
    }
  }

  config.baseURL = $config.public.baseURL

  return config
}
