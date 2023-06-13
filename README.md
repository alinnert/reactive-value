# @alinnert/reactive

This is a library for reactive values.

The implementation is based on `CustomEvent` and `EventTarget` which are available in the Browser and recent server runtimes like Node.js 19 and Deno.

The API is heavily inspired by [Recoil](https://github.com/facebookexperimental/Recoil) but this library is framework agnostic.

## Examples

### Mutable values

``` ts
const numberValue = mutableValue(1)

console.log(numberValue.value)

numberValue.onChange((numberVal) => {
  console.log(numberVal)
})
```

### Computed values

``` ts
const numberValue = mutableValue(1)
const doubleValue = computedValue([numberValue], (num) => num * 2)

console.log(doubleValue.value)

doubleValue.onChange((doubleVal) => {
  console.log(doubleVal)
})
```

### Automated values

``` ts
const intervalValue = automatedValue((next) => {
  let v = 0
  
  setInterval(() => {
    next(i++)
  }, 1000)
})

console.log(intervalValue.value)

intervalValue.onChange((intervalVal) => {
  console.log(intervalVal)
})
```
