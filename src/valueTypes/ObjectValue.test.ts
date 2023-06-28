import { ObjectValue } from './ObjectValue'

type TestObj = {
  name: string
  age: number
  admin: boolean
  color?: 'red' | 'green' | 'blue'
}

describe('new ObjectValue()', () => {
  test('basic functionality', () => {
    const testObj: TestObj = { name: 'Dave', age: 30, admin: false }
    const obj = new ObjectValue<TestObj>(testObj)
    const mockFn = jest.fn()
    obj.onChange(mockFn)
    const expectedValue1: TestObj = { name: 'Dave', age: 30, admin: false }
    expect(obj.value).toEqual(expectedValue1)
    expect(obj.getValue('name')).toBe(expectedValue1.name)
    expect(obj.getValue('age')).toBe(expectedValue1.age)
    expect(obj.getValue('admin')).toBe(expectedValue1.admin)
    expect(obj.getValue('color')).toBeUndefined()
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn.mock.calls[0][0]).toEqual(expectedValue1)

    obj.setValue('age', 31)
    const expectedValue2: TestObj = { name: 'Dave', age: 31, admin: false }
    expect(obj.value).toEqual(expectedValue2)
    expect(obj.getValue('name')).toBe(expectedValue2.name)
    expect(obj.getValue('age')).toBe(expectedValue2.age)
    expect(obj.getValue('admin')).toBe(expectedValue2.admin)
    expect(obj.getValue('color')).toBeUndefined()
    expect(mockFn).toBeCalledTimes(2)
    expect(mockFn.mock.calls[1][0]).toEqual(expectedValue2)

    obj.setValues({ age: 32, admin: true })
    const expectedValue3: TestObj = { name: 'Dave', age: 32, admin: true }
    expect(obj.value).toEqual(expectedValue3)
    expect(obj.getValue('name')).toBe(expectedValue3.name)
    expect(obj.getValue('age')).toBe(expectedValue3.age)
    expect(obj.getValue('admin')).toBe(expectedValue3.admin)
    expect(obj.getValue('color')).toBeUndefined()
    expect(mockFn).toBeCalledTimes(3)
    expect(mockFn.mock.calls[2][0]).toEqual(expectedValue3)

    obj.updateValue('name', (n) => n.toUpperCase())
    const expectedValue4: TestObj = { name: 'DAVE', age: 32, admin: true }
    expect(obj.value).toEqual(expectedValue4)
    expect(obj.getValue('name')).toBe(expectedValue4.name)
    expect(obj.getValue('age')).toBe(expectedValue4.age)
    expect(obj.getValue('admin')).toBe(expectedValue4.admin)
    expect(obj.getValue('color')).toBeUndefined()
    expect(mockFn).toBeCalledTimes(4)
    expect(mockFn.mock.calls[3][0]).toEqual(expectedValue4)

    obj.setValue('color', 'red')
    const expectedValue5: TestObj = {
      name: 'DAVE',
      age: 32,
      admin: true,
      color: 'red',
    }
    expect(obj.value).toEqual(expectedValue5)
    expect(obj.getValue('name')).toBe(expectedValue5.name)
    expect(obj.getValue('age')).toBe(expectedValue5.age)
    expect(obj.getValue('admin')).toBe(expectedValue5.admin)
    expect(obj.getValue('color')).toBe(expectedValue5.color)
    expect(mockFn).toBeCalledTimes(5)
    expect(mockFn.mock.calls[4][0]).toEqual(expectedValue5)

    obj.set({ name: 'Kevin', age: 28, admin: false, color: 'green' })
    const expectedValue6: TestObj = {
      name: 'Kevin',
      age: 28,
      admin: false,
      color: 'green',
    }
    expect(obj.value).toEqual(expectedValue6)
    expect(obj.getValue('name')).toBe(expectedValue6.name)
    expect(obj.getValue('age')).toBe(expectedValue6.age)
    expect(obj.getValue('admin')).toBe(expectedValue6.admin)
    expect(obj.getValue('color')).toBe(expectedValue6.color)
    expect(mockFn).toBeCalledTimes(6)
    expect(mockFn.mock.calls[5][0]).toEqual(expectedValue6)
  })
})
