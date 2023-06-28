import { Value } from './Value'

describe('Value', () => {
  test('value', () => {
    const value = new Value(5)
    expect(value.value).toBe(5)
    value.set(3)
    expect(value.value).toBe(3)
  })

  test('on change', () => {
    const value = new Value(0)
    const mockFn = jest.fn()
    value.onChange(mockFn)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn.mock.calls[0][0]).toBe(0)
    value.set(100)
    expect(mockFn).toHaveBeenCalledTimes(2)
    expect(mockFn.mock.calls[1][0]).toBe(100)
  })
})
