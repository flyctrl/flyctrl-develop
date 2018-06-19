---
title: javascript实现保留两位小数一位自动补零代码
tags:
  - js保留2位小数
  - js保留两位小数自动补0
  - js强制保留2位小数
id: 1953
categories:
  - JS/Jq
date: 2015-12-18 09:41:07
---

**javascript实现保留两位小数一位自动补零代码实例:**
本章节介绍一下如何实现对数字保留两位小数效果，如果数字的原本小数位数不到两位，那么缺少的就自动补零，这个也是为了统一的效果，先看代码实例:
```javascript
function returnFloat(value){
  var value=Math.round(parseFloat(value)*100)/100;
  var xsd=value.toString().split(".");
  if(xsd.length==1){
    value=value.toString()+".00";
    return value;
  }
  if(xsd.length>1){
    if(xsd[1].length<2){
      value=value.toString()+"0";
    }
    return value;
  }
}
var num=3.1;
console.log(returnFloat(num));
```
&nbsp;
上面的代码实现了我们的要求，下面介绍一下它的实现过程。

**一.代码注释:**

1.function returnFloat(value){}，参数是要被转换的数字。
&nbsp;

2.var value=Math.round(parseFloat(value)*100)/100，这个应该是函数的核心之处,parseFloat(value)将参数转换为浮点数，因为参数有可能是字符串，乘以100是因为要保留两位小数，先将小数点向右移动两个位数，然后再利用Math.round()方法实行四舍五入计算，最后除以100，这样就实现了保留保留两位小数，并且还具有四舍五入效果，但是这个并不完美，如果参数数字本身的小数位数大于等于2是可以的，如3.1415，但是如3或者3.0这样的还是没有完美的实现，继续看下面。
&nbsp;

3.var xsd=value.toString().split(".")，使用点"."value分隔成一个数组。
&nbsp;

4.if(xsd.length==1){value=value.toString()+".00";return value;}，如果数组的长度是1，也就是说不存在小数，那么就会为这个数字添加两个0，例如3会被转换成3.00。
&nbsp;

5.
```javascript
if(xsd.length>1){
    if(xsd[1].length<2){
        value=value.toString()+"0";
        
    }
    return value;

} 
```
if(xsd.length>1)用来判断数字的长度是否大于1，也就是数字是否具有小数，如有小数，但是小数的位数小于2，也就是类似3.1这样的，就会在后面加一个0，也就是会转换为3.10。
&nbsp;

&nbsp;