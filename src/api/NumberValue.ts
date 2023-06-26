import { ReactiveValueListener } from '../types'

export class NumberValue {
  #value: number
  #initialValue: number
  #target = new EventTarget()

  constructor(initialValue: number) {
    this.#value = initialValue
    this.#initialValue = initialValue
  }

  get value(): number {
    return this.#value
  }

  set(value: number) {
    this.#value = value
    this.#target.dispatchEvent(new CustomEvent('change'))
  }

  update(updateFn: (oldValue: number) => number) {
    this.set(updateFn(this.#value))
  }

  increase(value = 1) {
    this.update((v) => v + value)
  }

  decrease(value = 1) {
    this.update((v) => v - value)
  }

  reset() {
    this.set(this.#initialValue)
  }

  onChange(listener: ReactiveValueListener<number>) {
    this.#target.addEventListener('change', () => {
      listener(this.#value, { initialRun: false })
    })

    listener(this.#value, { initialRun: true })
  }
}
