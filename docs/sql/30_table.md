# 表操作

## 创建表

```sql
/*创建表名是 `fans`；三列 id, username, password；其中 id 是主键并自增，其余都不为空 */
create table `weibo_db`.`fans` (
  `id` int unsigned not null auto_increment,
  `username` varchar(45) not null,
  `password` varchar(45) not null,
  primary key (`id`)
);
```

每列还可以设置默认值（`default 值`），允许为空（`null`），类型（比如日期）

## 更新表

alter

```sql
/* 添加列 */
alter table `weibo_db`.`fans` add nickname varchar(45);

/* 删除列 */
alter table `weibo_db`.`fans` drop nickname;
```

## 删除表

drop  
`drop table fans;`

## 约束

更新表都用 `add constraint`

- 主键 primary key
- 外键 references：表示该列表中的某列，是另一个表的主键

```sql
/* 把文章的用户 id 作为外键，括号是必须的 */
alter table article
add constraint
foreign key (user_id) references users (id);
```

- 值限制：比如为整数的列必须大于 0。`add constraint check (user_id > 0)`

## 数据类型

- 字符串
- 数字
- 日期
- 二进制
