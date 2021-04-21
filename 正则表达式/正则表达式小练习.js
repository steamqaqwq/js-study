// 千分位 练习1
function numberWithCommas(x) {
    //对右侧人口数字的格式化处理，三位数字用一个','(逗号)隔开
    // 后面非数字先被替换 后右有非数字 如此往复
    return x.toString().matchAll(/(?=(\d{3})+(?!\d))/g);
    
}
console.log(numberWithCommas(12345678))//12,345,678
// 练习2
var imgs = [
    'http://img.host.com/images/fds.jpg',
  'https://img.host.com/images/fjlj.jpg',
  'http://img.host.com/images/djalsdf.png',
  'https://img.host.com/images/adsjfl.png',
  'http://img.host.com/image/jasdlf.jpg'
];
let reg = /(http).+jpg/
var newarr = []
for (const i of imgs) {
    let res2 = i.replace(/http:(.+\.jpg)/,(v,p1)=>p1)
    newarr.push(res2);
}
// console.log(newarr)
 

// 时间格式 - - 练习3
var times= ['2006/02/03',
  'test/07/sd',
  '2016/05/10',
  '1998-03-07',
  '12345/23/45678',
  '1234/23/56789',
  '12345/23/45']
  let regdate = /^(\d{4})[/-](\d{2})[/-](\d{2})$/
let datearr = times.map(item=>{
    return item.replace(regdate,(v,...args)=>{
        return v.replace(/[-/]/g,'-')
        
    })
    
    
})
console.log(datearr)

// 练习4
var str = 'borderLeftColor';
var str2 = 'border-left-color';
// 实现相互转换
console.log(str.replace(/[A-Z]/g,v=>'-'+v.toLowerCase()))
console.log(str2.replace(/-([a-z])/g,(v,p1)=> p1.toUpperCase()))

// .*? 最小匹配
// 练习5 匹配字符串中所有的HTML（1）标签头部 或 尾部 （2）标签头部（3）完整标签
var str = 'ada<option value="hh">0</option>54<div id="as">adda</div>ad'

// （1）匹配头或尾
var result = str.match(/<.*?>/g);
console.log(result); //["<option value="hh">0</option>54<div id="as">adda</div>"]

// (2)匹配头
console.log(str.match(/<[a-z].*?>/g))

// （3）完整标签
console.log(str.match(/<.*?>[\s\S]+?<\/.*?>/g))

// 习题6
var str = 'dgfhfgh254bhku289fgdhdy675gfh';
let reg6 = /\d{3}/g
console.log(str.match(reg6))
