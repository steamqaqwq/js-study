let str = 'slfjlhgosh2020';
// 选择符或者
console.log(/a|f/.test(str));
//原子表 原子组
let reg = /[123456]/; //1|2|3... 前面加…… 除了这些都要
let reg2 = /(12|34|20)/; 
console.log(str.match(reg));

//转义字符
// . 除换行外任何字符 .普通点 
// 字符串里 \d = d  所以需要转义 \ 即 \\d
let price = "@123.22";

let reg3 = new RegExp("\\d+\\.\\d+");
console.log("reg3 \\d+\\.\\d+")

console.log(reg.test(price))
let url = 'https://www.bilibili.com/video/BV12J41147fC?p=7&spm_id_from=pageDriver';
console.log(/https?\:./.test(url))

// 字符边界符 如果没有边界找到就行
// ^起始 $结束 ^\d$ 数字开始结束

// 原子表 实例  \D 除了数字 \w
let name2 =`
    李四:010-6666666,
    老八:020-99999999
`
console.log(name2.match(/[^\s-\d:,]+/g)) //人名
console.log(name2.match(/\d{3}-\d{6,9}/g)); //要的号码

// 所有字符 [\s\S] 
let url2 = `
    <span>sldkfjl  
    isdf</span>
`
console.log(url2.match(/<span>[\s\S]+<\/span>/))

// 模式修正符 i不区分大小写 g全局#否则匹配一个 s单行
// s	视为单行忽略换行符
let name3 = "zhengzeb Biaodaui";
console.log(name3.match(/b/gi))

 //多行匹配 !!!!
 let hd = `
 #1 js,200元 #
 #2 php,300元 #
 #9 houdunren.com # 后盾人
 #3 node.js,180元 #
`;
let n = hd.match(/^\s*#\d\s+.+\s#$/gm)
let lesson = n.map(v=>{
    v=v.replace(/\s*#\d+\s*/,'').replace(/\s*#/,'');
    let [name,value]=v.split(',');
    return {name,value};
})
console.log(lesson);

// 中文匹配 p{属性} L#字母 Han#汉语 P#标点 需配合u模式宽度up
let newStr = "奥利给!zz"; 
console.log(newStr.match(/\p{sc=Han}/gu));

// exec 与 lastIndex  全局记录索引 exec根据索引位置继续查找
let str6 = "refnefef"
let reg4 = /\w/g;
console.log(reg4.lastIndex)
console.log(reg4.exec(str6))
console.log(reg4.lastIndex)
console.log(reg4.exec(str6))

// y模式 连续就继续找 不连续就不找了
let hd2 = `后盾人QQ群:11111111,999999999,88888888
后盾人不断分享视频教程，后盾人网址是 houdun.com`;
let reg7 = /(\d+),?/y
reg7.lastIndex=7;
let qq =[];
while((res=reg7.exec(hd2)))qq.push(res[1]);
console.log(qq);

