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
