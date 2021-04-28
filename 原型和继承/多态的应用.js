function User(){}
User.prototype.show =function(){
    console.log(this.describe())
}
function Admin(){}
Admin.prototype = Object.create(User.prototype)
Admin.prototype.describe = function(){
    return "管理员"
}
function Member(){}
Member.prototype = Object.create(User.prototype)
Member.prototype.describe = function(){
    return "成员"
}
function Vip(){}
Vip.prototype = Object.create(User.prototype)
Vip.prototype.describe = function(){
    return "vip成员"
}
for (const i of [new Admin(),new Member,new Vip]) {
    i.show()
}
// 管理员
// 成员
// vip成员