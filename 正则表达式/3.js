// 原子表里所有字符原义

// 原子组 ()组编号

// test是RegExp的方法，参数是字符串，返回值是boolean类型。
// match是String的方法，参数是正则表达式，返回值是数组。

// 贪婪匹配 重复对象匹配
let str = "abbbba";
// * 0个或多个
console.log(str.match(/ab*/));
// + 一个或多个  
console.log(str.match(/ab+/));

// 贪婪限定数量匹配
console.log(str.match(/ab{3}/));
console.log(str.match(/ab{1,}/));

// 禁止贪婪 ? #/ad+?/

// split(也可正则)

// $` $' $&  正则内容左边 右边 内容

let tel = "(010)98882334 (020)02348123"
let reg = /\((\d{3})\)\d{7,8}/g
let res = tel.match(reg)
console.log(res)

// 原子组别名 (?<name>xxx) 提取$<name>代替$1

// 正则表达式 断言匹配#条件语句
let reg2 = /xu(?=333)/g  //查找xu且后面是333的xu
let reg3 = /(?<=j)xu/g //查找xu且前面是j的xu
let xuxu = "xuxujxuxu333"
console.log(xuxu.match(reg2))
// 可用于电话模糊处理

// 断言二(1) 后面不是谁
//  反义 ?=后面是  ?!后面不是
let hd = "xclvjlsdjf2020sdlfjl"
// 后面不是数字 $以字母结尾 对判断不生效
let reg4 = /[a-z]+(?!\d)$/
console.log(hd.match(reg4))

//特例  /^(?!.*xu.*)/i 不能出现xu字符 .* 0或多个
// 不能有 xxxxukks xuljlsdfj  lxcjvxu这种结构

// 断言二(2)前面不是谁
// 原本：?<=  反义 ?<!
