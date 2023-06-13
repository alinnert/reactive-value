import { computedValue } from './computedValue'
import { mutableValue } from './mutableValue'

describe('computed value', () => {
  test('value', () => {
    const mutVal = mutableValue(1)
    const compVal = computedValue([mutVal], ([m]) => m * 2)
    expect(compVal.value).toBe(2)

    mutVal.set(5)
    expect(compVal.value).toBe(10)
  })
})