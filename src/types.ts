export type ReactiveValueListener<T> = (
  newValue: T,
  api: { initialRun: boolean },
) => void

export type ReactiveSources<Sources extends unknown[]> = {
  [K in keyof Sources]: {
    onChange: (listener: ReactiveValueListener<Sources[K]>) => void
    value: Sources[K]
  }
}
