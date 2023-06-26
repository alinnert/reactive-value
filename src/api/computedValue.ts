import { ReactiveSources, ReactiveValueListener } from '../types'

export type ComputedValueComputeFn<Sources extends unknown[], T> = (
  ...sources: Sources
) => T

export class ComputedValue<Sources extends unknown[], T> {
  #sources: [...ReactiveSources<Sources>]
  #value: T
  #target = new EventTarget()

  constructor(
    sources: [...ReactiveSources<Sources>],
    computeFn: ComputedValueComputeFn<Sources, T>,
  ) {
    this.#sources = sources
    this.#value = computeFn(...this.#sourcesValues)

    for (const source of this.#sources) {
      source.onChange(() => {
        this.#value = computeFn(...this.#sourcesValues)
        this.#target.dispatchEvent(new CustomEvent('change'))
      })
    }
  }

  get value() {
    return this.#value
  }

  get #sourcesValues(): Sources {
    return this.#sources.map((s) => s.value) as Sources
  }

  onChange(listener: ReactiveValueListener<T>) {
    this.#target.addEventListener('change', () => {
      listener(this.#value, { initialRun: false })
    })

    listener(this.#value, { initialRun: true })
  }
}
