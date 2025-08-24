import type { ButtonProps } from 'element-plus'
import type { UiLinkDirection } from '~/shared/ui/link'

type ButtonVariant = 'primary' | 'secondary'

export interface UiButtonProps extends Partial<UiLinkDirection> {
  label?: string
  icon?: string
  loading?: boolean
  disabled?: boolean
  type?: ButtonProps['type']
  size?: ButtonProps['size']
  round?: boolean
  variant?: ButtonVariant
  outline?: boolean
  full?: boolean
  target?: string
  nativeType?: 'submit' | 'button'
}
