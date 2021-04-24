2.2 1 2 4 timerStart timerEnd success

2.3 .1√

(1)start timer1 timer2 timer3

(2)start timer1 promise timer2 

2.3.2 √

start  promise1 timer1 promise2 timer2

2.4 ×

 promise1 promise1{pending}

promise2 promise2{pending}

 promise1 promise1{pending}

promise2 promise2{pending}

error!!!

**正确**

 promise1 promise1{pending}

promise2 promise2{pending}

error

 promise1 promise1{resolved}

promise2 promise2{rejected}

2.5 √

promise1里的内容

 promise1 promise1{pending}

promise2 promise2{pending}

timer1

error!!!

timer2

 promise1 promise1{resolved}

promise2 promise2{rejected}



3.5

timer

success 间隔

undefine 间隔+

**正确**

'timer' 

'success' 1001

 'success' 1002

`promise` 内部状态一经改变，并且有了一个值，那么后续每次调用 `.then` 或者 `.catch` 都会直接拿到该值。



#### ☆3.6 :sweat_smile:

```js
Promise.resolve().then(() => {  
    return new Error('error!!!') 
}).then(res => {  console.log("then: ", res) }).catch(err => {  console.log("catch: ", err) })
```

`then: " "Error: error!!!" `

返回任意一个非 `promise` 的值都会被包裹成 `promise` 对象，因此这里的`return new Error('error!!!')`也被包裹成了`return Promise.resolve(new Error('error!!!'))`。

`.then` 或 `.catch` 返回的值不能是 promise 本身，否则会造成死循环。

`then` 或者 `.catch` 的参数期望是函数，传入非函数则会发生**值透传**。



## finally()

- `.finally()`方法不管`Promise`对象最后的状态如何都会执行
- `.finally()`方法的回调函数不接受任何的参数，也就是说你在`.finally()`函数中是没法知道`Promise`最终的状态是`resolved`还是`rejected`的
- 它最终返回的默认会是一个**上一次的Promise对象值**，不过如果抛出的是一个异常则返回异常的`Promise`对象。

- **finally()会再抛出一个微任务 then抛出的微任务包括finally** 

3.9

finally1

finally then 1 :x:

捕获错误 finally抛出的异常

3.9.2:x:

promise1

1

finally1

error

finally2

**正确**

'promise1'
'1'
'error'
'finally1'
'finally2'

4.2

1 

rej4

 

[]

## promise.all()

同时`.catch()`函数能够捕获到`.all()`里最先的那个异常，并且只执行一次。

