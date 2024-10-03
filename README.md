# @alinnert/reactive

This is a library for reactive values.

The implementation is based on `CustomEvent` and `EventTarget` which are available in the Browser and recent server runtimes like Node.js 19 and Deno.

The API is heavily inspired by [Recoil](https://github.com/facebookexperimental/Recoil) but this library is framework agnostic.

## Examples

### Mutable values

``` ts
const counter$ = mutableValue(1)

console.log(counter$.value)

counter$.onChange((numberVal) => {
  console.log(numberVal)
})
```

### Computed values

``` ts
const counter$ = mutableValue(1)
const doubleCounter$ = computedValue([counter$], (num) => num * 2)

console.log(doubleCounter$.value)

doubleCounter$.onChange((doubleCounterValue) => {
  console.log(doubleCounterValue)
})
```

### Automated values

``` ts
const interval$ = automatedValue((next) => {
  let val = 0
  
  setInterval(() => {
    next(val++)
  }, 1000)
})

console.log(interval$.value)

interval$.onChange((intervalValue) => {
  console.log(intervalValue)
})
```
