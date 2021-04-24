// 遍历数组并延长打印每一个元素
let arr =[1,2,3,4,5]
async function sleep(time=1000){
    return new Promise(resolve=>{
        setTimeout(_=>{
            resolve();
        },time)
    })
}
async function delayArr(arr){
    for (const iterator of arr) {
        await sleep(1000);
        console.log(iterator)
    }
}
delayArr(arr)