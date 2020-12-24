# 异常处理

一般用默认内置的即可  
如果需要自定义，可以抛出 `HttpException` 类

```ts
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

可以自定义一个类继承

```ts
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN)
  }
}
```

```ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException('Forbidden');
}
```
