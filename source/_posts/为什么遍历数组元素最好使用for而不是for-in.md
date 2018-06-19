---
title: 为什么遍历数组元素最好使用for而不是for in
tags:
  - for遍历数组元素
id: 1070
categories:
  - JS/Jq
date: 2015-07-31 16:35:47
---

&emsp;&emsp;在JavaScript中，严格来说所有的数据类型鼻祖都是Object，所以我们来看看以下这个例子：
```javascript
var arr = ["a", "b", "c"];
undefined
>>> for(var i=0; i<arr.length; i++){ console.log(i); } 
0
1
2 
>>> for(var i in arr){ console.log(i); }
0
1
2
```
&emsp;&emsp;以上例子定义了一个包含3个元素的数组arr，然后分别使用for和for-in来遍历它的元素，结果都没问题。但如果我给arr添加一个原型方法，结果就不一样了。
```javascript
Array.prototype.len = function(){ return this.length; };
function()
>>> arr.len()
3
```
&emsp;&emsp;给数组原型添加了一个自定义len方法，然后再使用for和for-in来遍历它

```javascript
for(var i=0; i<arr.length; i++){ console.log(i); } 
0 
1 
2 
>>> for(var i in arr){ console.log(i); }
0
1
2
len
```
&emsp;&emsp;for循环没问题，但for-in却把我们自定义的len方法也给遍历出来了，可是arr.length还是等于3。这说明for-in会把Array当做一个Object来遍历所有成员包含Array的元素，len做为arr的成员自然也就被遍历出来。

&emsp;&emsp;然后有人就说，那我不给数组添加原型方法，那用for-in就没问题，可是你又敢保证有人不这么干吗？
```javascript
var arr = [];
undefined
>>> arr.id = Date.now()
1390099868440
```
包括String类型同样使用for-in要注意，看下面例子：
```javascript
var str = "qttc";
undefined
>>> String.prototype.lastChar = function(){ return this.charAt(this.length-1) }
function()
>>> str.lastChar()
"c"
>>> str.length
4
>>> for(var i=0; i<str.length; i++){ console.log(i); } 
0 
1 
2 
3 
>>> for(var i in str){ console.log(i); }
0
1
2
3
lastChar
```
&emsp;&emsp;这个例子很好的说明了for与for-in的区别，所以反过来你想要知道某个String或者Array或者任意类型的对象被添加了什么方法都可以使用for-in获得，for-in是最彻底的。