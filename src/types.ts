import { AutomatedValue } from './api/automatedValue'
import { ComputedValue } from './api/computedValue'
import { MutableValue } from './api/mutableValue'

export type ReactiveValueListener<T> = (newValue: T) => void

export type AnyReactiveValue<
  Sources extends unknown[],
  K extends keyof Sources,
> =
  | MutableValue<Sources[K]>
  | ComputedValue<Sources[K]>
  | AutomatedValue<Sources[K]>

export type ReactiveSources<Sources extends unknown[]> = {
  [K in keyof Sources]: AnyReactiveValue<Sources, K>
}