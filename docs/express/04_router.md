# 路由

`app.METHOD(PATH, HANDLER)`：默认情况下，不区分大小写，也不介意末尾有没有斜杠，在匹配路径时也不考虑查询串部分。  
比如访问 `/about`

```js
app.get('/about', (req, res) => {
  /** 设置*/
  res.type('text/plain')
  res.send('About')
})
```

/about、/About、/about/、/about?foo=bar、/about/?foo=bar 等 URL 都可以匹配。
