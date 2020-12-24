# 中间件

进入路由前的方法  
等价于 express 的中间件

```ts
/* logger.middleware */
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...')
    next()
  }
}
```

如果是比较简单的中间件，也可以用一个普通的函数，而不是类

```ts
export function logger(req, res, next) {
  console.log(`Request...`)
  next()
}
```

调用 `configure` 方法来设置

```ts
/* app.module.ts */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { CatsModule } from './cats/cats.module'

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats')
  }
}
```

## forRoutes

可以指定路径（也可以用通配符）、请求方法，限定特定的路由  
`forRoutes({ path: 'ab*cd', method: RequestMethod.GET });`

## exclude

排除特定路由

```ts
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)'
  )
  .forRoutes(CatsController)
```

## apply

如果有多个，用逗号分割

```ts
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController)
```

## 全局绑定

注册到每个路由。和 express 一样用 use

```ts
const app = await NestFactory.create(AppModule)
app.use(logger)
await app.listen(3000)
```
