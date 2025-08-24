export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodyLarge'
  | 'bodyCompact'
  | 'bodySmall'
  | 'bodyNote'

export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type Tag = Heading | 'p' | 'div' | 'span' | 'small' | 'label'

export type TypographyTypeMap = Record<Variant, Tag>

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'white'
  | 'secondaryLight'
  | 'accentPrimary'
  | 'accentDarker'
  | 'textAccent'
  | 'error'

export type Transform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'

export type Align = 'left' | 'center' | 'right' | 'justify'

export interface UiTypographyProps {
  variant?: Variant
  tag?: Tag
  color?: Color
  transform?: Transform
  align?: Align
  label?: string
  error?: boolean
}
