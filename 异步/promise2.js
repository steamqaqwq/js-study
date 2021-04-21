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
.catch(error=>console.log(error)) //捕捉失败