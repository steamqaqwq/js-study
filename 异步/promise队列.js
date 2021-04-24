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
// queue(numarr)

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
// queuef([f1,f2])

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
reduceQueue(numarr)