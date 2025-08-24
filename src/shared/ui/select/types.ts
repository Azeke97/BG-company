export interface UiSelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface UiSelectProps {
  modelValue: any
  options: UiSelectOption[]

  label?: string
  hint?: string
  error?: string | boolean
  fullWidth?: boolean
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  multiple?: boolean
  size?: 'small' | 'default' | 'large'
  id?: string
}
