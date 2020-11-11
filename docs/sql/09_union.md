# 组合查询

把多个 select 用 `union` 关键词组合  
让多个 select 语句返回一个结果  
users 如下
| id | username | password | nickname |
| --- | -------- | -------- | -------- |
| 1 | 1 | 1 | jack |
| 2 | 2 | 3 | john |
| 3 | 2 | 3 | 4 |
| 4 | 2 | 4 | 3 |
| 5 | 2 | 4 | hi |
article 如下  
| article | id | author |
| ------- | --- | ------ |
| hello | 1 | jack |
| world | 2 | john |
| color | 3 | mary |
| colour | 9 | tom |
`select author, article from article union select nickname, username from users;`
| author | article |
| ------ | ------- |
| jack | hello |
| john | world |
| mary | color |
| tom | colour |
| jack | 1 |
| john | 2 |
| 4 | 2 |
| 3 | 2 |
| hi | 5 |

- 多个查询都要用 union 关键词链接，而不是逗号
- union 会自动去重，不想去重用 union all
- 排序的 order by 只能位于最后一条 select 语句，即只会存在一个排序
