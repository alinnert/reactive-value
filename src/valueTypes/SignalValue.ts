import { ReactiveValueListener } from '../types'
import { BaseReactiveValue } from './BaseReactiveValue'

export class SignalValue implements BaseReactiveValue<Symbol> {
  #value = Symbol()
  #target = new EventTarget()

  get value(): Symbol {
    return this.#value
  }

  send() {
    const newValue = Symbol()
    this.#value = newValue
    const event = new CustomEvent('change')
    this.#target.dispatchEvent(event)
  }

  onChange(listener: ReactiveValueListener<Symbol>) {
    this.#target.addEventListener('change', () => {
      listener(this.#value, { initialRun: false })
    })

    listener(this.#value, { initialRun: true })
  }
}
