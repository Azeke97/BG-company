export default defineNuxtPlugin(() => {
  const runtime = useRuntimeConfig()
  const apiKey = runtime.public?.YANDEX_MAPS_API_KEY || ''

  let readyPromise: Promise<typeof ymaps> | null = null

  // Ленивая загрузка
  function loadYm(): Promise<typeof ymaps> {
    if (import.meta.server) return Promise.reject(new Error('ymaps on server'))
    if (readyPromise) return readyPromise
    readyPromise = new Promise((resolve, reject) => {
      if ((window as any).ymaps?.ready) {
        ;(window as any).ymaps.ready(() => resolve((window as any).ymaps))
        return
      }
      const s = document.createElement('script')
      const params = new URLSearchParams({
        lang: 'ru_RU',
        coordorder: 'latlong',
        load: 'package.standard',
        ...(apiKey ? { apikey: apiKey } : {}),
      })

      s.src = `https://api-maps.yandex.ru/2.1/?${params.toString()}`
      s.async = true
      s.onload = () => (window as any).ymaps.ready(() => resolve((window as any).ymaps))
      s.onerror = () => reject(new Error('Failed to load Yandex Maps API'))
      document.head.appendChild(s)
    })
    return readyPromise
  }

  return {
    provide: {
      yamaps: {
        load: loadYm,
      },
    },
  }
})

declare global {
  interface Window {
    ymaps: any
  }

  const ymaps: any
}
