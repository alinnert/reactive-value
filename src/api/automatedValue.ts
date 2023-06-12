import { addEvent } from '../lib/addEvent'
import { ReactiveValueListener } from '../types'

export type AutomatedValueCallback<T> = (
  next: (nextValue: T) => void,
) => void

export type AutomatedValue<T> = {
  readonly value: T | null
  onChange: (listener: ReactiveValueListener<T>) => void
}

export function automatedValue<T>(
  callback: AutomatedValueCallback<T>,
): AutomatedValue<T> {
  const target = new EventTarget()
  let value: T | null = null

  function next(nextValue: T): void {
    value = nextValue
    const changeEvent = new CustomEvent('change', { detail: nextValue })
    target.dispatchEvent(changeEvent)
  }

  callback(next)

  return {
    get value() {
      return value
    },

    onChange(listener) {
      addEvent(target, 'change', (event) => {
        const customEvent = event as CustomEvent
        listener(customEvent.detail)
      })

      if (value === null) return
      listener(value)
    },
  }
}