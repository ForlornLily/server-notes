# 静态文件

Express 依靠中间件来处理静态文件和视图  
`static` 中间件允许指定一个或多个包含静态资源的目录，里面的资源会不加任何特别处理，直接发送给客户端。  
通常文件夹名为 `public`

```js
app.use(express.static(__dirname + '/public'))
```

比如引用 `public/img/logo.png`，`static` 会识别文件类型

```handlebars
<body>
  <header>
    <img src="/img/logo.png" alt="Meadowlark Travel Logo">
  </header>
  {{{body}}}
</body>
```
