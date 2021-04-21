// promise.all
// 两个promise 都成功的情况
// let promise1 = new Promise(resolve=>resolve("OK"))
// let promise2 = new Promise(resolve=>resolve("成功"))
// Promise.all([promise1,promise2]).then(
//     success=>{
//         console.log(success) //返回两个promise结果 [ 'OK', '成功' ]
//     }
// )
// promise 其中一个拒绝
let promise1 = new Promise(resolve=>resolve("OK"))
let promise2 = new Promise((resolve,reject)=>reject("失败"))
Promise.all([promise1,promise2]).then(
    success=>{
        console.log(success) //返回两个promise结果 [ 'OK', '成功' ]
    }
).catch(error=>console.log(error)) //打印 "失败"

// 批量获取用户
function getUsers(users){
    let promises = users.map(username=>{
        ajax(`http://xu.study/user.php?name=${username}`)
    })
    console.log(promises)
}