import { ReactiveValueListener } from '../types'
import { BaseReactiveValue } from './BaseReactiveValue'

export class Value<T> implements BaseReactiveValue<T> {
  #value: T
  #target = new EventTarget()

  constructor(initialValue: T) {
    this.#value = initialValue
  }

  get value(): T {
    return this.#value
  }

  set(newValue: T) {
    this.#value = newValue
    this.#target.dispatchEvent(new CustomEvent('change'))
  }

  update(updateFn: (oldValue: T) => T) {
    this.set(updateFn(this.#value))
  }

  onChange(listener: ReactiveValueListener<T>) {
    this.#target.addEventListener('change', () => {
      listener(this.#value, { initialRun: false })
    })

    listener(this.#value, { initialRun: true })
  }
}
