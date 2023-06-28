import { AutomatedValue } from './AutomatedValue'

describe('new AutomatedValue()', () => {
  test('value, onChange', (done) => {
    const automated = new AutomatedValue<number>(({ next }) => {
      next(10)
      next(20)
      setTimeout(() => {
        next(30)
      }, 200)
    })
    const mockFn = jest.fn()
    automated.onChange(mockFn)
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn.mock.calls[0][0]).toBe(20)
    
    setTimeout(() => {
      expect(mockFn).toBeCalledTimes(2)
      expect(mockFn.mock.calls[1][0]).toBe(30)
      done()
    }, 300)
  })

  test('value, no next() call', () => {
    const automated = new AutomatedValue(() => { })
    expect(automated.value).toBeUndefined()
  })
})
