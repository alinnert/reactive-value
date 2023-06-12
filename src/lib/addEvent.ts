export function addEvent<T extends keyof HTMLElementEventMap>(
  targets: EventTarget | EventTarget[] | HTMLCollectionOf<Element>,
  eventName: T,
  handler: (event: HTMLElementEventMap[T], index: number) => void,
): void {
  const elementList =
    targets instanceof EventTarget ? [targets] : Array.from(targets)

  elementList.forEach((element, index) => {
    element.addEventListener(eventName, (event) => {
      handler(event as HTMLElementEventMap[T], index)
    })
  })
}