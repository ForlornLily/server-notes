# SELECT

检索语句，从什么地方，选择什么内容
比如某个表，`id` 是主键

- 检索全部用 `*`，`select * from weibo_db.users;`

结果  
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 1 | 1 | 1 | 1 |
| 2 | 2 | 3 | 4 |
| 3 | 2 | 3 | 4 |
| 4 | 2 | 4 | 3 |

- 检索多个列，用逗号分割，`select id, username from weibo_db.users;`

结果  
| id | username |
| --- | -------- |
| 1 | 1 |
| 2 | 2 |
| 3 | 2 |
| 4 | 2 |

## 不重复内容

distinct

- 检索指定列值不重复的内容

`select distinct username from weibo_db.users;` 结果  
| username |
| -------- |
| 1 |
| 2 |
`select distinct username, password from weibo_db.users;` 结果  
| username | password |
| -------- | -------- |
| 1 | 1 |
| 2 | 3 |
| 2 | 4 |

## 限制查询条件

limit, offset

- 从开始最多两条：`select * from weibo_db.users limit 2;`
- 指定位置返回最多两条：`select * from weibo_db.users limit 2 offset 2;`  
  offset 必须和 limit 一起使用，不包含 offset

结果  
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 3 | 2 | 3 | 4 |
| 4 | 2 | 4 | 3 |
MySQL 可以缩写为 `limit offset值, limit 数量`  
比如 `select * from weibo_db.users limit 2,1;`
结果  
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 3 | 2 | 3 | 4 |
