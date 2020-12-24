# 简介

nest 类似 Java 的 Spring Boot，是一个大而全的框架。  
官方自己会给出一些最佳实践，而不像 express/koa 那样需要用户自己自由组合  
主要用装饰器  
参考

- [nest 官方文档](https://docs.nestjs.com/)
- [让我们用 Nestjs 来重写一个 CNode](https://github.com/jiayisheji/blog/issues/18)，[项目地址](https://github.com/jiayisheji/nest-cnode)

## 安装

```bash
# 安装脚手架
npm i -g @nestjs/cli
# 新建项目
nest new project-name
```

## 请求声明周期

官网[request-lifecycle](https://docs.nestjs.com/faq/request-lifecycle)

1. 请求
2. 全局中间件(middleware)
3. 模块中间件
4. 全局守卫(guards)
5. 控制器守卫
6. 路由守卫
7. 全局拦截器(interceptors)
8. 控制器拦截器
9. 路由拦截器
10. 全局管道(pipes)
11. 控制器管道
12. 路由管道
13. Route parameter pipes
14. 控制器(controller)
15. service
16. Route interceptor (post-request)
17. Controller interceptor (post-request)
18. Global interceptor (post-request)
19. Exception filters (route, then controller, then global)
20. Server response
