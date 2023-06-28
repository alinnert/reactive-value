import { NumberValue } from './NumberValue'

describe('new NumberValue()', () => {
  test('value, increase, decrease, set, update, reset, onChange', () => {
    const num = new NumberValue(0)
    const mockFn = jest.fn()
    num.onChange(mockFn)
    expect(num.value).toBe(0)
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn.mock.calls[0][0]).toBe(0)

    num.increase()
    expect(num.value).toBe(1)
    expect(mockFn).toBeCalledTimes(2)
    expect(mockFn.mock.calls[1][0]).toBe(1)

    num.increase(3)
    expect(num.value).toBe(4)
    expect(mockFn).toBeCalledTimes(3)
    expect(mockFn.mock.calls[2][0]).toBe(4)

    num.decrease()
    expect(num.value).toBe(3)
    expect(mockFn).toBeCalledTimes(4)
    expect(mockFn.mock.calls[3][0]).toBe(3)

    num.decrease(2)
    expect(num.value).toBe(1)
    expect(mockFn).toBeCalledTimes(5)
    expect(mockFn.mock.calls[4][0]).toBe(1)

    num.set(10)
    expect(num.value).toBe(10)
    expect(mockFn).toBeCalledTimes(6)
    expect(mockFn.mock.calls[5][0]).toBe(10)

    num.update(n => n * 2)
    expect(num.value).toBe(20)
    expect(mockFn).toBeCalledTimes(7)
    expect(mockFn.mock.calls[6][0]).toBe(20)

    num.reset()
    expect(num.value).toBe(0)
    expect(mockFn).toBeCalledTimes(8)
    expect(mockFn.mock.calls[7][0]).toBe(0)
  })
})