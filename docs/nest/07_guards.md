# 守卫

守卫的作用是拦截请求，不合法的不允许进入路由  
常见的比如角色权限校验  
在 Express 中通常用中间件处理，基本都是全局拦截，很少考虑进入的目标路由，直接传递 `next()` 而不了解 next 的执行内容

守卫可以通过 `ExecutionContext` 实例知道目标路由将执行的逻辑

守卫是用@Injectable()装饰器注释的类。  
应该实现 `CanActivate` 接口，具体代码在 `canActivate` 方法实现，返回一个布尔值，true 就表示有权限，false 抛出异常 403 错误

```ts
/* auth.guard.ts */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return validateRequest(request)
  }
}
```

- 控制器内使用 `UseGuards`

```ts
@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {}
```

- 全局 `useGlobalGuards`，应用于所有控制器和路由处理器

```ts
const app = await NestFactory.create(AppModule)
app.useGlobalGuards(new RolesGuard())
```

- 依赖注入
  守卫没有依赖注入，需要在模块上引入

```ts
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ApplicationModule {}
```

## 设置元数据

对于一个控制器，不同的角色可能有不同的权限  
通过 `SetMetadata`，只有符合自定义的内容才能访问

```ts
@Post()
@SetMetadata('roles', ['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

```ts
/* roles.guard.ts */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return matchRoles(roles, user.roles) // 权限逻辑
  }
}
```
