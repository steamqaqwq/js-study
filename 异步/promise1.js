
// setTimeout(()=>{
//     console.log("setTimeout宏任务4")
    
// })
// // promise 微任务
// new Promise(resolve=>{
//     resolve(); //发送成功通知 then接受到通知才将任务放入微任务列表
//     // reject()
//     console.log("promise同步任务1")
// }).then(value=>console.log("成功3"))
// console.log("同步任务2")

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

setTimeout(() => {
    console.log(p1)
    // console.log(p2) 
},222);
// 执行结果第一个p1