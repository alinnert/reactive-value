import { SignalValue } from './SignalValue'

describe('SignalValue', () => {
  test('basic functionality', () => {
    const signal = new SignalValue()
    const mockFn = jest.fn()
    signal.onSend(mockFn)

    expect(mockFn).toBeCalledTimes(1)
    expect(typeof mockFn.mock.calls[0][0]).toBe('symbol')
    expect(mockFn.mock.calls[0][1]).toEqual({ initialRun: true })
    
    signal.send()
    
    expect(mockFn).toBeCalledTimes(2)
    expect(typeof mockFn.mock.calls[1][0]).toBe('symbol')
    expect(mockFn.mock.calls[1][1]).toEqual({ initialRun: false })
    
    signal.send()
    
    expect(mockFn).toBeCalledTimes(3)
    expect(typeof mockFn.mock.calls[2][0]).toBe('symbol')
    expect(mockFn.mock.calls[2][1]).toEqual({ initialRun: false })
    expect(mockFn.mock.calls[1][0]).not.toBe(mockFn.mock.calls[2][0])
  })
})