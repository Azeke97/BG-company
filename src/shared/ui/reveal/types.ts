export type Side = 'left' | 'right' | 'up' | 'down' | 'none'

export interface RevealProps {
  /** HTML-тег обёртки */
  as?: string
  /** Направление сдвига при появлении */
  side?: Side
  /** Величина сдвига в px */
  distance?: number
  /** Порог видимости для IntersectionObserver (0..1) */
  threshold?: number
  /** Анимировать один раз и зафиксировать состояние */
  once?: boolean
  /** Включить «стаггер» для прямых детей */
  stagger?: boolean
  /** Шаг задержки между детьми в мс */
  staggerStep?: number
  /** Длительность анимации в мс */
  duration?: number
  /** Базовая задержка */
  delay?: number
  /** CSS easing */
  easing?: string
  /** rootMargin для IO */
  rootMargin?: string
}
