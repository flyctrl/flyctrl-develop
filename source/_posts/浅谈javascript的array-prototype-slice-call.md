---
title: 浅谈javascript的Array.prototype.slice.call
tags:
  - Array.prototype.slice.call
id: 2650
categories:
  - JS/Jq
date: 2017-07-14 11:09:32
---

&emsp;&emsp;在js中我们经常会看到Array.prototype.slice.call(arguments,0)的写法，当然，这个方法的作用也许大家都明白，那就是把类数组对象转换成一个真正的数组。关于这个方法，我说说自己的理解。这里涉及到slice()方法和call()方法，所以先简单说说这两个方法。

## **slice()方法**
&emsp;&emsp;数组和字符串都有这个slice方法，这个方法的作用是截取一段数据。它接收两个参数，第一个参数是要截取的位置索引，第二参数可选，表示要截取到的结束位置，但是不包括结束位置。在数组中，该方法的返回值是包含截取元素的组成的数组，在字符串中，该方法的返回值是包含截取字符串组成的字符串。

&emsp;&emsp;该方法也可以传入负数值，当参数为负数的时候，将参数和数组或字符串的长度相加得到的正数作为实际的参数。
如下：
```javascript
[1,2,3,4,5,6].slice(2,4);
[1,2,3,4,5,6].slice(-4,-2);
```
返回值均为[3,4]，为数组。
```javascript
'everything'.slice(2,4);
'everything'.slice(-4,-2);
```

返回值分别为'er'和'hi'，为字符串。

&emsp;&emsp;如果之传入一个参数的话，那就是输出从开始位置到结束位置的所有元素。不再举例。

**字符串的其他类似方法**
在字符串中，和slice()方法类型的还有两个方法：

## **substring()和substr()方法。**

&emsp;&emsp;其中，substring()方法表示返回从开始位置到结束位置的字符串，substr()接收两个参数，第一个参数表示开始位置，第二个参数表示要截取的字符个数，和前两个方法略有不同。

当传入方法的参数为负数时，这三种方法又略有不同。

当传入方法的参数为负数时：

slice()像上面说的，是负数加上字符串的长度得出相应的正值；

substring()方法的参数均置为零；

substr()方法的第一个参数为负值加上字符串长度得到的正值，第二个参数置为零。

## **call()和apply()方法**
call()和apply()方法主要是用来扩充函数的作用域。

call()和apply()方法接收两个参数：

apply()：第一个参数是作用域，第二个是参数数组，其中第二个参数可以是数组实例，也可以是arguments对象。

call()方法也接收两个参数，仅仅在于和apply()的传参方式不同：传递函数的参数必须逐个写入。

鉴于这里不是重点，在这里就不再赘述。

```javascript
Array.prototype.slice.call(arguments,0)
```
&emsp;&emsp;可能刚开始学习js的童鞋并不是很能理解这句为什么能实现这样的功能。比如我就是一个，所以，来探究一下。

&emsp;&emsp;首先，slice有两个用法，一个是String.slice,一个是Array.slice，第一个返回的是字符串，第二个返回的是数组，这里我们看第2个。

&emsp;&emsp;Array.prototype.slice.call(arguments)能够将arguments转成数组，那么就是arguments.toArray().slice();到这里，是不是就可以说Array.prototype.slice.call(arguments)的过程就是先将传入进来的第一个参数转为数组，再调用slice？

再看call的用法，如下例子

```javascript
var a = function(){
console.log(this); // 'littledu'
console.log(typeof this); // Object
console.log(this instanceof String); // true
}
a.call('littledu');
```
&emsp;&emsp;可以看出，call了后，就把当前函数推入所传参数的作用域中去了，不知道这样说对不对，但反正this就指向了所传进去的对象就肯定的了。
到这里，基本就差不多了，我们可以大胆猜一下slice的内部实现，如下:
```javascript
Array.prototype.slice = function(start,end){
var result = new Array();
start = start || 0;
end = end || this.length; //this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键
for(var i = start; i < end; i++){
result.push(this[i]);
}
return result;
}
```
大概就是这样吧，理解就行，不深究。

最后，附个转成数组的通用函数
```javascript
var toArray = function(s){
    try{
        return Array.prototype.slice.call(s);
    } catch(e){
    var arr = [];
        for(var i = 0,len = s.length; i < len; i++){
        //arr.push(s[i]);
        arr[i] = s[i]; //据说这样比push快
        }
        return arr;
    }
}
```