---
title: 层级元素含有position属性时鼠标坐标位置解决方案
tags:
  - position层级
id: 302
categories:
  - JS/Jq
date: 2015-07-13 15:12:56
---

&emsp;&emsp;相信熟悉javascript的朋友对鼠标坐标函数比较了解的，网上的资料也很多，就不多说了。先看看一段代码：
```javascript
jQuery(document).ready(function(){
$('#demos').mousemove(function(e){
var relX = e.pageX - this.offsetLeft
var relY = e.pageY - this.offsetTop
$('#demos').html(relX + '， ' + relY);
});
```

[![1gif](http://www.npm8.com/wp-content/uploads/2015/07/1gif.gif)](http://www.npm8.com/wp-content/uploads/2015/07/1gif.gif)

**层级元素含有position属性**

&emsp;&emsp;在这里我们要重点说下offsetLeft的计算方法，上面也说到是对象相对于父级对象的布局或坐标的left值，那么父级对象将是影响最终值的关键。一般情况下，都没什么问题，但如果父级对象出现了position属性，并且定义了margin值，那么计算结果将会不如我们所意。这是个特殊情况，在这时我们需要适当的修改上面的示例代码，具体如下：
```javascript
jQuery(document).ready(function(){
$('#demos').mousemove(function(e){
var parentOffset = $(this).parent().offset();
var relX = e.pageX - parentOffset.left;
var relY = e.pageY - parentOffset.top;
$('#demos').html(relX + '， ' + relY);
});
})
```