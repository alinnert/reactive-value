import { ReactiveSources, ReactiveValueListener } from '../types'

export type ComputedAsyncValueComputeFn<Sources extends unknown[], T> = (
  ...sources: Sources
) => Promise<T>

export type ComputedAsyncValueResultValue<T> =
  | { status: 'initial' }
  | { status: 'pending' }
  | { status: 'resolved'; value: T | null }
  | { status: 'rejected'; error: unknown }

export type ComputedAsyncValueStatus =
  ComputedAsyncValueResultValue<unknown>['status']

export class ComputedAsyncValue<Sources extends unknown[], T> {
  #sources: [...ReactiveSources<Sources>]
  #computeFn: ComputedAsyncValueComputeFn<Sources, T>
  #status: ComputedAsyncValueStatus = 'initial'
  #value: T | null = null
  #error: unknown = null
  #target = new EventTarget()
  #context = Symbol()

  constructor(
    sources: [...ReactiveSources<Sources>],
    computeFn: ComputedAsyncValueComputeFn<Sources, T>,
  ) {
    this.#sources = sources
    this.#computeFn = computeFn

    for (const source of this.#sources) {
      source.onChange(() => {
        this.#status = 'pending'
        this.#recompute()
      })
    }
  }

  get value(): ComputedAsyncValueResultValue<T> {
    return this.#resultValue
  }

  get #sourcesValues(): Sources {
    return this.#sources.map((s) => s.value) as Sources
  }

  get #resultValue(): ComputedAsyncValueResultValue<T> {
    if (this.#status === 'initial' || this.#status === 'pending') {
      return { status: this.#status }
    }

    if (this.#status === 'resolved') {
      return { status: this.#status, value: this.#value }
    }

    if (this.#status === 'rejected') {
      return { status: this.#status, error: this.#error }
    }

    const error = new Error('Invalid ComputedAsyncValue status')
    return { status: 'rejected', error }
  }

  #recompute() {
    const context = Symbol()
    this.#context = context
    this.#status = 'pending'

    this.#computeFn(...this.#sourcesValues)
      .then((value) => {
        if (this.#context !== context) return
        this.#value = value
        this.#error = null
        this.#status = 'resolved'
      })
      .catch((error) => {
        if (this.#context !== context) return
        this.#error = error
        this.#value = null
        this.#status = 'rejected'
      })
      .finally(() => {
        if (this.#context !== context) return
        this.#target.dispatchEvent(new CustomEvent('change'))
      })
  }

  onChange(listener: ReactiveValueListener<ComputedAsyncValueResultValue<T>>) {
    this.#target.addEventListener('change', () => {
      listener(this.#resultValue, { initialRun: false })
    })

    listener(this.#resultValue, { initialRun: true })
  }
}
