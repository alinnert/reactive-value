# Get started

## Install

~~~
npm install @alinnert/reactive
~~~

## Use

~~~ ts
import { mutableValue } from '@alinnert/reactive'

const myValue = mutableValue(5)

myValue.onChange((v) => {
  console.log(v)
  // Logs:
  // 5
  // 10
})

myValue.set(10)
~~~