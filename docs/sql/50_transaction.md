# 事务处理

简单来说就是一批操作，要么都执行成功，要么都不执行。

关于事务的操作有

- 回退（rollback）：撤销指定的 SQL 语句  
  主要针对 insert/update/delete，select 没有回退的必要，也不能回退 create/drop
- 提交（commit）：将未存储的 SQL 语句写入数据库表
- 保留点（savepoint）：可以回退的存档点

## rollback

```sql
use weibo_db;

begin;
delete from users where id = 2;
delete from users where id = 3;
rollback;
/* id 为 2、3 的记录都不会被删除，回滚了 */
select * from users;
```

## commit

MySQL 默认会 commit 所有语句

## savepoint

可以有多个

```sql
use weibo_db;

begin;
delete from users where id = 4;
savepoint delete_action;

delete from users where id = 5;

rollback to delete_action;
/* 删除 id = 4 被回退了，id = 5 被删除 */
select * from users;
```
