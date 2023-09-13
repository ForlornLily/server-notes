# 数据库

介绍一些关系型数据库的基本概念

可以把数据库看成多个列表的集合

## 表

类似列表
存储特定数据的结构化清单。位于同一个表内的数据是同种类型

- 表名：作为唯一标识，区分不同表
- 模式（schema）：描述表的信息，类似 TypeScript

## 列

column：类似表格的列。表里面的一个字段，每一列都有各自的数据类型

## 行

row：类似表格的行。

## 主键

primary key: 行里面的唯一标识，用于区分不同行，主要用于增删改查。  
新增的行也不能和已删除的主键重复