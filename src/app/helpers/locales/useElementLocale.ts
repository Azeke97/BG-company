import type { AppLocales } from '~/6-shared/constants'
import ru from 'element-plus/es/locale/lang/ru'
import en from 'element-plus/es/locale/lang/en'
import kz from 'element-plus/es/locale/lang/kk'

export const useElementLocale = (locale: AppLocales) => {
  const elementLocale = computed(() => {
    return (
      {
        ru,
        en,
        kz,
      }[locale] ?? ru
    )
  })

  return elementLocale
}
