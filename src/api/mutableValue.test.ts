import { describe, expect, test, jest } from '@jest/globals'
import { mutableValue } from './mutableValue'

describe('reactive value', () => {
  test('value', () => {
    const testValue = mutableValue(5)
    expect(testValue.value).toBe(5)
    testValue.set(3)
    expect(testValue.value).toBe(3)
  })

  test('on change', () => {
    const testValue = mutableValue(0)
    const mockCallback = jest.fn()
    testValue.onChange(mockCallback)

    expect(mockCallback.mock.calls).toHaveLength(1)
    expect(mockCallback.mock.calls[0][0]).toBe(0)
    testValue.set(100)
    expect(mockCallback.mock.calls).toHaveLength(2)
    expect(mockCallback.mock.calls[1][0]).toBe(100)
  })
})
