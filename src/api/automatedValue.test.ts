import { automatedValue } from './automatedValue'

describe('automated value', () => {
  test('single value', () => {
    const mockCallback = jest.fn()
    const autoVal = automatedValue((next) => {
      next(1)
    })
    autoVal.onChange(mockCallback)

    expect(autoVal.value).toBe(1)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback.mock.calls[0][0]).toBe(1)
  })

  test('multiple values', (done) => {
    const mockCallback = jest.fn()
    const autoVal = automatedValue((next) => {
      next(1)
      setTimeout(() => {
        next(2)
      }, 100)
    })
    autoVal.onChange(mockCallback)

    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback.mock.calls[0][0]).toBe(1)
    setTimeout(() => {
      expect(mockCallback).toHaveBeenCalledTimes(2)
      expect(mockCallback.mock.calls[1][0]).toBe(2)
      done()
    }, 150);
  })
})