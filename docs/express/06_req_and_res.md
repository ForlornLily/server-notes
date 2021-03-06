# Request 和 Response

## 常用

```js
app.get('/greeting', (req, res) => {
  res.render('greeting', {
    message: 'Hello esteemed programmer!',
    style: req.query.style, // req.query 获取查询串的值
    id: req.cookies.id, //  req.cookie / req.signedCookies 获取 cookies
    username: req.session.username, // req.session 获取 Session 值
  })
})
```

- `res.render`：渲染视图，如果只是简单内容，可以用 `res.send`
- `res.status(code)`：状态码，默认 200

可以链式调用：`res.status(404).render('404')`

## Request

- req.params

- req.query

- req.body：相关内容 [form](./31_form)

- req.route

- req.cookies, req.signedCookies：相关内容 [cookie](./32_cookie)

- req.headers

- req.accepts

- req.ip

- req.path

- req.hostname

- req.xhr

- req.protocol

- req.secure

- req.url, req.originalUrl

## Response

- res.status

- res.set

- res.cookies, res.clearCookie：相关内容 [cookie](./32_cookie)

- res.redirect

- res.send

- res.json

- res.jsonp

- res.end

- res.type

- res.format

- res.attachment, res.download

- res.sendFile

- res.links

- res.locals, res.render：相关内容 [视图复用](./30_views)

res.locals: 在 `res` 中赋值，使得值在当前 response 所在的函数内可用。通常用来设置模板渲染  
对应的还有 `app.locals`，相当于在 `app` 整个实例中都可以用
