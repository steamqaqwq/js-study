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

## 5 async / await 

5.1 :x: 

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log('start')
```

async1 start

sync1 end

start

async2

**正确：**

'async start'
'promise'
'async1 end'
'start'

5.3 :heavy_check_mark:

async1 start

async2 //宏任务settme1 timer2

//宏任务2 timer3

start

async1 end

//宏任务3 timer1

timer2

timer3

timer1



5.5 :x:

```js
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')

```

srcipt start

async1 start

promise1

srcipt end

async1 success

**正确**

在`async1`中`await`后面的`Promise`是没有返回值的，也就是它的状态始终是`pending`状态，因此相当于一直在`await`，`await`，`await`却始终没有响应...所以在`await`之后的内容是不会执行的，也包括`async1`后面的 `.then`。

'script start'
'async1 start'
'promise1'
'script end'

5.6 :heavy_check_mark:

'script start'

'async1 start'

'promise1'

promise1 resolve'

async1 success

5.7:heavy_check_mark:

rcipt start'

async1 start

promise1

'promise2'

async1 success

async1 end

timer

5.8:heavy_check_mark:

script start

async1 start"

async2

promise1

script end

async1 end

promise2

setTimeout

5.9 :x::question:

test start...

执行testSometing

promise start...

test end...

微1

testSometing

执行testAsync

微2

promise

微3

hello async

testSometing hello async



## 6. async处理错误

6.1

'async2

Uncaught (in promise) error 

## 7. 综合题

7.1 :heavy_check_mark:

3

7

4

1

2

5

promise <resolved():1>



7.2 :x:

```const async1 = async () => {
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
} 
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)
```

script start

async1

promise1

script end

//await 没有resolve() 不执行then

​	async1 end :x:

​	async1 success :x:

3 :x: then参数不是函数则resolve值会穿透

timer2 宏任务2 1秒 

timer1 宏任务1 2秒

**正确**

'script start'
'async1'
'promise1'
'script end'
1
'timer2'
'timer1'



7.3 :x:

```text
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})
```



resovle1

finally resovle1

timer1

promise <resolved:1>

**正确**

`finally`不管`Promise`的状态是`resolved`还是`rejected`都会执行，且它的回调函数是接收不到`Promise`的结果的，所以`finally()`中的`res`是一个迷惑项

最后一个定时器打印出的`p1`其实是`.finally`的返回值，我们知道`.finally`的返回值如果在没有抛出错误的情况下默认会是上一个`Promise`的返回值(`3.10`中也有提到), 而这道题中`.finally`上一个`Promise`是`.then()`，但是这个`.then()`并没有返回值，所以`p1`打印出来的`Promise`的值会是`undefined`

'resolve1'
'finally' undefined
'timer1'
Promise{<resolved>: undefined}

## 8面试题

## 8.1 使用Promise实现每隔1秒输出1,2,3

```js
//3种方式实现
function sleep(){
     return new Promise(resolve=>{
        setTimeout(resolve,1000)
     })
     
}
async function print123(arr){
    for (const i of arr) {
        await sleep();
        console.log(i)
    }
}
// print123([1,2,3])
function forof123(){
    let promise = Promise.resolve()
    for (const i of [1,2,3]) {
        promise =  promise.then(_=>{
            return new Promise(resolve=>{
                setTimeout(_=>{
                    console.log(i)
                    resolve()
                },1000)
            })
        })
    }
}

function map123(){
    let promise = Promise.resolve()
    let arr = [1,2,3]
    arr.map(num=>{
        promise =promise.then(_=>{
            return new Promise(resolve=>{
                setTimeout(() => {
                    console.log(num)
                    resolve()
                }, 1000);
            })
            
        })
    })
}
// map123()

function reduce123(){
    let promise = Promise.resolve()
    let arr = [1,2,3]
    arr.reduce((pre,cur)=>{
        return pre.then(_=>{
            return new Promise(resolve=>{
                setTimeout(() => {
                    console.log(cur)
                    resolve()
                }, 1000);
            })
        })
    },promise)
}
// reduce123()
```

### 8.2 使用Promise实现红绿灯交替重复亮

```js
// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？
//（用Promise实现）三个亮灯函数已经存在：
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
//方法一 promise语法糖简写
function setTime(x){
    return new Promise(resolve=>{
        setTimeout(resolve,x*1000)
    })
}
async function rgyLight(){
    await setTime(3);
    red();
    await setTime(2);
    green();
    await setTime(1);
    yellow();
    rgyLight()
}
// 方法二 promise 链式写
function step(callback,time){
    return new Promise(resolve=>{
        setTimeout(()=>{
            callback()
            resolve()
        },time*1000)
    })
}
function rgyLight2(){
    Promise.resolve()
    .then(_=>{
        return step(red,3)
    })
    .then(_=>{
        return step(green,1)
    }) 
    .then(_=>{
        return step(yellow,2)
    })
     .then(_=>{
        return rgyLight2()
    })
}
rgyLight2()
```

### 8.3 实现mergePromise函数

```js
// 实现mergePromise函数，把传进去的promise数组按顺序先后执行，并且把返回的数据先后放到数组data中。
// Promise.all()按顺序
let promise1 = Promise.resolve(1);
let promise2 = Promise.resolve(2);
let promise3 = Promise.resolve(5);

async function mergePromise(promarr){
    function setTime(x,promise){
        return new Promise(resolve=>{
            setTimeout(()=>{
                resolve(promise)
            },x*1000)
        })
    }
    resarr=[]
    for (const promise of promarr) {
         let res = await setTime(1,promise);
         console.log(res)
         resarr.push(res);
    }
    console.log("done")
    console.log(resarr)
    
    return resarr;
}
mergePromise([promise1,promise2,promise3])

// 依次输出
// 1
// 2
// 5
// done
// [ 1, 2, 5 ]
```

### 8.4 根据promiseA+实现一个自己的promise