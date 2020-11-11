# 排序

order by 列名  
`select * from weibo_db.users;`  
结果  
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 1 | 1 | 1 | 1 |
| 2 | 2 | 3 | 4 |
| 3 | 2 | 3 | 4 |
| 4 | 2 | 4 | 3 |

`select * from weibo_db.users order by nickname;`  
结果  
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 1 | 1 | 1 | 1 |
| 4 | 2 | 4 | 3 |
| 2 | 2 | 3 | 4 |
| 3 | 2 | 3 | 4 |

## 多列排序

`order by 列 1 , 列 2`；先按列 1 排序，列 1 相同再按列 2 排

## 按列索引排序

用索引代替列名，从 1 开始。比如上面的 nickname 是第 4 列  
`select * from weibo_db.users order by 4;`

## 指定顺序

默认是顺序，如果要降序，可以加 `desc`
`select * from weibo_db.users order by nickname desc, id desc;`  
结果  
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 3 | 2 | 3 | 4 |
| 2 | 2 | 3 | 4 |
| 4 | 2 | 4 | 3 |
| 1 | 1 | 1 | 1 |
