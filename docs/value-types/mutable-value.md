# Mutable value

## Signature

~~~ ts
function mutableValue<T>(initialValue: T): MutableValue<T>
~~~

## Arguments

### `initialValue`

Type: `T`

## Returns

Type: `object`

### Properties

#### `mutableValue.value`

Type: `T`

**Readonly**. The current value stored inside the mutable value.

#### `mutableValue.set()`

Type: `(newValue: T) => void`

Setter function to update the value stored inside the mutable value.

#### `mutableValue.onChange()`

Type: `(listener: ReactiveValueListener<T>) => void`