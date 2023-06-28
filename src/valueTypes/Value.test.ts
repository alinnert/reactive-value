import { Value } from './Value'

describe('new Value()', () => {
  test('value, set, update', () => {
    const value = new Value(5)
    expect(value.value).toBe(5)

    value.set(3)
    expect(value.value).toBe(3)

    value.update(v => v * 2)
    expect(value.value).toBe(6)
  })

  test('onChange', () => {
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
