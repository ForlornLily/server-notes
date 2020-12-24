# cli 文件介绍

## main

入口文件

```ts
/* main.ts */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
```

NestFactory 类：创建一个应用实例。`create` 返回一个实例对象

## module

作为一个应用，肯定是将不同的业务拆分成各个模块

```ts
/* app.module.ts */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## controllers

controller 负责处理客户端接口的请求和返回  
一般来说一个控制器负责一块业务，会对应多个路由（比如增删改查）  
具体的业务逻辑分发到各个 model 和 view 中，对应 nest 的服务(service)

```ts
/* app.controller.ts */
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() // 调用 app.service 内的方法
  }
}
```

## providers

providers 用 `@Injectable()` 装饰器表明一个控制器或其它类（比如另一个服务、模块等）拥有一个依赖  
依赖不一定是服务，也可能是一个单纯的函数

```ts
/* app.service */
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
```

## 类型声明

用 nest 推荐用 `class` 关键词进行类型声明，而不是 `interface`

```ts
export class CreateCatDto {
  name: string
  age: number
  breed: string
}
```
