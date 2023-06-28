import { ReactiveValueListener } from '../types'
import { BaseReactiveValue } from './BaseReactiveValue'

export class ObjectValue<T extends {}> implements BaseReactiveValue<T> {
  #value: T
  #target = new EventTarget()

  constructor(initialValue: T) {
    this.#value = initialValue
  }

  get value(): T {
    return this.#value
  }

  set(value: T) {
    this.#value = value
    this.#target.dispatchEvent(new CustomEvent('change'))
  }

  setValue<P extends keyof T>(property: P, value: T[P]) {
    this.set({ ...this.#value, [property]: value })
  }

  setValues(value: Partial<T>) {
    this.set({ ...this.#value, ...value })
  }

  getValue<P extends keyof T>(property: P): T[P] {
    return this.#value[property]
  }

  onChange(listener: ReactiveValueListener<T>) {
    this.#target.addEventListener('change', () => {
      listener(this.#value, { initialRun: false })
    })

    listener(this.#value, { initialRun: true })
  }
}
