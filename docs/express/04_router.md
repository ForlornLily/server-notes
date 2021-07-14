# 路由

支持正则

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

网站路由推荐做法：

- 避免暴露技术细节，比如 `xxx.asp`
- 删除无意义的信息，比如本身就是首页根路径，用 `/` 比 `/home` 更合适
- 保持分隔词一致，一个站点内的 `-` 和 `_` 不要混用
- 尽可能全小写
