import { AutomatedValue } from './automatedValue'

describe('AutomatedValue', () => {
  test('basic functionality', () => {
    const automated = new AutomatedValue<number>(({ next }) => {
      next(10)
      next(20)
      setTimeout(() => {
        next(30)
      }, 200)
    })
    const mockFn = jest.fn()
    automated.onChange(mockFn)

    expect(mockFn).toBeCalledTimes(3)
  })

  test('no value', () => {
    const automated = new AutomatedValue(() => { })

    expect(automated.value).toBeUndefined()
  })
})
