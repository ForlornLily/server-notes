# 拦截器

灵感来自 AOP（Aspect-oriented programming：面向切面编程）  
常见的比如接口报错时前端进行消息提示，这是一个全局的拦截器  
作用

- 函数执行前后绑定额外逻辑
- 对函数的返回值进行转换
- 函数抛出的异常进行转换
- 拓展基本的 tool 函数
- 对于特殊情况可以对函数进行重写

```ts
/* logging.interceptor.ts */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')

    const now = Date.now()
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))
  }
}
```

在控制器内使用 `UseInterceptors`

```ts
/* cats.controller.ts */
@UseInterceptors(LoggingInterceptor)
export class CatsController {}
```

依赖注入中使用

```ts
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
```
