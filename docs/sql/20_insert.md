# 插入

insert

- 插入完整行
- 插入行的一部分
- 插入查询结果

## 完整行

`insert into users values("a", "b", "c", 10);`  
更准确的做法是 key 和 value 一一对应，这样位置也可以调换  
`insert into users(id,nickname,username,password) values(13,"nick","user","pass");`

## 一部分

实际上就是完整行内省略可以为空值的部分。插入的仍然是一行数据，而不是更新

## 插入查询结果

可以插入多行

```sql
use weibo_db;
insert into users(id,nickname,username)
select id, author, article from article where id = 9;
```

## 复制表

`create table users_copy as select * from users;`
