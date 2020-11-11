# 游标

select 的时候可能需要知道查询结果的前后数据  
游标用于存储查询结果，方便浏览存储内容  
游标同样只能查询，不会有更新操作  
**MySQL 游标只能用于存储过程和函数**

- declare 游标名 cursor for 查询语句：声明
- open：使用游标
- close：关闭
- fetch：访问游标

```sql
use weibo_db;

/*
  delimiter 表示";"，后面跟一个变量，用变量代替 ";"
  表示语句结束。但是一个语句块内又会包括多个语句，每个语句需要 `;` 结束
  类似 JavaScript 双引号内又要使用双引号，此时嵌套的改用单引号
*/
delimiter $$
/* 创建存储过程，因为MySQL游标只能用于存储过程和函数 */
create procedure proces_orders()
begin

/* 声明游标 */
declare my_cursor cursor for
select * from orders where id like "colo%r";
/* 打开游标 */
open my_cursor;
/* 关闭游标 */
close my_cursor;
end $$
```

## 存储过程

存储过程的作用是保存一条或多条 SQL 语句，方便以后反复使用  
创建：  
create procedure 过程名(入参 1, 入参 2)  
其中入参可以省略
执行：  
excute 过程名(入参 1, 入参 2)

## fetch

先声明一些变量，用于存储 fetch 的内容  
`declare target_id int;`  
`fetch my_cursor into target_id;`
