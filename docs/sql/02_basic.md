# 基本语法

Structured Query Language：结构化查询语言  
大部分数据库管理软件（DBMS：database management system），比如 MySQL 的语法是可以共用的，只不过 MySQL 做了额外的拓展  
标准的 SQL 由 ANSI 标准委员会管理，从而称为 ANSISQL，所有 DBMS 都是支持该标准的  
类似 ECMAScript 与浏览器的关系

## 关键词

任何语言都会有自己的保留字，同样 SQL 作为一种语言也不例外，这些保留字不能当做表名、主键或者其他用途

## 语句

- SQL 语句以 `;` 结尾，可以省略
- 不区分大小写
- 空格会被忽略

```sql
SELECT *
FROM weibo_db.users;

SELECT * FROM weibo_db.users; -- 等价于
```

## 注释

单行用 `--` 开头  
多行和 JavaScript 一样，是 `/* */`
