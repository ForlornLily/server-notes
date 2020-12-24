# pipe

一般作用有两个

- 数据转换，把输入的数据进行处理后输出
- 校验：不合法时抛出异常等  
  pipe 应该是一个纯函数，不带任何副作用，也不会和数据库交互，也不会去调用别的服务

## 内置 pipe

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe

```ts
import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /* 访问 http://localhost:3000/users?id=a 会报错，因为不是 int 类型 */
  @Get()
  async getHello(@Query('id', ParseIntPipe) params): Promise<string> {
    return this.appService.sayHi()
  }
}
```

### 自定义异常

```ts
async getHello(@Query("id", new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR  // 设置返回 500 报错
})) params): Promise<string> {
  console.log(params);
  return this.appService.sayHi();
}
```

## 自定义 pipe

实现用 PipeTransform 类，并用 `@Injectable` 装饰器

```ts
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value
  }
}
```

两个入参

- value: 传入的值
- metadata: 一些额外参数，比如来源 `type`，是在 url 里还是 request body 内

```ts
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom'
  metatype?: Type<unknown>
  data?: string
}
```
