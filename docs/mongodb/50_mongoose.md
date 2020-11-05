# mongoose

参考

- [学习 Mongodb 之 mongoose](https://juejin.im/entry/5927a3c0a22b9d005725c2a7)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/mongoose)
- [官方文档](https://mongoosejs.com/docs/index.html)

```bash
npm i mongoose
```

```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 类型定义
const newSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
})
// 编译成模型
const User = mongoose.model('later', newSchema)
const user = new User({
  title: 'hello',
  body: 'world',
})
user.save((err, res) => {
  console.log(res)
})
User.find((err, res) => {
  console.log(res)
})
//不写{ useNewUrlParser: true } 的话会报警告
mongoose.connect('mongodb://Forlorn:123@localhost/later', {
  useNewUrlParser: true,
})
```

mongodb 内

![](../images/bc02f08ad096cee3d6736a40257b3e57.png)

## Schema

Schema 的类型定义可以是普通的 key-value 形式，也可以让 value 是个对象

```js
const schema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed, // Mixed 表示可以不同类型混用
  _someId: Schema.Types.ObjectId, // ObjectId 表示数据库内模型的实例，是个对象，用于多个 Schema 进行关联
  array: [], // 数组
  ofString: [String], // 其他类型也可使用数组
  nested: { stuff: { type: String, lowercase: true, trim: true } },
})
```

value 是对象时，可以设置一些默认值，自定义校验，是否必填，枚举值等  
[validation](https://mongoosejs.com/docs/validation.html)

## virtual

指不会存到数据库的内容，可以用 getter 和 setter 方便存取值  
比如表单要输入姓和名，存数据库是两个字段，回显的时候拼接人物名称肯定是全名

```js
const personSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
})

// compile our model
const Person = mongoose.model('Person', personSchema)

// create a document
const axl = new Person({
  name: { first: 'Axl', last: 'Rose' },
})
```

想要用的时候可以自己拼接 `console.log(axl.name.first + ' ' + axl.name.last); `  
也可以用 virtual 自定义

```js
personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last
})
console.log(axl.fullName) // Axl Rose
```

## 方法

分为实例方法和静态方法

- 实例方法属于自定义函数，方便 model 使用 Schema 的方法
- 静态方法用于拓展 mongoose 自带的内容，不可以用箭头函数。因为自带内容可以链式调用 ，需要用到 `this`

```js
/* 实例 */
const animalSchema = new Schema({ name: String, type: String })

// 添加到 `methods` 属性中
animalSchema.methods.findSimilarTypes = function (cb) {
  return mongoose.model('Animal').find({ type: this.type }, cb)
}

const Animal = mongoose.model('Animal', animalSchema)
const dog = new Animal({ type: 'dog' })

dog.findSimilarTypes((err, dogs) => {
  console.log(dogs) // woof
})
```

```js
/* 静态 */
// 第一种：添加到 `statics` 属性中
animalSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, 'i') })
}
// 第二种：`animalSchema.static()`.
animalSchema.static('findByBreed', function (breed) {
  return this.find({ breed })
})

const Animal = mongoose.model('Animal', animalSchema)
let animals = await Animal.findByName('fido')
animals = animals.concat(await Animal.findByBreed('Poodle'))
```

## CRUD
