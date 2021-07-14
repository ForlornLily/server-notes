# 处理表单

表单常见编码（请求头中的 `content-type`）：

- 通过 `action` 属性提交：`application/x-www-form-urlencoded`
- 文件传输：`multipart/form-data`
- ajax：`application/json`

## 处理 post 请求

一般使用中间件 `body-parser`

```js
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
```

通过 req.body 获取参数
