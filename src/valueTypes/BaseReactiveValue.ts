import { ReactiveValueListener } from '../types'

export interface BaseReactiveValue<T> {
  readonly value: T
  onChange: (listener: ReactiveValueListener<T>) => void
}
