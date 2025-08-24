import type { AppLocales } from '~/6-shared/constants'
import ru from 'dayjs/locale/ru'
import en from 'dayjs/locale/en'
import kz from 'dayjs/locale/kk'

export const useDayjsLocale = (locale: AppLocales) => {
  const dayjs = useDayjs()

  const dayJsLocale = computed(() => {
    return (
      {
        ru,
        en,
        kz,
      }[locale] ?? ru
    )
  })

  dayjs.locale(dayJsLocale.value)
}
