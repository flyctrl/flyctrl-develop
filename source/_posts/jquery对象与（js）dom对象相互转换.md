---
title: jQuery对象与（js）dom对象相互转换
tags:
  - jq转dom对象
  - jq转js
  - js转jq
id: 1066
categories:
  - JS/Jq
date: 2015-07-31 16:14:35
---

核心提示：jquery选择器得到的jquery对象和标准的

javascript中的document.getElementById()取得的dom对象是两种不同的对象类型，一般情况下，如S(’#id’)得到的是jquery对象，它不能使用js中的dom方法。所以，如果jquery对象要使用标准的dom方法，就需要进行对象转换。</span>

刚开始学习jQuery，可能一时会分不清楚哪些是jQuery对象，哪些是DOM对象。至于DOM对象不多解释，我们接触的太多了，下面重点介绍一下jQuery，以及两者相互间的转换。

什么是jQuery对象？

---就是通过jQuery包装DOM对象后产生的对象。jQuery对象是jQuery独有的，其可以使用jQuery里的方法。

比如：$("#test").html() 意思是指：获取ID为test的元素内的html代码。其中html()是jQuery里的方法

这段代码等同于用DOM实现代码：
```javascript
document.getElementById("id").innerHTML;
```
虽然jQuery对象是包装DOM对象后产生的，但是jQuery无法使用DOM对象的任何方法，同理DOM对象也不能使用jQuery里的方法. 乱使用会报错。比如：$("#test").innerHTML、document.getElementById("id").html()之类的写法都是错误的。

还有一个要注意的是：用#id作为选择符取得的是jQuery对象与document.getElementById("id")得到的DOM对象，这两者并不等价。请参看如下说的两者间的转换。

既然jQuery有区别但也有联系，那么jQuery对象与DOM对象也可以相互转换。在再两者转换前首先我们给一个约定：如果一个获取的是 jQuery对象，那么我们在变量前面加上$，如：var $variab = jQuery对象；如果获取的是DOM对象，则与习惯普通一样：var variab = DOM对象；这么约定只是便于讲解与区别，实际使用中并不规定。

# jQuery对象转成DOM对象：

两种转换方式将一个jQuery对象转换成DOM对象：[index]和.get(index);

## (1)jQuery对象是一个数据对象，可以通过[index]的方法，来得到相应的DOM对象。

比如：
```javascript
var $v =$("#v") ; //jQuery对象
var v=$v[0]; //DOM对象
alert(v.checked) //检测这个checkbox是否被选中
```

## (2)jQuery本身提供，通过.get(index)方法，得到相应的DOM对象

比如：
```javascript
var $v=$("#v"); //jQuery对象
var v=$v.get(0); //DOM对象
alert(v.checked) //检测这个checkbox是否被选中
```

# DOM对象转成jQuery对象:

对于已经是一个DOM对象，只需要用$()把DOM对象包装起来，就可以获得一个jQuery对象了。$(DOM对象)

比如：
```javascript
var v=document.getElementById("v"); //DOM对象
var $v=$(v); //jQuery对象
```
转换后，就可以任意使用jQuery的方法了。

通过以上方法，可以任意的相互转换jQuery对象和DOM对象。需要再强调注意的是：DOM对象才能使用DOM中的方法，jQuery对象是不可以用DOM中的方法。