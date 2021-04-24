# 异步

[TOC]

> JS异步实质 使用模块处理数据时 放到任务列表 在主任务完成后轮询任务列表 
>
> promise相关练习题：https://juejin.cn/post/6844904077537574919

回调地狱：不断的回调函数操作将产生回调地狱，使代码很难维护

事件优先级:主任务同步队列>promise微任务队列>宏任务队列

promise 应用

1. 解决回调地狱 更加扁平化  更有层次性 而非函数嵌套再嵌套 

## promise

- promise "**承诺**" :承诺先完成上个异步操作再接续运行。

  **核心**：将嵌套的异步操作扁平化成链式操作，使得异步操作更加清晰，便于维护。
  
- 一个普通的promise写法

  promise 状态改变后不会再改变

```js
let p1 = new Promise((resolve,reject)=>{
    // resolve('OK') 状态改变成功
    reject("fail") //状态改变失败
}).then(
    value=>{
        console.log("成功消息:"+value);
    },
    reason=>{
        console.log("失败理由："+reason)
    }
)
```

- promise事件顺序体会

```js
setTimeout(()=>{
    console.log("setTimeout宏任务4")
})
// promise 微任务
new Promise(resolve=>{
    resolve(); //发送成功通知(改变状态) 才将任务放入微任务列表
    // reject()
    console.log("promise同步任务1")
}).then(value=>console.log("微任务成功3"))
console.log("同步任务2")
//执行结果
//promise同步任务1
//同步任务2
//微任务成功3
//setTimeout宏任务4
```

- promise then

  then 返回的是一个promise 可以接续处理 
  
  一个promise 对应一个then
  
  ☆后面then 对前面返回的promise处理

```js
let p1 = new Promise((resolve,reject)=>{
    // resolve('OK')
    reject("fail")
}).then(
    value=>{
        console.log("成功消息:"+value);
        return 'success2' 
    },
    reason=>{
        console.log("失败理由："+reason)
        return 'fail2'
    }
)
let p2 = p1.then(
    v=>console.log(v)
,reason=>console.log("又失败了"+reason))

//执行结果
// fail2   p2then与p1状态无关 默认成功 所以执行console.log(v)
// 第一个the return才能给第二个then值

```

- catch错误处理

  多个then时 需要对reject处理 否则报错 

  可以统一错误处理最后加catch(error=>{})

```js
new Promise((resolve,reject)=>{
    resolve("成功")
})
.then(value=>{
    return new Promise((resolve,reject)=>{
        reject("失败")
    })
})
.then(value=>{
    console.log(value) //没有失败处理报错
})
.catch(error=>console.log(error)) //统一捕捉失败

//执行结果 失败
```

- finally 无论成功与否都会执行

## promise应用小案例-封装图片加载

```js
function loadimg(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            resolve(image); //图片加载成功
        };
        image.onerror = () => {
            reject(image);//图片加载失败
        };
    });
}
loadimg('./img.jpg').then((image) => {
    image.style.border = '5px solid red';
    image.style.width = '50%';
    document.querySelector('body').appendChild(image);
});
```

效果

<img src="https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/20210423134500.png" alt="image-20210421162249556" style="zoom:50%;" />

## promise数据缓存

函数是对象 所以放入数据作缓存

```js
  //函数也是对象 对象就可以存值
  function query(name) {
    //设置缓存 没有就设置map类型缓存
    const cache = query.cache || (query.cache = new Map());
    // 检测缓存是否有值 有走缓存
    if (cache.has(name)) {
      return Promise.resolve(cache.get(name));
    }
      //封装的ajax申请后台数据
    return ajax(`http://xu.study/user.php?name=${name}`).then((user) => {
      cache.set(name, user); //存入键值
      return user;
    });
  }
  query('李四').then((v) => console.log(v));
```

![效果图](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/20210423134629.png "RUNOOB")

<center>效果图</center>

## promise相关接口

- Promise.resolve() //直接成功发送消息 

  - 等同于 new Promise((resolve,reject)=>{resolve()})

- Promise.reject() //直接发送错误消息

- Promise.all([promise1,promise2...]) //批量处理promise 

  - ```js
    // 两个promise 都成功的情况
    let promise1 = new Promise(resolve=>resolve("OK"))
    let promise2 = new Promise(resolve=>resolve("成功"))
    Promise.all([promise1,promise2]).then(
        success=>{
            console.log(success) //返回两个promise结果 [ 'OK', '成功' ]
        }
    )
    ```

  - ```js
    // promise 其中一个拒绝
    let promise1 = new Promise(resolve=>resolve("OK"))
    let promise2 = new Promise((resolve,reject)=>reject("失败")) //如果处理异常则状态为成功
    Promise.all([promise1,promise2]).then(
        success=>{
            console.log(success) 
        }
    ).catch(error=>console.log(error)) //打印 "失败"
    ```

  - ```js
    // 批量获取用户
    function getUsers(users) {
        let promises = users.map((username) => {
            return ajax(`http://xu.study/user.php?name=${username}`);
        });
        Promise.all(promises).then((users) => {
            console.log(users);
        });
    }
    getUsers(['李四', '王五']); 
    ```

     ![image-20210421234556127](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/20210423134658.png)

- Promise.allSettled([promise1,promise2...]) //不管成功与否都算成功 但有状态值

  ```js
  // 批量获取用户
  function getUsers(users) {
      let promises = users.map((username) => {
          return ajax(`http://xu.study/user.php?name=${username}`);
      });
      Promise.allSettled(promises).then((users) => {
          //进行过滤 正确的留下
          let correctUsers = users.filter((user) => {
              return user.status == 'fulfilled';
          });
          console.log(correctUsers);
      });
  }
  getUsers(['李四', '王']);
  ```

  ![image-20210421235641232](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/20210423134701.png)

<center>原先返回值</center>
![image-20210422000415406](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/20210423134704.png)

<center>过滤返回值</center>

- Promise.race([promise1,promise2...]) //返回时间用时更短promise

  ```js
  let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve('promise1');
      }, 200);
  });
  let promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve('promise2');
      }, 1000);
  });
  Promise.race([promise1, promise2])
      .then((value) => console.log(value)); //promise1
  ```

## promise队列

设置promise任务列表 根据上一个promise状态依次执行 

每次的then返回新promise

```js
let numarr = [1,2,3,4,5]
function queue(numarr){
        let promise = Promise.resolve();
        numarr.map(num=>{      
            promise = promise.then(_=>{ //_ 表示空传值
                return new Promise((resolve,reject)=>{
                    setTimeout(_=>{
                        console.log(num) 
                        resolve()        
                    },1000)
                })
        })
    })
}
queue(numarr) //每隔一秒依次打印 1 2 3 4 5
```

```js
function f1(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            console.log("f1")
            resolve()        
        },1000)
    })
}
function f2(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            console.log("f2")
            resolve()        
        },2000)
    })
}
function queuef(promisesArr){
    let promise = Promise.resolve();
    promisesArr.map((f)=>{      
        promise = promise.then(_=>{ //_ 表示空传值
            return f();
    })
    })
}
queuef([f1,f2]) //依次打印 f1 f2
```

```js
//用reduce实现promise队列
function reduceQueue(nums){
    nums.reduce((promise,cur)=>{ //reduce((pre,cur),intValue)
        return promise.then(_=>{
            return new Promise((resolve)=>{
                setTimeout(() => {
                    console.log(cur)
                    resolve()
                }, 1000);
            })
        })
       
    },Promise.resolve())
}
reduceQueue([1,2,3,4,5]) //每隔一秒依次打印 1 2 3 4 5
```

**队列请求后台数据**

```js
class User {
    // 实现任务队列
    render(users) {
        users.reduce((pre, cur) => {
            return pre.then((_) => {
                return this.ajax(cur).then((user) => {
                    this.view(user);
                });
            });
        }, Promise.resolve());
    }
    //渲染数据到页面
    view(user) {
        return new Promise((resolve) => {
            let h2 = document.createElement('h2');
            h2.innerHTML = user.name;
            document.body.appendChild(h2);
            resolve();
        });
    }
    ajax(username) {
        return new Promise((resolve, reject) => {
            let url = `http://xu.study/user.php`;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `${url}?name=${username}`);
            xhr.send();
            xhr.onload = function () {
                if (this.status == 200) {
                    resolve(JSON.parse(this.response));
                } else if (this.status == 404) {
                    reject(new HttpError('用户不存在'));
                } else {
                    reject('加载失败');
                }
            };
            xhr.onerror = function () {
                reject(this);
            };
        });
    }
}
new User().render(['王五', '李四']); //页面逐个渲染出h2 后台延迟1秒
```

## async & await 

### async 和await 都是Promise 语法糖 

- async一个是promise简写
- await一个then简写
- await 只能在async函数内写
- await 后面跟promise

实质使异步变同步

```js
//async
new Promise((resolve,reject)=>{
    resolve("OK")
}).then(v=>console.log(v)) //OK
//比较 f1返回promise
async function f1(){
    return "Ok2"
}
f1().then(v=>console.log(v)) //Ok2
```

```js
//await 异步同步化
async function hd(message) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(message);
        }, 2000);
    });
}
async function run() {
    let h1 = await hd("1");
    console.log(h1);
    let h2 = await hd("2");
    console.log(h2);
}
run();// 2秒后输出1  再2秒后输出2
```

```js
//体会await是then语法糖
async function getUser(name) {
    let host = 'http://xu.study';
    let user1 = await ajax(`${host}/user.php?name=${name}`);
    console.log(user1);
    let user2 = ajax(`${host}/user.php?name=${name}`).then((v) => console.log(v));
    //user1 等同于 user2
    //明显await语法糖不用then回调函数 更加优雅简洁
}
getUser('王五');
```

### sleep函数简单实现

```js
let arr =[1,2,3,4,5]
async function sleep(time=1000){
    return new Promise(resolve=>{
        setTimeout(_=>{
            resolve();
        },time)
    })

async function delayArr(arr){
    // forEach 里是for循环回调函数 相当于 for 循环执行了这个异步函数，所以是并行执行
    for (const iterator of arr) {
        await sleep(1000);
        console.log(iterator)
    }
}
delayArr(arr) //每隔一秒一次打印一个元素 
```

### 进度条实现

```js
(async () => { //立即执行函数
    let users = ['张三', '李四', '王五', '赵六'];
    let count = 0;
    for (let i of users) {
        let user = await ajax(`http://xu.study/user.php?name=${i}`);
        console.log(user);
        let load = document.querySelector('#loading');
        let widthPercent = Math.round((++count / users.length) * 100);
        console.log(widthPercent);
        load.style.width = widthPercent + '%';
        load.innerHTML = widthPercent + '%';
    }
})();
```

![GIF 2021-4-22 17-03-25](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/20210423134712.gif)

### 类的结合

```js
class User {
    constructor(name) {
        this.name = name;
    }
    then(resolve, reject) {
        let user = ajax(`http://xu.study/user.php?name=${this.name}`);
        resolve(user);
    }
}
async function getUser(username) {
    let user = await new User(username);
    console.log(user);
}
getUser('王五');
```

