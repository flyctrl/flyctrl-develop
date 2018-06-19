---
title: JS对象的几个方法介绍
tags:
  - constructor
  - hasOwnProperty
  - instanceof
  - toString
id: 2127
categories:
  - JS/Jq
date: 2016-03-04 16:54:20
---

1、**hasOwnProperty**判断是不是对象自身的属性，如果是继承的返回false否则true
```javascript
function Fn(){
}
Fn.prototype.num = 10;

var obj = new Fn();
obj.id = 1;

console.log(obj.hasOwnProperty("id")); //true
console.log(obj.hasOwnProperty("num")); //false
```
&nbsp;

2、**constructor**返回对象的构造函数
```javascript
var obj = new Function();
console.log(obj.constructor); //function Function() { [native code] }
```
&nbsp;

3、**instanceof**判断对象是否在某个构造函数上
```javascript
var fn = new Function();
console.log(fn instanceof Function); //true
console.log(fn instanceof Object); //true
console.log(fn instanceof String); //false
```
&nbsp;

4、**toString**把对象转换成字符串
```javascript
var arr = [1,2,3];
console.log(arr.toString()); //1,2,3
```
&nbsp;