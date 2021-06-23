# 视图

## handlebars

介绍 `express-handlebars` 的模板引擎

```js
const expressHandlebars = require('express-handlebars')
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
})
app.set('view engine', 'handlebars')
```

`express-handlebars` 默认后缀名为 `handlebars`  
自定义后缀名可以设置 `extname`

```js
app.engine('.hbs', expressHandlebars({ extname: '.hbs' }))
app.set('view engine', '.hbs')
```

### 通用布局

比如某个站点的头部和底部是通用的，中间部分需要动态渲染，可以写个通用的 layout

```handlebars
<body>
  <div class="container">
    <header>
      <div class="container">
        <h1>Meadowlark Travel</h1>
        <img src="/img/logo.png" alt="Meadowlark Travel Logo">
      </div>
    </header>
    <div class="container">
      {{{body}}}
    </div>
    <footer>&copy; 2019 Meadowlark Travel</footer>
  </div>
</body>
```

handlebars 会先渲染内部内容，再渲染通用的 layout  
默认情况下在 `views` 目录下查找视图，在 `views/layouts` 下查找布局（layout）  
因为设置了 `defaultLayout: 'main'`，所以会默认拿 `views/layouts/main.handlebars` 做为通用 layout  
如果某个页面需要不同的 layout，可以设置 `layout`

```js
/** 使用 views/layouts/another_layout.handlebars 来渲染视图 */
app.get('/foo', (req, res) => res.render('foo', { layout: 'another_layout' }))
```

### 复用

1. 设置复用目录 `partialsDir: __dirname + '/views/partials/'`
2. 以中间件的形式引入，**中间件要放在路由之前，否则访问时不生效。** 在 `res.locals` 使 partials 全局可用  
   `app.use(weatherMiddleware)`  
   `res.locals.partials = 值`

为了理解上下文，对文件和变量进行了修改。实际项目一般都会统一叫 `partials`

目录组成

```
│  app.js
│
├─lib
│      weather.js
│
└─views
    │  home.handlebars
    │
    ├─layouts
    │      main.handlebars
    │
    └─partials
            weather2.handlebars
```

```js
/** app.js 部分代码 */
/** 引入中间件 */
const weatherMiddleware = require("./lib/weather")

/** 配置Handlebars视图引擎 */
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');、

/** 在访问路由之前使用中间件 */
app.use(weatherMiddleware)

app.get('/', (req, res) => res.render('home'))
```

weather.js mock 数据

```js
/** weather.js */
const getWeatherData = () =>
  Promise.resolve([
    {
      location: {
        name: 'Portland',
        coordinates: { lat: 45.5154586, lng: -122.6793461 },
      },
      forecastUrl: 'https://api.weather.gov/gridpoints/PQR/112,103/forecast',
      iconUrl: 'https://api.weather.gov/icons/land/day/tsra,40?size=medium',
      weather: 'Chance Showers And Thunderstorms',
      temp: '59 F',
    },
    {
      location: {
        name: 'Bend',
        coordinates: { lat: 44.0581728, lng: -121.3153096 },
      },
      forecastUrl: 'https://api.weather.gov/gridpoints/PDT/34,40/forecast',
      iconUrl: 'https://api.weather.gov/icons/land/day/tsra_sct,50?size=medium',
      weather: 'Scattered Showers And Thunderstorms',
      temp: '51 F',
    },
  ])

const weatherMiddleware = async (req, res, next) => {
  res.locals.components = res.locals.components || {}
  res.locals.components.weatherContext = await getWeatherData()
  next()
}

module.exports = weatherMiddleware
```

在主页中使用 `weather2.handlebars`

```handlebars
<h2>Home</h2>
{{> weather2}}
```

weather2.handlebars

```handlebars
<div class="weatherWidget">
  {{#each components.weatherContext}}
  <div class="location">
    <h1>{{location.name}}</h1>
    <a href="{{location.forecastUrl}}">
      <img src="{{iconUrl}}" alt="{{weather}}">
      {{weather}}, {{temp}}
    </a>
  </div>
  {{/each}}
</div>
```
