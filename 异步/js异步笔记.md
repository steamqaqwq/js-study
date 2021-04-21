# 异步

> JS异步实质 使用模块处理数据时 放到任务列表 在主任务完成后轮询任务列表 

回调地狱：不断的回调函数操作将产生回调地狱，使代码很难维护

事件优先级:主任务同步队列>promise微任务队列>宏任务队列

promise 应用

1. 解决回调地狱 更加扁平化  更有层次性 而非嵌套再嵌套 

## promise

- 一个普通的promise 

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

## promise应用小案例-图片加载

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

<img src="C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210421162249556.png" alt="image-20210421162249556" style="zoom:50%;" />

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

![效果图](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210421230710992.png "RUNOOB")

<center>效果图</center>

## promise相关接口

- Promise.resolve() //直接成功发送消息 

  - 等同于 new Promise((resolve,reject)=>{resolve()})

- Promise.reject() //直接发送错误

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
    let promise2 = new Promise((resolve,reject)=>reject("失败")) //如果当前promise处理异常则 
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

     ![image-20210421234556127](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210421234556127.png)

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

  ![image-20210421235641232](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210421235641232.png)

<center>原先返回值</center>
![image-20210422000415406](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210422000415406.png)

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