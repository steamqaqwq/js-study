# JS任务轮询

> 具体可先参考这篇细致文章https://www.jianshu.com/p/bfc3e319a96b

**任务优先级**：

​	主任务(同步列表)>>微任务列表(promise..)>宏任务(异步列表setTimeout..)

![img](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/20210423134805.webp)

执行宏任务过程可能生成微任务、宏任务 那就宏任务后继续轮询任务列表

小试身手(对原题setTimeout嵌套setTimeout)

```js
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
    new Promise((resolve)=>{
        console.log('setTimeout中promise')
        resolve()
    }).then(_=>{
        setTimeout(_=>{
            console.log('setTimeout中seTimeout')
        },0)
    })
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
//依次输出
// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout中promise
// setTimeout
// setTimeout中seTimeout
```

## DOM渲染任务

DOM渲染是宏任务 所以dom渲染要在<code><script src="js/ajax.js"></script></code>引入后再渲染

若引用js花费大量时间,导致dom渲染慢,那用户的体验就差

所以将js引入放到后边是不错选择

```html
<html lang="en">
  <head>
    <script src="js/for10000times.js"></script>
    <title></title>
  </head>
  <body>
     <h1>标题</h1> //js引入后再渲染出来
     <- <script src="js/for10000times.js"></script> -> //先渲染引入js
  </body>
</html>

```