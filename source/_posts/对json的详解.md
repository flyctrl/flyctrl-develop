---
title: 对json的详解
tags:
  - json
  - json格式教程
  - json讲解
id: 1476
categories:
  - JS/Jq
date: 2015-09-02 13:17:51
---

&emsp;&emsp;很多刚入门的小伙伴对json格式甚是害怕，甚至陌生，今天这篇文章主要是针对新手来讲解一下json格式 。

## 一、JSON概念
&emsp;&emsp;JSON（JavaScript Object Natation）JS对象表示法，从属于JS（JavaScript），是一种基于文本、独立于语言的轻量级数据交换格式。它经常被拿来和XML作比较，比较方面一般有：

>可读性——不相上下，XML的标签形式规范，JSON语法简易

>可扩展性——二者的扩展性都很好，不过JSON可存储JS复合对象，XML就无缘了

>编码难度——XML更符合自然语言规范，JSON更倾向与机器语言。JSON比XML更小、更快、更易解析

## 二、JSON结构

JSON数据有两种结构:

1.Name-Value对构成的集合，类似于HashMap
```javascript
{  
    "name":"Jenna",  
    "age":"21"  
}
```
2.Value的有序列表，类似于Array
```javascript
[
{"name":"Jenna","age":"21"},
{"name":"lucy","age":"20"}
]
```
## 三、JSON的使用

&emsp;&emsp;对JSON的操作说到底就是操作一个Object对象，关于对Object的操作相信大家都不陌生，直接定义一个对象，赋值、取值、修改、删除等等一系列的基础性操作如下
```javascript
//获取一个名为dg表格，新更改的行集合
row = $("#dg").datagrid('getChanges');
if (row.length) {
    var array=new Array;
    for (var i = 0; i < row.length; i++) {
        var obj = new Object();
        obj.BidRecorderId = row[i].BidRecorderId;
        obj.CompanyName = row[i].CompanyName;
        //添加属性，还可以用下边的格式定义
        obj["Quote"] = row[i].Quote;
        obj["QuoteScore"] = row[i].QuoteScore;
        //删除Quote属性
        delete obj.Quote;
        //更新，直接赋值即可
        obj.QuoteScore = "12"
        //都添加到array数组中
        array.push(obj);
    }
}
```

## 四、JSON的序列化和反序列化

&emsp;&emsp;在实际项目中js和controller之间传递的数据类型大部分是JSON格式的，另外引用第三方控件的时候，它们的很多操作返回值类型也是JSON格式。刚开始不知道JSON是什么，更不懂什么序列化反序列化，但是在做的过程中，需要序列化和反序列化的时候就上网查一下方法，很简单就实现了这个功能。

在.net中Json解析的几种方法（一篇博客上看到的，很实用）

![image](http://www.npm8.com/wp-content/uploads/2015/09/json.png)

&nbsp;
序列化JSON
```javascript
//序列化JSON类型的数据dataJson，并复制给arrayList
arrayList: JSON.stringify(dataJson)
```
反序列化JSON
```javascript
//反序列化arrayList数据
var data = Request["arrayList"];
JavaScriptSerializer jsData = new JavaScriptSerializer();
List<TestViewModel> listTest = jsData.Deserialize<List<TestViewModel>>(data);
```
**小结：**

&emsp;&emsp;JSON的名字很高大上，没用之前以为又是什么新技术，用过之后才知道就是咱们平常接触的一些东西。所以往后还得多尝试，这样才能把知识结成网，更好的做到思想的融会贯通。