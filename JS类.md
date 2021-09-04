# JS类

类作为原型的语法糖,比原型更舒服 实际还是原型:joy:

## 类体验

```js
// 函数形式
function User(name) {
    this.name = name;
}
User.prototype.show = function () {
    console.log(this.name);
};
let lisi = new User('李四');
lisi.show(); //李四
// 类中方法不需要','隔开
class User2 {
    //   自动执行 参数初始化
    constructor(name) {
        this.name = name;
    }
    show() {
        console.log(this.name);
    }
}
let zhangs = new User2('张三');
zhangs.show(); //张三
```

- 结构

![image-20210429092711942](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210429092711942.png)

- 特征

![image-20210429094408682](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210429094408682.png)

异同:

1. 可以看出类和函数的结构是一样的

2. **类中定义的方法会自动加入原型链中**

3. 类定义的不会遍历原型中的方法 而构造函数默认会

4. 类默认在严格模式下运行 

# 类的静态属性

静态属性就是~~大家~~每个对象都可用的属性:smiley: 节省内存占用

```js
class User {
    classname = '3-1班';
}
let zhangs = new User('张三');
let lisi = new User('李四');
console.dir(User);
console.log(zhangs);
console.log(lisi);
```

![image-20210429100514351](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210429100514351.png)

```js
//加上一个static关键字
class User {
    static classname = '3-1班';
}
let zhangs = new User('张三');
let lisi = new User('李四');
console.dir(User);
console.log(zhangs);
console.log(lisi);
```

![image-20210429100838866](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210429100838866.png)

应用

```js
class User {
    static classname = '3-1班';
	constructor(name) {
    	this.name = name;
	}
	getDetail() {
    	return User.classname + this.name;
	}
}
let zhangs = new User('张三');
let lisi = new User('李四');
console.log(zhangs.getDetail()); //3-1班张三
console.log(lisi.getDetail()); //3-1班李四
```

## 类的静态方法

**理解**：静态方法类比静态属性,就是当函数作为对象时置入的方法，即对象的属性而非挂载到类上的方法会到原型链上

**用途**：一般用来批量创建对象 而非单个对象单独创建

```js
class User {
    static showS() {
        console.log('class static show');
    }
}
User.__proto__.show = function () {
    console.log('static show');// 定义在函数作为对象的原型链上
};
User.show();
User.showS();
console.dir(User);
```

![image-20210429160244246](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210429160244246.png)

```js
//小案例
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    static create(...args) {
        //等同于new User() 此时User调用create  User是create对象 this指向User
        return new this(...args);
    }
}
let lisi = User.create('李四', 18);
console.log(lisi); //User {name: "李四", age: 18}
```

课程管理小案例

```js
class Lesson {
    constructor(data) {
        this.model = data;
    }
    //批量创建 并对name 首字母大写
    static createLesson(data) {
        return data.map((lesson) => {
            // 复习知识写的麻烦点
            lesson.name = lesson.name.replace(/(\w)/, (p0, p1) => p1.toUpperCase());
            return lesson;
        });
    }
    //统计
    static totalPrice(data) {
        return data.reduce((total, lesson) => {
            return total + lesson.price;
        }, 0);
    }
    //最贵课程
    static MaxPrice(data) {
        return data.sort((a, b) => b.price - a.price)[0];
    }
}
let lessons = Lesson.createLesson(data);
console.log(lessons);
console.log('课程总花费', Lesson.totalPrice(lessons));
console.log('最贵课程花费', Lesson.MaxPrice(lessons).price);
```

![image-20210429165911021](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210429165911021.png)

## *访问器知识

```js
class User {
    constructor(name) {
        this._name = name;
    }
    // 访问器 对传递的name参数监听 设置/获取
    set name(name) {
        if (name.length < 3) {
            this._name = name + '名字长度<3';
        }
    }
    get name() {
        return this._name;
    }
}
let lisi = new User('李四');
lisi.name = '王五'; //设置经过访问器
console.log(lisi.name); //获取经过访问器
//结果打印： 王五名字长度<3
```

## 命名规则及其保护

- 保护1:设置私有属性  访问器设置属性 不暴露私有属性
  - 缺点：人为操控 依旧可用对私有属性直接设置 `lisi._url=xxx`

```js
class User {
    _url = 'https://www.xxu.com'; //'_'表示私有属性
    constructor(name) {
        this._name = name;
    }
    set url(url) {
        try {
            //对url进行简单验证
            if (!/^https?:\/\//.test(url)) {
                throw new Error('地址格式错误');
            }
            this._url = url;
        } catch (e) {
            console.log('%c' + e.message, 'color:red');
        }
    }
    get url() {
        return this._url + '/' + this._name;
    }
}
let lisi = new User('李四');
lisi.url = 'http'; //设置和获取时不会暴露私有属性
console.log(lisi.url);
```

- 保护2:  设置symbol()属性 只能通过访问器设置
- 保护3：设置weakmap属性
- 保护4：设置为私有属性private
  - 给需要保护的属性 前添加"#" 如 #_url 外部不可直接访问
  - 私有函数 = 私有属性 需要将函数定义为属性 如 #show = ()=>{} 

# 类的继承

```js
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Admin extends User {
    constructor(...args) {
        super(...args);
    }
}
let lisi = new Admin('李四', 18);
console.log(lisi);
```

引用关键字"super"

![image-20210805084755481](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210805084755481.png)

