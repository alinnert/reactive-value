import { ComputedValue } from './ComputedValue'
import { Value } from './Value'

describe('new ComputedValue()', () => {
  test('basic functionality', () => {
    const value = new Value(10)
    const computed = new ComputedValue([value], (v) => v * 2)
    const mockFn = jest.fn()
    computed.onChange(mockFn)
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn.mock.calls[0][0]).toBe(20)

    value.set(20)
    expect(mockFn).toBeCalledTimes(2)
    expect(mockFn.mock.calls[1][0]).toBe(40)
  })
})