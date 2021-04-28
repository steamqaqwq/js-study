function User(name){
    this.name = name;
    // 方法写入构造函数里 复用时需要占用内存
    // this.show =()=>console.log(this.name);
}
// User.prototype.show = function(){console.log(this.name)}

// 写多个方法时还可以重构原型链
User.prototype = {
    construtor:User,
    show(){
        console.log(this.name)
    },
    get(){
        console.log("getFun")
    }
}
let lisi = new User("李四")
lisi.show()
Object.getPro()
let zhangs = new User("张三")
zhangs.show()
zhangs.get()
