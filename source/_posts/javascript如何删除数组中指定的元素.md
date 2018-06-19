---
title: javascript如何删除数组中指定的元素
tags:
  - js删除数组指定元素
id: 853
categories:
  - JS/Jq
date: 2015-07-24 18:27:59
---

本章节将通过实例简单介绍一下如何删除数组中的元素，希望给需要的朋友带来帮助。

删除数组元素的方式有多种，下面简单介绍一下常用的几种方式:

### **一、使用delete进行删除:**

代码实例如下:
```javascript
var myArray=new Array()
myArray[0]="蚂蚁部落";
myArray[1]="青岛";
myArray[2]="奋斗才会有美好的未来";
delete myArray[1]
alert(myArray.length);
```
以上代码可以删除数组第二个元素的内容，但是数组的长度和原来的索引都没有发生变化。myArray[1]值变为undefined。

### **二、使用splice()函数删除:**

语法格式:
```javascript
arrayObject.splice(index,howmany)
```
此函数可以从指定位置开始删除指定数目的数组元素。index表示开始删除的数组元素索引，howmany规定要删除的数目。

代码实例如下:
```javascript
var myArray=new Array()
myArray[0]="蚂蚁部落";
myArray[1]="青岛";
myArray[2]="奋斗才会有美好的未来";
myArray.splice(0,1);
alert(myArray.length);
```
以上代码可以删除数组中的第一个元素，并且弹出现在数组的长度。

### **三、自定义方式删除数组元素:**
```javascript
Array.prototype.remove=function(dx)
{
　if(isNaN(dx)||dx>this.length)
  {
    return false;
  }
　for(var i=0,n=0;i<this.length;i++)
　{
　  if(this[i]!=this[dx])
　  {
　　this[n++]=this[i]
　  }
   }
   this.length-=1
}
var myArray=new Array()
myArray[0]="蚂蚁部落";
myArray[1]="青岛";
myArray[2]="奋斗才会有美好的未来";
myArray.remove(1);
alert(myArray.length);
```
以上代码可以删除索引值为1的数组元素，并且弹出当前数组的长度。