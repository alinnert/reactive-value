import { ReactiveValueListener } from '../types'
import { BaseReactiveValue } from './BaseReactiveValue'

export type AutomatedValueCallback<T> = (api: {
  next: (nextValue: T) => void
}) => void

export class AutomatedValue<T> implements BaseReactiveValue<T> {
  #value!: T
  #target = new EventTarget()

  constructor(callback: AutomatedValueCallback<T>) {
    callback({
      next: (nextValue: T) => {
        this.#next(nextValue)
      },
    })
  }

  get value() {
    return this.#value
  }

  #next(nextValue: T) {
    this.#value = nextValue
    const event = new CustomEvent('change', { detail: nextValue })
    this.#target.dispatchEvent(event)
  }

  onChange(listener: ReactiveValueListener<T>) {
    this.#target.addEventListener('change', () => {
      listener(this.#value, { initialRun: false })
    })

    if (this.#value === null) return
    listener(this.#value, { initialRun: true })
  }
}
