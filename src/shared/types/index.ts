export type Nullable<T> = T | null

export type AnyRecord = { [K in string]: any }

export type AnyFunction = (...args: any[]) => any

export type AnyAsyncFunction = (...args: any[]) => Promise<any>

export type MaybeRef<T> = T | Ref<T>

export type MaybeArray<T> = T | T[]

export type NumberedBoolean = 0 | 1

export type AnyCallback = (...args: any[]) => void

export type StringedNumber = string | number

export type DateString = string // YYYY-MM-DD

export type DateTimeString = string // YYYY-MM-DD HH-mm-ss

export type Timestamp = number
