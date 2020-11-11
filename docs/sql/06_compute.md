# 计算

存储在数据库和实际前端要拿的值可能不一样，比如日期  
日期可以前端处理，也可以后端处理后返回

## 拼接

MySQL 使用 `concat` 函数  
`select concat(author, "-", article) from weibo_db.article;`  
| id | concat(author, "-", article) |
| --- | ---------------------------- |
| 1 | jack-hello |
| 2 | john-world |
| 3 | mary-color |
| 4 | tom-colour |

- trim: 相当于 JavaScript 里面的 `trim()`，去掉前后空格。`trim(article)`
- 别名，将上面的拼接字段设置一个名称。也可以给表名取别名  
  `select id, concat(author, "-", trim(article)) as detail from weibo_db.article;`
  列名 `concat(author, "-", article)` 变成了 `detail`

## 算术运算

支持列与列之间的加减乘除  
`select 列 1 * 列 2 as 别名 from table`;

## 函数

大部分函数在不同的软件实现不一样，以下只粗略介绍 MySQL 相关

### 处理字符串

- 如上面的去除前后空格 `trim()`
- 转大写 `upper`。`select id, upper(article) as article from weibo_db.article;`
- 转小写 `lower`
- 字符串长度 `length`。`select length(article) from weibo_db.article; `

### 算术

如绝对值 abs，三角函数 cos/sin/tan

### 日期格式化

### 统计

- avg: 某列的平均值，可以和 distinct 一起使用，avg(distinct 列名)
- count: 行数
- max/min: 最大/小值，可以和 distinct 一起使用，但是没有必要
- sum: 和
  查询结果只有一行  
  `select id, sum(id) as sum from weibo_db.article;`

| id  | sum |
| --- | --- |
| 1   | 10  |

`select id, min(id) as min_id, avg(id) as avg from weibo_db.article;`  
| id | min_id | avg |
| --- | ------ | ------ |
| 1 | 1 | 2.5000 |
