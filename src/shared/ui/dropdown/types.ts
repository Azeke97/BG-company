import type { ExtractPropTypes } from 'vue'
import type { dropdownProps } from 'element-plus'
import type { UserMenuCommand } from '~/widgets/header/components/user-dropdown'

type ElDropdownProps = ExtractPropTypes<typeof dropdownProps>

export interface UiDropdownItem {
  label: string
  command?: string | number
  disabled?: boolean
  divided?: boolean
}

export interface UiDropdownProps extends Partial<ElDropdownProps> {
  maxHeight?: number | string
  items?: ReadonlyArray<UiDropdownItem>
}

export type UiDropdownEmits<T = UserMenuCommand> = {
  (e: 'command', value: T): void
  (e: 'visible-change', value: boolean): void
}
