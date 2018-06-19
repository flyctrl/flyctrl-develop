---
title: ES6中的import和export
tags:
  - ES6
  - import
  - export
id: 2668
categories:
  - ECMAScript6
date: 2017-11-03 10:44:09
---
简要介绍：ES6在语言规格的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的

CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。

ES6模块主要有两个功能：export和import

export用于对外输出本模块（一个文件可以理解为一个模块）变量的接口

import用于在一个模块中加载另一个含有export接口的模块。
### 1.以对象属性形式的export和import
#### （1）一般的形式
```javascript
//export.js
export let x=1;
export let y=2;
```
```javascript
import{x,y} from "./export.js"
console.log(x,y)//输出x=1,y=2
```
#### （2）函数名的形式
```javascript
//export.js
export function x(){
}
```
```javascript
import {x} from "./export.js";
console.log(x)//输出的为x函数
```
也就是说：
```javascript
export function x(){
}
//等价于==
export let x=function(){
}
```
#### （3）import as
```javascript
//export.js
export let x=1;
export let y=2;
//import.js
import * as myVar from "./export.js"
console.log(myVar.x)//输出为1
console.log(myVar.y)//输出为2
```
### 2.以模板形式的export和import
```javascript
//export.js
export default let x=1;
```
```javascript
import x from  "./export.js";
console.log(x) //输出的是x
```
可以发现，通过export模板的话，输出的格式不是以对象的形式{x}，而是直接的x。
