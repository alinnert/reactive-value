import { mutableValue } from './mutableValue'

describe('reactive value', () => {
  test('value', () => {
    const mutVal = mutableValue(5)
    expect(mutVal.value).toBe(5)
    mutVal.set(3)
    expect(mutVal.value).toBe(3)
  })

  test('on change', () => {
    const mutVal = mutableValue(0)
    const mockCallback = jest.fn()
    mutVal.onChange(mockCallback)

    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback.mock.calls[0][0]).toBe(0)
    mutVal.set(100)
    expect(mockCallback).toHaveBeenCalledTimes(2)
    expect(mockCallback.mock.calls[1][0]).toBe(100)
  })
})
