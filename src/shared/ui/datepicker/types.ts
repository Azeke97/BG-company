export interface DatePickerProps {
  modelValue: string | Date | number | [Date, Date] | string[] | undefined
  placeholder?: string
  label?: string
  clearable?: boolean
  disabled?: boolean
  error?: string | boolean
  hint?: string
  type?: 'date' | 'datetime' | 'daterange' | 'datetimerange'
  size?: 'large' | 'default' | 'small'
  readonly?: boolean
  name?: string
  id?: string
}
