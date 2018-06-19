---
title: JSON简介以及用法代码汇总
tags:
  - json用法汇总
id: 1159
categories:
  - JS/Jq
date: 2015-08-05 17:03:44
---

# **什么是JSON？**

JavaScript 对象表示法（JavaScript Object Notation）。

JSON是一种轻量级的数据交换格式，某个JSON格式的文件内部譬如可以长成这样：
```javascript
{
  "name": "hanzichi",
  "sex": "male"
}
```
看起来都是key-value的键值对，很像js的对象吧？没错，但同时JSON表示不服，我不能跟js的对象长成一样啊，我得有我自己的个性，于是规定键-值对中的键必须用双引号！同时规定键-值对中的值的取值有一定要求：

JSON 值可以是：

数字（整数或浮点数）

字符串（在双引号中）

逻辑值（true 或 false）

数组（在方括号中）

对象（在花括号中）

null

除以上6种外，再无其他，没有像js一样的undefined、NAN，JSON拒绝使用。

# **如何使用JSON？**

JSON一般以字符串的形式在数据交互过程中游走，so对于js而言，如何将json字符串和js对象之间进行相互转换显得尤为重要。

&nbsp;

**eval大法（json字符串 -> js对象）**
```javascript
var jsonStr = '{"name": "hanzichi", "sex": "male"}';
var ans = eval('(' + jsonStr + ')');
console.log(ans.name, ans.sex);	// hanzichi male 
```
eval 函数非常快，但是它可以编译任何 javascirpt 代码，这样的话就可能产生安全的问题。eval 的使用是基于传入的代码参数是可靠的假设下，有一些情况下，可能客户端是不可信任的。如果基于安全的考虑的话，最好是使用一个JSON解析器，一个JSON 解析器将只接受JSON文本，所以是更安全的，如下。

&nbsp;

**JSON.parse（json字符串 -> js对象）**
```javascript
var jsonStr = '{"name": "hanzichi", "sex": "male"}';
var obj = JSON.parse(jsonStr);
console.log(typeof obj, obj); // object Object {name: "hanzichi", sex: "male"} 
```
第二个参数可以是函数，可以对值进行删改：
```javascript
var jsonStr = '{"name": "hanzichi", "sex": "male", "age": 10}';
var obj = JSON.parse(jsonStr, function(key, value) {
  if(key === 'name') {
    return 'my name is ' + value;
  }
  return value;
});
console.log(typeof obj, obj); // object Object {name: "my name is hanzichi", sex: "male", age: 10} 
```
&nbsp;

**JSON.stringify（js对象 -> json字符串）**
```javascript
var obj = {name: 'hanzichi', sex: 'male', age: '10'};
var jsonStr = JSON.stringify(obj);
console.log(jsonStr);  // {"name":"hanzichi","sex":"male","age":"10"}
```
也可以加个参数，规定需要转化为json字符串的属性（数组形式，跟数组同名的js对象属性才会被转换）：
```javascript
var obj = {name: 'hanzichi', sex: 'male', age: '10'};
var jsonStr = JSON.stringify(obj, ['name']);
console.log(jsonStr);  // {"name":"hanzichi"}
```
第二个参数也可以是个函数，可以删选符合条件的属性（或者改变属性值，没有return表示放弃该属性，return的值表示该key在json字符串中的值）
```javascript
var obj = {name: 'hanzichi', sex: 'male', age: '10'};
var jsonStr = JSON.stringify(obj, function(key, value) {
  if(key === 'name') {
    return 'my name is ' + value;
  }
  return value;
});
console.log(jsonStr);  // {"name":"my name is hanzichi","sex":"male","age":"10"} 
```
还可以有第三个参数，可以是数字或者字符串。

如果是数字的话，表示缩进，数字大小超过10了按10处理。
```javascript
var obj = {name: 'hanzichi', sex: 'male', age: '10'};
var jsonStr = JSON.stringify(obj, null, 4);
console.log(jsonStr);  
// {
//     "name": "hanzichi",
//     "sex": "male",
//     "age": "10"
// }
```
也可以是字符串，会在属性前加上这些字符串充当前缀，同样字符串长度超过10只截取10：
```javascript
var obj = {name: 'hanzichi', sex: 'male', age: '10'};
var jsonStr = JSON.stringify(obj, null, 'pre');
console.log(jsonStr);  
// {
// pre"name": "hanzichi",
// pre"sex": "male",
// pre"age": "10"
// }
```
这里我有个疑问，我觉得输出应该是如下形式才对啊...
```javascript
{
"prename": "hanzichi",
"presex": "male",
"preage": "10"
}
```
麻烦有知道的大大能倾情告诉我...

&nbsp;

**总结**

当然传说中的ie8（及以下）因为某种缺陷不能使用JSON.parse()以及JSON.stringify()方法，而eval()又显得不安全，如果要兼容它们的话可以引用[json2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)。