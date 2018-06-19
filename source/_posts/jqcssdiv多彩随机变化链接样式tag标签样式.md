---
title: JQ+CSS+DIV多彩随机变化链接样式tag标签样式
tags:
  - 多彩随机变化链接样式tag标签样式
id: 2014
categories:
  - 前端杂货
date: 2016-01-05 10:05:05
---

tag标签随机多彩变化的超链接样式，使用JQ+DIV+CSS实现刷新随机变化样式特效。jquery版的随机多彩tag标签随机css字体颜色和字号大小效果。于是就写下这个效果与大家分享，办法也很笨拙，就是利用jquery随机数来遍历#tag中所有的a链接为其添加一个随机的类名。然后预先定义了12个链接样式。你可以自定义类似 #tags .tags1 这样的css以实现你需要的字体样式。这里的jquery随机多彩tag标签随机颜色和字号大小效果样式只是演示随便写的，不够漂亮。

![JQ+CSS+DIV多彩随机变化链接样式tag标签样式](http://www.npm8.com/wp-content/uploads/2016/01/20140211073616458.png)

js代码如下：
```javascript
<script src="jquery.min.js" type="text/javascript"></script>
<script type=javascript">
$(document).ready(function() {
var tags_a = $("#tags a");
tags_a.each(function(){
var x = 9;
var y = 0;
var rand = parseInt(Math.random() * (x - y + 1) + y);
$(this).addClass("tags"+rand);
});
})
</script>
```
css代码如下：
```css
body{ text-align:center}
body,a{ font-size:13px;}
a{ color:#333333; text-decoration:none;}
.taglist{ width:350px;overflow:hidden; text-align:left; margin:0 auto;border:#dddddd solid 1px;}
.taglist .tit{ width:100%; height:24px; line-height:24px; background-color:#565662;}
.taglist .tit a{ padding-left:8px; color:#ffffff;}
#tags a{height:26px; line-height:26px;padding-right:6px;}
#tags .tags0{}
#tags .tags1{color:#C00; font-size:24px;}
#tags .tags2{color:#030; font-size:16px;}
#tags .tags3{color:#00F;}
#tags .tags4{ font-size:16px;}
#tags .tags5{color:#C00; font-size:20px;}
#tags .tags6{color:#F06 font-size:20px;}
#tags .tags7{color:#030; font-weight:bold; font-size:18px;}
#tags .tags8{color:#F06; font-weight:bold;}
#tags .tags9{color:#C00; font-weight:bold;font-size:16px;}
#tags .tags10{color:#090; font-weight:bold;font-size:18px;}
#tags .tags11{color:#09F;}
#tags .tags12{color:#F90;font-size:14px;}
#tags a:hover{ color:#F00; text-decoration:underline;}
.w95{ width:95%; margin:0 auto; padding-top:6px; padding-bottom:6px;}
.taglist .w95{}
```
HTML代码部分：
```html
<div class="taglist"> 
 <div class="tit"><a href="#">TAG标签</a></div> 
 <div class="w95" id="tags"> 
 <a href="http://www.npm8.com">导航菜单</a> 
 <a href="http://www.npm8.com">焦点幻灯片</a> 
 <a href="http://www.npm8.com">条幅广告代码</a> 
 <a href="http://www.npm8.com">经典下拉菜单</a> 
 <a href="http://www.npm8.com">jquery 特效</a> 
 <a href="http://www.npm8.com">滚动代码</a> 
 <a href="http://www.npm8.com">查看源码</a> 
 <a href="http://www.npm8.com">css hack</a> 
 <a href="http://www.npm8.com">file样式美化</a> 
 <a href="http://www.npm8.com">CSS</a> 
 <a href="http://www.npm8.com">HTML</a> 
 <a href="http://www.npm8.com">DIVCSS5</a> 
 <a href="http://www.npm8.com">JS+CSS幻灯片</a> 
 <a href="http://www.npm8.com">网页源码</a> 
 <a href="http://www.npm8.com">多彩导航条</a> 
 <a href="http://www.npm8.com">css div</a> 
 <a href="http://www.npm8.com">JS表格隔行变色</a> 
 <a href="http://www.npm8.com">css+div</a> 
 <a href="http://www.npm8.com">下拉菜单</a>
 </div>
</div>
```
本特效可用于tag标签随机多彩变化的超链接样式。使用非常简单，可以预设多个想要的CSS a样式，可以设置超链接文字大小、字体颜色、字体背景等不同样式，随机刷新网页时候JQ自动实现超链接文字多样css样式特效效果。