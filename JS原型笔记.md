

# JS原型笔记

Object.hasOwnProperty() 判断对象是否包含属性

Object.create(father,{property:{key:value}}) //创建数据字典 没有原型方法

`obj.__proto__.fun`给原型添加方法

原型有的方法自己可以使用,优先执行自己的方法

## `__proto__`&`prototype`

1. `__proto__`是**每个对象**都有的一个属性，而`prototype`是**函数**才会有的属性。

2. `__proto__`指向的是**当前对象**的**原型对象**，而`prototype`指向的，是以**当前函数**作为**构造函数**构造出来的**对象**的**原型对象**。
3. 相当于父级原型

先看一段代码

```
function User() {}
let hd = new User();
console.dir(User);
console.log(hd);
```

![image-20210426095927360](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/e8HkPONYFyfg6Cp.png)

方法User对象具有`prototype`和`__proto__`两个原型

- 通过构造函数创建的实例对象u会继承User的`prototype`

- 当`prototype`和`__proto__`都有相同对象时 优先指向自己原型 的`__proto__`的方法

```js
function User() {}
let hd = new User();
console.dir(User);
console.log(u);
User.prototype.show = function () {
console.log('show prototype');
};
//   通过构造函数实例化的对象 原型添加show方法
hd.__proto__.show = function () {
console.log('show __proto__');
};
hd.show(); //show __proto__
```

![image-20210426100854203](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210426100854203.png)

![image-20210426101722073](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210426101722073.png)

## 创建原型和获取原型

Object.setPrototypeOf(child,parent)

Object.getPrototypeOf(child)

```js
let child = { name: '孩子' };
let parent = {
    name: '父母',
    show() {
        console.log('孩子的父母');
    }
};
Object.setPrototypeOf(child, parent); //设置原型
console.log(child);
child.show(); //使用原型的方法
console.log(Object.getPrototypeOf(child));//获取孩子原型
```

![image-20210426104743695](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210426104743695.png)

a instanceof b  //判断a原型链上是否含b (往上回溯)

a.isPrototypeOf(b) //b是否在a上原型链上 #对象

## in 和 hasOwnProperty

 a in b  除了检测a是否在b里 还检测a是否在b的原型链上

若只检测当前对象原型链则用 hasOwnProperty

for in 



## call apply借助其他对象原型链方法         

fun.call(object,...args) object为this的对象

fun.apply(object,[...args])

- 例子1 获取对象最大值

```js
//原型链获取最大值
let nums = {
    data:[1,2,4,6,78,2]
}
let score = {
    lessons:{js:22,css:31,php:0}
}
//nums原型链上的函数
Object.setPrototypeOf(nums,{
    max(data){
        return data.sort((a,b)=>b-a)[0]
    }
})
//score借助nums的方法实现输出分数最大值
console.log(nums.max.call(null,Object.values(score.lessons))) //31
//也可借助Math.max()
console.log(Math.max.apply(null,Object.values(score.lessons))) //31
```
- 例子2 过滤nodelist伪数组
```html
<body>
    <p id="p1" class="p2">一个段落</p>
    <p id="p1">二个段落</p>
    <script>
        // 过滤出只有 class 属性的p标签
        parr = document.querySelectorAll('p');
        console.log(parr); //NodeList(2) 伪数组无法使用数组方法
        //借助Array.prototype.filter实现过滤
        let ps = [].filter.call(parr, (item) => {
            console.log(item);
            return item.hasAttribute('class');
        });
        console.log(ps);
    </script>
</body>
```

![image-20210427161229936](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210427161229936.png)

## 构造函数 方法置入原型链节约内存空间

```js
function User(name){
    this.name = name;
    // 方法写入构造函数里 复用时需要占用内存
    // this.show =()=>console.log(this.name);
}

//1：原型链添加方法
// User.prototype.show = function(){console.log(this.name)}

//2: 写多个方法时还可以重构原型链
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
lisi.show() //李四
let zhangs = new User("张三")
zhangs.show() //张三
zhangs.get() //getFun
```

## 创建和获取原型方法

**非标准 `create`和`__proto__`**

Object.create(obj,{}) 创建原型 无法获取原型

可使用` __proto__`获取原型 

- obj.`__proto__`获取原型  
- obj.`__proto__` = xxx 设置原型

**标准` Object.setPrototypeOf(obj,proto)`  和  `Object.getPrototypeOf(obj)`**

## 原型小知识

1. this始终是调用属性的对象  Object.xx  this->Object

2. **不要滥用原型**

   - 不建议在系统原型上添加方法 不便引入第三方库

   - 代码不稳定 不健壮

3. `__proto__`不是严格意义上的方法而是 getter 和 setter 根据值自动判断
   - `__proto__`设置属性要求是个基本对象 可用Object.create(null)将对象原型设置为空就可以设置属性

# 原型的继承

**原型的继承不是改变构造函数的继承**

 ![image-20210427170925031](C:/Users/QAQWQ/AppData/Roaming/Typora/typora-user-images/image-20210427170925031.png)

**继承是原型的继承**

 ![image-20210427171404910](C:/Users/QAQWQ/AppData/Roaming/Typora/typora-user-images/image-20210427171404910.png)

### 多态

类似于流程控制 根据不同形态显示不同结果

```js
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
```



## *原型工厂封装继承

方式一 原型工厂

```js
function extend(pre, sup) {
    pre.prototype = Object.create(sup.prototype);
    Object.defineProperty(pre.prototype, 'constructor', {
        value: pre,
        enumerable: false
    });
}
function User(name, age) {
    this.name = name;
    this.age = age;
}
User.prototype.show = function () {
    console.log(this.name, this.age);
};
function admin(...args) {
    User.apply(this, args);
}
extend(admin, User);
let admin1 = new admin('网抽', 19);
admin1.show();//网抽 19
```

方式二 对象工厂

```js
function User(name, age) {
    this.name = name;
    this.age = age;
}
User.prototype.show = function () {
    console.log(this.name, this.age);
};
function member(name, age) {
    const member = Object.create(User.prototype);
    User.call(member, name, age);
    member.role = function () {
        console.log('Member');
    };
    return member;
}
let member1 = member('网抽', 19);
member1.show();
```

## 多继承困绕解决

- 问题：有这么一个情景：创建的管理员李四如何获取地址、积分并请求后台

```js
function extend(pre, sup) {
    pre.prototype = Object.create(sup.prototype);
    Object.defineProperty(pre.prototype, 'constructor', {
        value: pre,
        enumerable: false
    });
}
function User(name, age) {
    this.name = name;
    this.age = age;
}
User.prototype.show = function () {
    console.log(this.name, this.age);
};
function admin(...args) {
    User.apply(this, args);
}

function Address() {}
Address.prototype.getAddress = function () {
    console.log('地址获取');
};
function Credit() {}
Credit.prototype.getCredit = function () {
    console.log('积分获取');
};
function Request() {}
Request.prototype.ajax = function () {
    console.log('请求后台');
};

extend(admin, User);  //admin继承User
let lisi = new admin('李四', 19); //创建实例对象
```

方法一：借用方法   Address.prototype.getAddress.call(lisi);

方法二：多继承 lisi原型继承Credit...方法 会导致关系混乱

方法三：混入继承` mixin `方法二基础上改进

- ​	利用原型也是对象 向对象里置入方法  方法就成了属性 然后就可以引用了

- ```js
  function extend(pre, sup) {
      pre.prototype = Object.create(sup.prototype);
      Object.defineProperty(pre.prototype, 'constructor', {
          value: pre,
          enumerable: false
      });
  }
  function User(name, age) {
      this.name = name;
      this.age = age;
  }
  User.prototype.show = function () {
      console.log(this.name, this.age);
  };
  function admin(...args) {
      User.apply(this, args);
  }
  //   function Address() {}
  //   Address.prototype.getAddress = function () {
  //     console.log('地址获取');
  //   };
  //   function Credit() {}
  //   Credit.prototype.getCredit = function () {
  //     console.log('积分获取');
  //   };
  //   function Request() {}
  //   Request.prototype.ajax = function () {
  //     console.log('请求后台');
  //   };
  extend(admin, User);
  let lisi = new admin('李四', 19);
  // 将函数设置为对象形式
  const Credit = {
      getCredit: function () {
          console.log('积分获取');
      }
  };
  const Request = {
      ajax: function () {
          console.log('请求后台');
      }
  };
  const Address = {
      getAddress: function () {
          console.log('地址获取');
      }
  };
  //   单个设置比较麻烦
  //   admin.prototype.ajax = Request.ajax;
  //  批量设置 使用es6新特性 Object.assign()合并对象
  Object.assign(admin.prototype, Request, Address);
  lisi.ajax(); //请求后台
  lisi.getAddress(); //地址获取
  ```

## `mixin`内部继承和`super`

`super` ==` this.__proto__`

`super`不能单独使用

```js
function extend(pre, sup) {
    pre.prototype = Object.create(sup.prototype);
    Object.defineProperty(pre.prototype, 'constructor', {
        value: pre,
        enumerable: false
    });
}
function User(name, age) {
    this.name = name;
    this.age = age;
}
User.prototype.show = function () {
    console.log(this.name, this.age);
};
function admin(...args) {
    User.apply(this, args);
}
extend(admin, User);
let lisi = new admin('李四', 19);
// 将函数设置为对象形式
const Request = {
    ajax: function () {
        //   console.log('请求后台');
        return '请求后台';
    }
};
const Credit = {
    getCredit: function () {
        console.log('积分获取');
    }
};
const Address = {
    //继承时注意函数顺序
    __proto__: Request, //利用__proto__继承Request
    //getAddress: function () { //super会报错 暂时未知原因
    getAddress(){
        //console.log(this.__proto__.ajax() + '地址获取');   
        console.log(super.ajax() + '地址获取') //简写 效果相同
    }
};
//   单个设置比较麻烦
//   admin.prototype.ajax = Request.ajax;
//  批量设置 使用es6新特性 Object.assign()合并对象
Object.assign(admin.prototype, Request, Address);
lisi.getAddress(); //请求后台地址获取
```

## 应用实例

```js
// 封装个动画函数 让tab标签继承
function extend(sub, sup) {
    sub.prototype = Object.create(sup.prototype);
    sub.prototype.construtor = sup;
}
function animation() {}
animation.prototype.hide = function () {
    this.style.display = 'none';
};
animation.prototype.show = function () {
    this.style.display = 'block';
};
animation.prototype.background = function (color = 'red') {
    this.style.backgroundColor = color;
};
function Tab(el) {
    this.tab = document.querySelector(el);
    this.links = this.tab.querySelectorAll('a');
    this.sections = this.tab.querySelectorAll('section');
}
extend(Tab, animation);

Tab.prototype.run = function () {
    this.bindEvent();
};
Tab.prototype.bindEvent = function () {
    this.links.forEach((el, i) => {
        el.addEventListener('click', () => {
            this.reset();
            this.action(i);
        });
    });
};
// 重置 点击时统一设置标签颜色 隐藏所有区块内容
Tab.prototype.reset = function () {
    this.links.forEach((el, i) => {
        this.background.call(this.links[i], '#2ecc71');
        this.hide.call(this.sections[i]);
    });
};
// 执行动作 显示当前点击标签颜色 显示当前点击区块内容
Tab.prototype.action = function (i) {
    this.background.call(this.links[i], '#3498db');
    this.show.call(this.sections[i]);
};
// 创建实例并运行
new Tab('.tab1').run();
new Tab('.tab2').run();
```

![GIF 2021-4-28 11-46-30](C:\Users\QAQWQ\Desktop\GIF%202021-4-28%2011-46-30.gif)

<center style="color:#95a5a6">效果</center>

### 加以改进 进行定制化

- 指定标签运行

- 点击触发回调函数 

```js
//对先前部分代码进行修改
function Tab(obj) {
    // 设置默认属性
    obj = Object.assign({ el: null, link: 'a', section: 'section', callback: null }, obj);
    this.tab = document.querySelector(obj.el);
    this.links = this.tab.querySelectorAll(obj.link);
    this.sections = this.tab.querySelectorAll(obj.section);
    this.callback = obj.callback;
}
Tab.prototype.bindEvent = function () {
    this.links.forEach((el, i) => {
        el.addEventListener('click', () => {
            this.reset();
            this.action(i);
            if (this.callback) this.callback();
        });
    });
};
// 创建实例并运行 
// vue既视感
new Tab({
    el: '.tab1',
    callback() {
        console.log('tab1');
    }
}).run();
new Tab({
    el: '.tab2'
}).run();
```

