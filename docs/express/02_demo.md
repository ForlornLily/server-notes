# 简单 demo

```js
const express = require('express')

const app = new express()

const port = process.env.port || 3000

app.all('*', function (req, res, next) {
  //允许跨域
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'GET')
  next()
})

// Express 默认的状态码就是 200，不需要明确指定
app.get('/', (req, res) => {
  // res.type，可以设置 Content-Type 头信息。仍旧使用 res.writeHead 也可以
  res.type('text/plain')
  res.send('hello world')
})

const path = require('path')
const mediaPath = path.join(__dirname, 'src/static/media')
const fs = require('fs')
app.get('/media', (req, res, next) => {
  fs.readdir(mediaPath, (err, data) => {
    if (err) {
      next(err)
      return
    }
    res.send(data)
  })
})
app.get('/single', (req, res, next) => {
  const name = req.query && req.query.name
  if (!name) {
    throw new Error('name is required')
    return
  }
  fs.readFile(`${mediaPath}/${name}`, (err, data) => {
    if (err) {
      next(err)
      return
    }
    res.send(data)
  })
})

// 定制404页：app.use 就是 Express 用来增加中间件的方法
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

app.listen(port, () => console.log(`app running in ${port}`))
```

## 路由及中间件顺序

在 Express 中，路由和中间件的加入顺序至关重要。  
如果把 404 处理函数放在路由之前，主页会直接走到 404

## 视图 demo

以 [handlebars](https://forlornlily.github.io/fe-notes/handlebars/) 做为视图引擎  
安装 `express-handlebars`，更多内容见 [视图](./30_views)

```js
const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = new express()

const port = process.env.port || 3000

// 配置Handlebars视图引擎
app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main',
  })
)
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  // 传递动态数据给视图
  const fortunes = [
    'Conquer your fears or they will conquer you.',
    'Rivers need springs.',
    "Do not fear what you don't know.",
  ]
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', { fortune: randomFortune })
})

// 定制404页
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// 定制500页
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(`app running in ${port}`))
```

新建 `views/layouts/main.handlebars`，因为设置了 `defaultLayout` 是 `main`，所以基本壳子都是 `main.handlebars` 的内容

```handlebars
<!-- main.handlebars 内容 -->
<!doctype html>
<html>
  <head>
    <title>Hello World</title>
  </head>
  <body>
    <!-- body 将会被替换 -->
    {{{body}}}
  </body>
</html>
```

比如访问 `/`，则会渲染 `views/home.handlebars` 的内容

```handlebars
<h1>hello world</h1>
```

`about.handlebars` 用了部分 handlebars 语法

```handlebars
<h1>About Meadowlark Travel</h1>
{{#if fortune}}
  <p>Your fortune for the day:</p>
  <blockquote>{{fortune}}</blockquote>
{{/if}}
```
