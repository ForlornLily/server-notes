# Cookie 和 Session

## Cookie

一般用 `cookie-parser` 进行序列化处理

```js
const cookieParser = require('cookie-parser')
app.use(cookieParser())
```

可以在返回中设置

```js
res.cookie('key', 'value')
```

清除

```js
res.clearCookie('key')
```

取值

```js
req.cookies['key']
```

通常为了保证 cookie 的安全性，会使用 `signed cookie`  
签名 cookie 会进行加密处理，在前端展示的时候加密后的内容  
使用 `signed` 必须在 cookieParser 内传入加密的凭证，否则报错

```js
const data = {
  cookie: 'encryption_data',
}

app.use(cookieParser(data.cookie)) // 必须要传入参数

app.get('/', (req, res) => {
  res.cookie('common', 'data')
  res.cookie('hello', 'world', { signed: true })
  console.log(req.cookies['common']) // data
  console.log(req.cookies['hello']) // undefined
  console.log(req.signedCookies['hello']) // world
})
```

请求体中通过 `req.signedCookies['key']` 访问，展示的是明文  
在页面的请求头内容是加密内容

```
Cookie: common=data; hello=s%3Aworld.aP%2FZGLapesoQEoo0zVwd3Qd9qLyZJfKiqJaz8rfnBTU
```

如果 cookie 和 signedCookies 设置了同一个 key，signedCookies 优先

### API

比如

```js
res.cookie('common', 'data', {
  httpOnly: true,
})
```

完整内容见官网[res.cookie](https://expressjs.com/zh-cn/api.html#res.cookie)

## Session

Session 是为了保证会话持久。比如从连续的请求中识别是同一个客户端  
通常的做法是使用一条包含唯一标识的 Cookie，而服务器使用这个标识来获取相应的 Session 信息。
