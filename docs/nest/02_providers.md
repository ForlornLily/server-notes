# providers

控制器是服务的消费者，把服务注入到控制器内，让控制器得以访问  
服务就是提供者。  
几乎所有的内容都可以看做是服务，通过构造函数注入依赖关系  
在 `Nest` 中，要把一个类定义为服务，就要用 `@Injectable` 装饰器来提供元数据，以便让 `Nest` 可以把它作为依赖注入到控制器中  
可以认为 @Injectable 是一个标记  
另外还要用 `@Injectable` 表明一个控制器或其它类（比如另一个服务、模块等）拥有一个依赖。 依赖并不一定是服务，也可能是函数或值等等。

## 依赖注入

DI（Dependency injection），参考

- [Angular](https://angular.cn/guide/dependency-injection-pattern)
- [前端中的 IoC 理念](https://zhuanlan.zhihu.com/p/53832991)
- [从前端角度彻底搞懂 DIP、IoC、DI、JS](https://zhuanlan.zhihu.com/p/61018434)  
  让类从外部源中获得它的依赖，而不必亲自创建它们  
  依赖注入是一种控制反转（IoC，inversion of control）的技术  
  一个没有依赖注入的 Car 类

```ts
export class Car {
  public engine: Engine
  public tires: Tires
  public description = 'No DI'

  constructor() {
    this.engine = new Engine()
    this.tires = new Tires()
  }

  // Method using the engine and tires
  drive() {
    return (
      `${this.description} car with ` +
      `${this.engine.cylinders} cylinders and ${this.tires.make} tires.`
    )
  }
}
```

一个解耦的 Car 类

```ts
public description = 'DI';

constructor(public engine: Engine, public tires: Tires) { }
```

```ts
let car = new Car(new Engine(), new Tires())
```

区别在于，解耦的 Car 类只使用（或者说"消费"）依赖的项，不关心它们内部是怎么实现的  
这样当依赖的 Engine 或 Tires 的 API 改变时，也不影响 Car 的定义，只需要修改调用 Car 的方法即可  
但是这样留下一个问题，生成一个 car 实例，必须得引入所有的依赖  
依赖注入的目的，就是需要的时候直接拿 car 实例，不关心内部实现

## nest 中的依赖注入

1. `@Injectable` 让 CatsService 类成为一个 provider，可以被 Nest 的 Ioc 容器管理

```ts
/* cats.service.ts */
import { Injectable } from '@nestjs/common'
import { Cat } from './interfaces/cat.interface'

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = []

  findAll(): Cat[] {
    return this.cats
  }
}
```

2. 把 provider 注入到控制器类中  
   CatsController 在构造器内声明它依赖 CatsService

```ts
/* cats.controller.ts */
import { Controller, Get } from '@nestjs/common'
import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'

@Controller('cats')
export class CatsController {
  // 利用构造器声明 CatsController 依赖 CatsService
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
  }
}
```

3. 注册 provider 到 IoC 容器内。  
   当 IoC 容器被实例化的时候，会去处理依赖关系

```ts
/* app.module.ts */
import { Module } from '@nestjs/common'
import { CatsController } from './cats/cats.controller'
import { CatsService } from './cats/cats.service'

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

上述的 providers 属于简写，等价于

```ts
providers: [
  {
    provide: CatsService, // 注册名，可以是字符串或者 Symbol
    useClass: CatsService, // 注册的服务
  },
]
```

## 自定义

- 使用 value
  一般会用来做单测  
  下面的 module 访问 `http://localhost:3000/users` 时，调用了 `this.appService.sayHi();`  
  返回的内容是 `customObject` 的 `sayHi` 方法

```ts
/* app.modules */
const customObject = {
  sayHi(): string {
    return "111";
  }
};
@Module({
  controllers: [AppController],
  providers: [
    { provide: AppService, useValue: customObject }
  ],
})
```

```ts
/* app.controller */
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.sayHi()
  }
}
```

```ts
/* app.service */
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  sayHi(): string {
    return 'Hello World!'
  }
}
```

- 使用 factory

```ts
const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
  },
};

@Module({
  providers: [configFactory],
})
```

- 使用类（class）
