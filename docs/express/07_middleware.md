# 中间件

一个函数  
理解为流，中间件可以在流中插入，插入后，位于中间件的下游都会生效

`app.METHOD`（比如 `app.get`, `app.post`）也是中间件，需要一个路径做为第一个参数，如果想要匹配所有路由，传入 `/*`，或者省略该参数

`app.use(express.static(__dirname + '/public'))` 实际上就是省略了路径  
中间件接收一个回调函数：  
函数 ≤ 三个参数：`request`、`response`、`next`  
当接收四个参数时，成为错误处理中间件，**第一个**参数变成了 `error`  
如果没有调用 `next`，水流中止，不会执行下游方法。  
通常 `next` 和 `res.render` 等返回客户端的方法不会同时执行

- `next` 未执行，如果没有调 `res.render`，即服务端没有返回，请求就会一直挂起
- 如果执行了 `next` 又调了 `res.render`，下游的 `res.render` 不会生效。因为此时服务端返回了，请求已经结束

```js
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
```

## 自定义中间件

后面 [视图](./30_views) 的 `weather.js` 就是一个例子

```js
/** weather.js */
const weatherMiddleware = async (req, res, next) => {
  res.locals.components = res.locals.components || {}
  res.locals.components.weatherContext = await getWeatherData()
  next()
}

module.exports = weatherMiddleware
```

```js
app.use(weatherMiddleware)
```
