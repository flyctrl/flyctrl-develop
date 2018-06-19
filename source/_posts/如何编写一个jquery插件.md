---
title: 如何编写一个jQuery插件
tags:
  - 编写插件
id: 284
categories:
  - 前端杂货
date: 2015-07-13 14:55:43
---

## **创建一个jQuery功能**
```javascript
jQuery.fn.myFunction = function(){
    return this.each(function(){
    // 特定于元素的代码在这里
    });
};
```
例子
```javascript
jQuery.fn.makeTextRed = function(){
    return this.each(function(){
    $(this).css('color', 'red');
    });
};
// Example usage
$('#my-div').makeTextRed(); // make text in "my-div" red
$('p').makeTextRed(); // 让所有段落红
```
## **创建一个jQuery的方法**
例子
```javascript
jQuery.sayHelloWorld = function（）{
alert('Hello World');
} ;
//使用示例
$.sayHelloWorld(); // alerts "Hello World"
```

选项

你的插件的灵活和用户友好尽可能使用选项。扩大（）方法将两个或多个对象作为参数，并合并它们的含量在第一个对象。

例子

一个函数，设置文本颜色（默认为红色）。
```javascript
jQuery.fn.makeTextColored = function(settings){
var config = {
'color': 'red'
};
if (settings){$.extend(config, settings);}

return this.each(function(){
$(this).css('color', config.color);
});
};
```

现在，我们可以选择通过设置参数或不使用此功能。
```javascript
$('#my-div').makeTextColored(); // 使文本红(默认)
$('#my-div').makeTextColored('blue');//使文本蓝色
```

兼容性

由于变量可能会使用其他插件，使用别名技术，使您的插件向前兼容。
```javascript
(function($){
$.fn.myFunction = function() {
return this.each(function() {
// 特定于元素的代码在这里
});
};
})(jQuery);
```
&emsp;&emsp;我们传递的功能，现在可以使用我们喜欢的任何别名为jQuery jQuery的。因此，而不是美元，你也可以使用任何其他有效的JavaScript变量名。

jQuery插件清单

这是一个重要的点开发一个jQuery插件（从jQuery.com）的时要记住。

[插入插件的名称。JS，例如将文件命名为jQuery的。jquery.debug.js
连接到jQuery.fn对象，jQuery对象的所有功能，所有新的方法。
里面的方法，这是当前jQuery对象的引用。

&emsp;&emsp;你附加的任何方法或函数必须有一​​个分号（;)结束“，否则压缩的代码时，将打破。

&emsp;&emsp;您的方法必须返回jQuery对象，除非明确地指出，否则。
使用this.each来遍历当前匹配的元素集合。
务必将插件jQuery的，而不是美元，所以通过noConflict（），用户可以使用一个自定义的别名。
jQuery插件模板
这是两个很好的的代码模板开始开发jQuery插件时。

函数模板
```javascript
(function($){
$.fn.myPlugin = function(settings){
var config = {
'foo': 'bar'
};
if (settings){$.extend(config, settings);}
return this.each(function(){
// 特定于元素的代码在这里
});
};
})(jQuery);
```
方法模板
```javascript
(function($){
$.myPlugin = function(settings){
var config = {
'foo': 'bar'
};
if (settings){$.extend(config, settings);}
// 代码在这里
return this;
};
})(jQuery);
```
例如：jQuery的幻灯片插件

&emsp;&emsp;我选择了使用非常简单的例子，到目前为止，为了让您开始浏览网页。下面的例子是一个比较复杂，可能有助于让您的灵感。
它使用setInterval（）的函数的一个HTML元素的组合与jQuery效果淡出（）和淡入（）周期的任意数量的图像内。
在setUp
HTML
```html
<div id="slideshow">
<img src="img/sample-image-1.png" alt="" />
<img src="img/sample-image-2.png" alt="" />
<img src="img/sample-image-3.png" alt="" />
<img src="img/sample-image-4.png" alt="" />
```

CSS
```css
#slideshow img {
display: none;
position: absolute;
}
```
使用Javascript
```javascript
(function($){
$.simpleSlideShow = function(selector, settings){
// 设置
var config = {
'delay': 2000,
'fadeSpeed': 500
};
if ( settings ){$.extend(config, settings);}
// 变量
var obj = $(selector);
var img = obj.children('img');
var count = img.length;
var i = 0;

// 显示第一个图像
img.eq(0).show();

// 运行幻灯片
setInterval(function(){
img.eq(i).fadeOut(config.fadeSpeed);
i = ( i+1 == count ) ? 0 : i+1;
img.eq(i).fadeIn(config.fadeSpeed);
}, config.delay);
return this;
};
})(jQuery);
```
用法

为了使幻灯片上的＃幻灯片的 div，我们只需调用它使用下面的JavaScript代码：
```javascript
<script type="text/javascript">
$.simpleSlideShow('#slideshow');
</script>
```
&emsp;&emsp;因为我们允许设置来改变行为的幻灯片,我们可以让它等待5秒钟图像之间和设置“渐”持续到200 ms使用:
```javascript
<script type="text/javascript">
$.simpleSlideShow('#slideshow', {'delay':5000, 'fadeSpeed': 200});
</script>
```