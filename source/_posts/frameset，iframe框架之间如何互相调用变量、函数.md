---
title: frameset，iframe框架之间如何互相调用变量、函数
tags:
  - frameset 调用变量
  - iframe调用变量函数
  - 函数
id: 1663
categories:
  - JS/Jq
date: 2015-09-16 13:02:18
---

&emsp;&emsp;以往一直在编写的都是前台的UI，很少使用到frameset、iframe，对其了解也是十分有限，只是知道其可以为其当前页面引入html文件成为当前页的一部分，但是这两天在做后台UI界面的时候，发现这样的框架也是有相当多知识点在里面的。那框架是啥？可以这样说：通过使用框架，你可以在同一个浏览器窗口中显示不止一个页面。每份HTML文档称为一个框架，并且每个框架都独立于其他的框架。那么关于框架，有几个方面是需要我了解的：

&nbsp;

**（1）获得html页面上的frame**

window.frames可以获得本页面上所有frame集合，用法与document.forms,document.imgs的用法相似，这是这里用的是window对象，获取某个框架可以这样做window.frames[0]、window.frames['frameName']、frames['frameName']、frames[0]、self.frames[0]，此处self与window等价，相当于本页面的window对象。

这里也还要再看两个属性,contentWindow、contentDocument两个属性，也是可以用来获取子窗口，框架的window对象的。

contentWindow 兼容各个浏览器，可取得子窗口的 window 对象。

contentDocument Firefox 支持，> ie8 的ie支持。可取得子窗口的 document 对象。

假如我要刷新本页面中第一个框架的页面，可以怎么做：
```javascript
window.frames[0].contentWindow.location.reload();
```
&nbsp;

**（2）父框架调用子框架的变量或函数**

结合上面说的获得页面上的frame，那么调用子框架的变量或是函数可以这样来：
```javascript
frames[0].a;
frames[0].refresh();
alert(frames[0].location.href);
```
这是调用第一个框架里面的a变量和refresh函数。

&nbsp;

**（3）子框架调用父框架的变量或函数**

对于子框架调用父框架的这种情况下，window有个属性叫parent，用来调用上层框架的，所以可以这样来：
```javascript
window.parent.a;
window.parent.refresh();
```
这是调用子框架调用父框架的a变量和refresh函数。

&nbsp;

**（4）兄弟框架之间的调用**

可以通过它们的父框架来相互调用，可以这样做
```javascript
self.parent.frames['child1'];
self.parent.frames['child2'];
```
&nbsp;

**（5）多层框架的调用**
```javascriptwindow.frames[0].frames[2];
window.frames['child_1'].frames['sub_child_3'];
```
&nbsp;

**（6）顶层框架**

首先需要判断是否为顶层框架，也就是根，可以这样来做：
```javascript
if(self==window.top){
        //....
}
```
*window的另外一个属性top，它表示对顶层框架的引用，这可以用来判断一个框架自身是否为顶层框架*
基本关于frameset和iframe之间的互相调用知识点就这些！
&nbsp;