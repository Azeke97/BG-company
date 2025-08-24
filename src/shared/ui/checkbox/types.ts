export interface CheckboxProps {
  modelValue: boolean | string | number
  label?: string
  labelValue?: string | number | boolean
  falseLabel?: string | number | boolean
  disabled?: boolean
  readonly?: boolean
  indeterminate?: boolean
  error?: string | boolean
  hint?: string
  size?: 'large' | 'default' | 'small'
  name?: string
  id?: string
  fullWidth?: boolean
}
