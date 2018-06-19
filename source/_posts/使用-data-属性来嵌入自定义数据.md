---
title: 使用 data-* 属性来嵌入自定义数据
tags:
  - data-* 自定义属性
id: 1568
categories:
  - 前端杂货
date: 2015-09-09 21:26:59
---

**1\. Html 实例**
```html
<ul>
<li data-animal-type="bird">Owl</li>
<li data-animal-type="fish">Salmon</li>
<li data-animal-type="spider">Tarantula</li>
</ul>
```
**2.浏览器支持**

IE | FireFox | Safari | Opera
---|---|---|---|---
支持 | 支持 | 支持 | 支持
支持 | 支持 | 支持 | 支持

**3.定义和用法**

>data-* 属性用于存储页面或应用程序的私有自定义数据。

>data-* 属性赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。

存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。

data-* 属性包括两部分：
属性名不应该包含任何大写字母，并且在前缀"data-"之后必须有至少一个字符

属性值可以是任意字符串

注释：用户代理会完全忽略前缀为 "data-" 的自定义属性。

语法
<element data-*="somevalue">

HTML adta-*属性

**4.外加信息**

&emsp;&emsp;HTML标签可以添加自定义属性来存储和操作数据。但这样做会导致html语法上不符合Html规范。

&emsp;HTML5规范里增加了一个自定义data属性，自定义data属性的用法非常的简单，就可以往HTML标签上添加任意以"data-"开头的属性，这些属性页面上是不显示的，它不会影响到你的页面布局和风格，但它却是可读可写的。

下面的一个代码片段是一个有效的HTML5标记：
```html
<div id="item" data-id='123'>11111</div>
```
&emsp;可是，怎么来读取这些数据呢？你当然可以遍历页面元素来读取你想要的属性，但jquery已经内置了方法来操作这些属性。使用jQuery的.data()方法来访问这些"data-*"属性。其中一个方法就是 .data(obj)，这个方法是在jQuery1.4.3版本后出现的，它能返回相应的data属性。 

举个例子，你可以用下面的写法读取data-id属性值--123：
```javascript
var myid= jQuery("#item").data('id');
```
你还可以在"data-*" 属性里使用json语法，
```html
<div id="item" data-id='{"game":"on"}'></div>
```
&emsp;&emsp;你可以通过js直接访问这个数据，通过json的key值，你能得到相应的value：
```javascript
var gameStatus= jQuery("#item").data('id').game;
```
&emsp;&emsp;你也可以通过.data(key,value)方法直接给"data-\*"属性赋值。一个重要的你要注意的事情是，这些"data-\*"属性应该和它所在的元素有一定的关联，不要把它当成存放任意东西的存储工具。尽管"data-\*" 是HTML5才出现的属性，但jquery是通用的，所以，在非HTML5的页面或浏览器里，你仍然可以使用.data(obj)方法来操作"data-*" 数据。