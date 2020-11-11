# 视图

视图是一张虚拟表，主要作用是展示，聚合一部分的数据。  
视图应该只能查询

```sql
use weibo_db;

create view author as
select username, article from users, article
where users.id = article.id;

select * from author;
```

其余用法和 select 查表是一样的，比如计算字段等等
