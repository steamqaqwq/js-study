str = `心花怒放 200G
百花齐放 200G
繁花似锦 200G
店铺大卖 300G
浪漫樱花 50G
俏皮格桑 50G
娇羞海棠 50G
热情扶桑 20G
`
let chengyu = str.match(/\p{sc=Han}{4}/gu)
console.log(chengyu)

chengyu.forEach(v=>console.log(v+'\n')
)
