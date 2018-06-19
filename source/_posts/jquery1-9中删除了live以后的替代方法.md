---
title: jQuery1.9+中删除了live以后的替代方法
tags:
  - jQuery删除了live以后的替代方法
id: 1881
categories:
  - JS/Jq
date: 2015-10-28 11:52:17
---

　　根据jQuery的官方描述，live方法在1.7中已经不建议使用，在1.9中删除了这个方法。并建议在以后的代码中使用on方法来替代。
　　on方法可以接受三个参数：事件名、触发选择器、事件函数。
　　需要特别注意的是：on方法中间的这个触发选择器就是你将要添加的HTML元素的类名、id或者元素名，使用它就可以实现live的效果。

例如我的html文档中已经有了一个id为parent的div，我将要在这个div内部再动态添加一个class为son的span，然后我为这个span绑定一个事件，那么我需要这样写：
```javascript
$('#parent').on('click','.son',function(){alert('test')}); 
```
&nbsp;
　　这个触发选择器实际上就是在 JQ内部判断了一次事件参数的$(e.target).is(selector)，只有触发对象匹配触发选择器才会触发。这是利用了事件冒泡的机制来完成 的，原本的live也是使用冒泡机制所以既然on可以实现那么live也就没有存在的必要了，只不过为了兼容让它从1.7苟延残喘的活到了1.9而已。

　　这篇文章也没啥内容了，接下来就用这个功能做点有意义的事情示范下吧～ 在低版本IE中A标签在鼠标按下时候会出现虚线边框，这是由focus造成的。我们只要在全局事件中做点手脚就能解决这个问题。在现代浏览器中focus 是不冒泡的，但是低版本浏览器中可以冒泡。所以对于低版本浏览器中对focus使用live是有效的。在jQuery1.9之前的版本我们可以这样写：
```javascript
$("a").live("focus",function(){
  this.blur();
});
```
&nbsp;
jQuery1.9之后由于live被删除了，所以应该这样写：
```javascript
$(document).on("focus","a",function(){
  this.blur();
});
```
&nbsp;
还要注意个问题，如果是从live的写法换成on的写法别忘了调整调用链。因为live的返回值是事件触发的对象，而使用on则是在容器对象上。
```javascript
//jQuery1.9-
$("#panel").find("div").live("click",function(){
  alert("x");
}).addClass("x");

//jQuery1.9+
$("#panel").on("click","div",function(){
  alert("x");
}).find("div").addClass("x");
```
&nbsp;