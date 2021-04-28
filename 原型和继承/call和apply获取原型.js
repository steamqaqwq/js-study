//原型链获取最大值
let nums = {
    data:[1,2,4,6,78,2]
}
let score = {
    lessons:{js:22,css:31,php:0}
}
Object.setPrototypeOf(nums,{
    max(data){
        return data.sort((a,b)=>b-a)[0]
    }
})
console.log(Math.max.apply(null,Object.values(score.lessons)))

console.log(nums.max.call(null,Object.values(score.lessons)))

