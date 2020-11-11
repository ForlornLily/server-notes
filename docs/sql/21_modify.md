# 修改

确保有主键

## 更新

update 表名 set 内容 目标行

```sql
update users
set password = "888", nickname = "ruby"
where id = 1;
```

## 删除

delete from 表名 目标行  
`delete from users where id = 9;`
