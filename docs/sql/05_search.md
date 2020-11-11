# where 过滤

要保证 order by 在 where 之后  
返回特定值，`where 列名 = 值`。  
`select * from weibo_db.users where nickname = "4";`  
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 2 | 2 | 3 | 4 |
| 3 | 2 | 3 | 4 |

## 等于操作符

- 常规的和 JAvaScript 差不多，`=`, `!=`, `>`, `<`,`>=`, `<=`
- 两者之间，between A and B，包含 A 和 B。  
  `select * from weibo_db.users where nickname between 1 and 3;`

| id  | username | password | nickname |
| --- | -------- | -------- | -------- |
| 1   | 1        | 1        | 1        |
| 4   | 2        | 4        | 3        |

- 空值 is null。`select * from weibo_db.users where nickname is null;`

## 组合语句

- and，同时满足。`select * from weibo_db.users where nickname < 4 and password = 4 and id = 4;`
- or，满足其中一个
  `select * from weibo_db.users where nickname < 4 or password = 4 or id = 4;`

| id  | username | password | nickname |
| --- | -------- | -------- | -------- |
| 1   | 1        | 1        | 1        |
| 4   | 2        | 4        | 3        |

or 和 and 连用。select \* from weibo_db.users where nickname < 4 or password = 4 and id = 1;`  
顺序和 JavaScript 一样 and 优先级更高  
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 1 | 1 | 1 | 1 |
| 4 | 2 | 4 | 3 |

- 同样用括号可以改变优先级

## 范围语句

- in：等价于 `or`， `select * from weibo_db.users where nickname in (1,3);`
  等价于 `select * from weibo_db.users where nickname = 1 or nickname = 3; `

| id  | username | password | nickname |
| --- | -------- | -------- | -------- |
| 1   | 1        | 1        | 1        |
| 4   | 2        | 4        | 3        |

- not：类似不等于，`select * from weibo_db.users where not nickname in (1,3);`

## 通配符

wildcard：和 `like` 操作符一起使用，一般用来模糊查询**字符串**  
类似正则  
比如有这么一张表 `select * from weibo_db.article`  
| article | id | author |
| ------- | --- | ------ |
| hello | 1 | jack |
| world | 2 | john |
| color | 3 | mary |
| colour | 4 | tom |

- %: 任意次数，等价于 JavaScript 正则表达式的 `*`。`select * from weibo_db.article where author like "j%";`

| article | id  | author |
| ------- | --- | ------ |
| hello   | 1   | jack   |
| world   | 2   | john   |

- 下划线 `_`：只匹配一个字符，并且要大于 0 次。上面的语句等价于
  `select * from weibo_db.article where author like "j___";`

- 集合 `[]`，`[ja]%`。MySQL 不支持，略过
