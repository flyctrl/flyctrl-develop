---
title: 'slice,substr和substring的区别'
tags:
  - slice
  - slice substr substring的区别
  - substr
  - substring
id: 1020
categories:
  - JS/Jq
date: 2015-07-26 17:14:50
---

首先，slice，substring及substr返回被操作字符串的一个子串，对原始字符串没有任何影响，同时都接受一个或者两个参数。第一个参数指定子串的起始位置，在第二个参数指定的情况下，slice和substring方法表示子串的结束位置(不包括结束位置)，而substr方法则是返回的字符个数。若第二个参数没有指定，则默认为字符串的长度。例子如下：
```javascript
var test = "hello world";
console.log(test.slice(4,7));                        //o w
console.log(test.substring(4,7));                //o w
console.log(test.substr(4,7));                //o world

console.log(test.substr(4));                        //o world
console.log(test.substring(4));                //o world
console.log(test.substr(4));                        //o world
```

这里需要注意的是：substring是以两个参数中较小一个作为起始位置，较大的参数作为结束位置。
如：
```javascript
console.log(test.substring(7,4));        //o w
```

当接收的参数是负数时，slice会将它字符串的长度与对应的负数相加，结果作为参数；substr是第一个参数为负的话，与字符串长度相加然后作为第一个参数，而第二个为负的参数，则转换为0作为第二个参数；substring则干脆将负参数都直接转换为0。
```javascript
var test = 'hello world';
console.log(test.slice(-3));       //rld 相当于console.log(test.slice(8));
console.log(test.substring(-3));   //hello world 相当于console.log(test.substring(0));
console.log(test.substr(-3));      //rld 相当于console.log(test.substr(8));
console.log(test.slice(3,-4));     //lo w 相当于console.log(test.slice(3，7));
console.log(test.substring(3,-4)); //hel 相当于console.log(test.substring(3，0));
console.log(test.substr(3,-4));    //空字符串 相当于console.log(test.substr(3，0)); 
```
&nbsp;