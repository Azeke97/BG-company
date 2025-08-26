import ru from 'element-plus/es/locale/lang/ru'
import en from 'element-plus/es/locale/lang/en'
import kz from 'element-plus/es/locale/lang/kk'
import type { AppLocales } from '~/shared/constants'

export const useElementLocale = (locale: AppLocales) => {
  return computed(() => {
    return (
      {
        ru,
        en,
        kz,
      }[locale] ?? ru
    )
  })
}
