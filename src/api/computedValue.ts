import { addEvent } from '../lib/addEvent'
import { ReactiveSources, ReactiveValueListener } from '../types'

export type ComputedValue<Result> = {
  readonly value: Result
  onChange: (listener: ReactiveValueListener<Result>) => void
}

/**
 * Creates a reactive computed value that notifies subscribers when its value
 * has changed.
 */
export function computedValue<Sources extends unknown[], Result>(
  sources: [...ReactiveSources<Sources>],
  callback: (sources: [...Sources]) => Result,
): ComputedValue<Result> {
  const getValues = () => sources.map((source) => source.value) as Sources
  const target = new EventTarget()
  let value = callback(getValues())

  for (const source of sources) {
    source.onChange(() => {
      const newValue = callback(getValues())
      value = newValue
      const changeEvent = new CustomEvent('change', {
        detail: newValue,
      })
      target.dispatchEvent(changeEvent)
    })
  }

  return {
    get value() {
      return value
    },

    onChange(listener) {
      addEvent(target, 'change', (event) => {
        const customEvent = event as CustomEvent<Result>
        listener(customEvent.detail)
      })

      listener(value)
    },
  }
}