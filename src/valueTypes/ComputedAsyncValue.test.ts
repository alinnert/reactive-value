import {
  ComputedAsyncValue,
  ComputedAsyncValueResultValue,
} from './ComputedAsyncValue'
import { Value } from './Value'

describe('new ComputedAsyncValue()', () => {
  test('basic functionality', (done) => {
    const value = new Value(10)
    const computedAsync = new ComputedAsyncValue([value], (val) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(val * 2)
        }, 200)
      })
    })
    const mockFn = jest.fn()
    computedAsync.onChange(mockFn)
    const expectedPending: ComputedAsyncValueResultValue<number> = {
      status: 'pending',
    }
    expect(computedAsync.value).toEqual(expectedPending)
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn.mock.calls[0][0]).toEqual(expectedPending)

    setTimeout(() => {
      const expectedResolved: ComputedAsyncValueResultValue<number> = {
        status: 'resolved',
        value: 20,
      }
      expect(computedAsync.value).toEqual(expectedResolved)
      expect(mockFn).toBeCalledTimes(2)
      expect(mockFn.mock.calls[1][0]).toEqual(expectedResolved)
      done()
    }, 300)
  })
})
