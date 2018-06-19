---
title: 手把手教你怎么写jQuery插件
tags:
  - 写jquery插件
id: 546
categories:
  - JS/Jq
date: 2015-07-17 09:34:16
---

&emsp;&emsp;jQuery（以下简称JQ）是一个功能强大而又小巧的JS框架，现在很多网站都在使用JQ，本站也不例外。本文教大家如何写一个属于你自己的JQ插件。

&emsp;&emsp;本JQ插件例子是在你网站的文章结尾处添加你的版权。
JQ插件标准的封装代码如下，首先需要闭包：
```javascript
<script type="text/javascript">
(function($){
//这里放入插件代码
})(jQuery);
</script>
```
这是jQuery官方的插件开发规范，这样写是作用是：

1\. 避免全局依赖。

2\. 避免第三方破坏。

3\. 兼容jQuery操作符’$’和’jQuery’

接着给插件加入主体：
```javascript
<script type="text/javascript">
(function($){
$.fn.userCp=function(options){ //定义插件的名称，这里为userCp
var dft={
//以下为该插件的属性及其默认值
cpBy: "web前沿", //版权所有者
url: "http://www.js7e.com", //所有者链接
size: "12px", //版权文字大小
align: "left" //版权文字位置，left || center || right
};
var ops = $.extend(dft,options);
var style = 'style="font-size:' + ops.size + ';text-align:' + ops.align + ';"'; //调用默认的样式
var cpTxt = '<p' + ' ' + style + '>此文章版权归<a target="_blank" href="' + ops.url + '">' + ops.cpBy + '</a>所有</p>'; //生成版权文字的代码
$(this).append(cpTxt); //把版权文字加入到想显示的div
}
})(jQuery);
</script>
```
&nbsp;

&emsp;&emsp;OK了，这个插件已经完成了，接下来我们来看看调用的方式。比如你文章所在的div的id=”article-content”，那么在此div后面（先读取到了该div，该div才可以作为后面的JS的对象）加上JS代码：
```javascript
<script type="text/javascript">
$("#article-content").userCp();
</script>
```
&emsp;&emsp;其实也不是一定要放到该div的后面，比如要放到head区域里的话，就要使用JQ的预读功能，也就是把页面所有的dom都读取完之后，才执行里面的JS：
```javascript
<script type="text/javascript">
$(function(){
//官方解释：在dom文档载入完成后执行的函数
$("#article-content").userCp();
});
</script>
```
&emsp;&emsp;如果不想使用默认的内容，比如要修改版权所有者名字、网址、文字大小和靠右显示等，那就给这个插件传几个参数：
```javascript
<script type="text/javascript">
$("#article-content").userCp({
cpBy: " T ",
url: "http://js7e.com",
size: "16px",
align: "right"
});
</script>
```
&emsp;&emsp;在实际的应用中，我们当然不会写这么一个插件，因为直接用非封装的方法或者直接改页面的源码会更快更方便，我只是为了给大家一个demo，所以才写了这个鸡肋的插件。
不会JS的同学，可以直接去学JQ，这样让你在短时间内能够做出很炫的效果，而不必去啃那些厚厚的JS书籍了。不过如果你是想以JS作为职业的话，还是要从最基本的东西学起。