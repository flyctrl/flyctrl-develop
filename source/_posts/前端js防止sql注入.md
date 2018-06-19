---
title: 前端js防止SQL注入
tags:
  - JS代码防止SQL注入
id: 2308
categories:
  - JS/Jq
date: 2016-04-12 20:10:01
---

## **SQL注入攻击的总体思路：**
&emsp;&emsp;发现SQL注入位置；判断服务器类型和后台数据库类型；确定可执行情况
对于有些攻击者而言，一般会采取sql注入法。下面我也谈一下自己关于sql注入法的感悟。

## **注入法：**
&emsp;&emsp;从理论上说，认证网页中会有型如：
`select * from admin where username='XXX' and password='YYY'` 的语句，若在正式运行此句之前，如果没有进行必要的字符过滤，则很容易实施SQL注入。
如在用户名文本框内输入：abc’ or 1=1-- 在密码框内输入：123 则SQL语句变成：
`select * from admin where username='abc’ or 1=1 and password='123’` 不管用户输入任何用户名与密码，此语句永远都能正确执行，用户轻易骗过系统，获取合法身份。

## **猜解法：**
&emsp;&emsp;基本思路是：猜解所有数据库名称，猜出库中的每张表名，分析可能是存放用户名与密码的表名，猜出表中的每个字段名，猜出表中的每条记录内容。
还有一种方式可以获得你的数据库名和每张表的名。
就是通过在形如：http://www. .cn/news?id=10'的方式来通过报错获得你的数据库名和表名！

## **前端js防止注入解决办法**

### **1.URL地址防注入：**
```javascript
//过滤URL非法SQL字符
var sUrl=location.search.toLowerCase();
var sQuery=sUrl.substring(sUrl.indexOf("=")+1);
re=/select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/i;
if(re.test(sQuery))
{
    alert("请勿输入非法字符");
    location.href=sUrl.replace(sQuery,"");
}
```
### **2.输入文本框防注入：**
```javascript
//防止SQL注入
function AntiSqlValid(oField )
{
    re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
    if ( re.test(oField.value) )
    {
    //alert("请您不要在参数中输入特殊字符和SQL关键字！"); //注意中文乱码
    oField.value = ";
    oField.className="errInfo";
    oField.focus();
    return false;
}
```
### **在需要防注入的输入文本框添加如下方法**
```javascript
txtName.Attributes.Add("onblur","AntiSqlValid(this)");//防止Sql脚本注入
```