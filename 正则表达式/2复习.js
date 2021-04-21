let hd = `
#1 js,200元 #
#2 php,300元 #
#9 houdunren.com # 后盾人
#3 node.js,180元 #
`;

let lesson = hd.match(/^\s*#\d\s.+\s#$/gm).map(item=>{
    let n = item.replace(/\s?#\d\s/,'').replace(/\s*#/,'')
    let [name,value]=n.split(',');
    return {name,value}
})
console.log(lesson)
