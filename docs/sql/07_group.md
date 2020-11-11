# 分组

测试数据  
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 1 | 1 | 1 | 1 |
| 2 | 2 | 3 | 4 |
| 3 | 2 | 3 | 4 |
| 4 | 2 | 4 | 3 |

## group by

比如以 username 为分组，展示每组的 id 之和
`select sum(id) as sum_id, username from weibo_db.users group by username;`
结果  
| sum_id | username |
| ------ | -------- |
| 1 | 1 |
| 9 | 2 |

## 过滤 having

having 和 [where](./05_search.md) 用法一致，只不过 where 筛选的是行，而 having 是组  
where 在分组前过滤，having 在分组后过滤  
如果没有 group by，单独使用两者效果其实是一样的
