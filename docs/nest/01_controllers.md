# controllers

controller 负责处理客户端接口的请求和返回  
一般来说一个控制器负责一块业务，会对应多个路由（比如增删改查）  
理想情况下，控制器只管声明装饰器和返回响应数据，作为一个桥梁  
不需要定义任何诸如从客户端获取数据、验证用户输入或直接往控制台中写日志等工作。而要把这些任务委托给各种服务

```ts
/* 常见 demo */
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common'
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto'

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat'
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`
  }
}
```

## 设置路由

比如设置一个 `/users` 路由
`@Controller('users')`  
路由也支持正则

## 字段序列化

如果用内置的 HTTP 请求方法，返回的如果是 Javascript 对象，会自动进行序列化成 JSON  
如果是基本类型（number、string）等，则不会序列化

## 获取请求头

利用 `@Req` 装饰器获取 Request Header，获取的对象默认是 Express 的请求对象  
有关请求头的所有属性，参考 [express 文档](https://expressjs.com/en/api.html#req) 即可

```js
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from "express";  // express 的请求头类型

@Controller("users")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Req 装饰器
  getHello(@Req() req: Request): string {
    console.log(req.method);
    return this.appService.getHello();
  }
}
```

同样用 `@Res` 可以获取 express 的响应，`@Next()` 获取 `next()` 方法  
nest 另外提供了一些装饰器快速获取 req 的字段

- @Session: req.session
- @Param(key?: string): req.params / req.params[key]
- @Body(key?: string): req.body / req.body[key]
- @Query(key?: string): req.query / req.query[key]

```ts
// http://localhost:3000/users?id=6
getHello(@Query("id") params): string {
  console.log(params); // 6
  return this.appService.getHello();
}
```

- @Headers(name?: string): req.headers / req.headers[name]
  注意和 `@Header` 区分
- @Ip(): req.ip
- @HostParam(): req.hosts

## 状态码

默认的请求返回状态码都是 200  
可以用 `@HttpCode(状态码)` 来自定义

```ts
import { Controller, Req, Post, HttpCode } from '@nestjs/common'
import { AppService } from './app.service'

// 用 post 请求 `http://localhost:3000/users`
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(204)
  login(): string {
    return 'hello world'
  }
}
```

## 自定义响应

`@Header`
比如 `@Header('Cache-Control', 'none')`

## 重定向

@Redirect，状态码默认 302

```ts
@Get()
@Redirect("https://www.baidu.com", 301)
```

也可以用 express 的 res.redirect 实现

## 动态路由

比如访问 `users/1`

```ts
@Get(":id")
getHello(@Param("id") id): string {
  console.log(id);
  return this.appService.getHello();
}
```

## 子域名分发

```ts
@Controller({
  host: "http://localhost:3000"
})
```
