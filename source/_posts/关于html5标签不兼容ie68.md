---
title: 关于HTML5标签不兼容(IE6~8)
tags:
  - H5标签不兼容
  - html5不兼容
id: 1992
categories:
  - 前端兼容
date: 2015-12-23 09:48:00
---

&emsp;&emsp;HTML5的语义化标签以及属性，可以让开发者非常方便地实现清晰的web页面布局，加上CSS3的效果渲染，快速建立丰富灵活的web页面显得非常简单。

比较常用的HTML5的新标签元素有：

*   ```<header>```定义页面或区段的头部；
*   ```<nav>```定义页面或区段的导航区域；
*   ```<section>```页面的逻辑区域或内容组合；
*   ```<article>```定义正文或一篇完整的内容；
*   ```<aside>```定义补充或相关内容；
*   ```<footer>```定义页面或区段的尾部；
使用他们能让代码语义化更直观,而且更方便SEO优化。但是此HTML5新标签在IE6/IE7/IE8上并不能识别，需要进行JavaScript处理。

### 方法一：通过Javascript创建元素document.createElenment("".....")

在```<head>```....```</head>```中添加如下代码：
```javascript
<!--[if lt IE 9]>
<script type="text/javascript">
var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
var i= e.length;
while (i--){
document.createElement(e[i])
}
</script>
<![endif]-->
```
&nbsp;

### 方法二：使用Google的html5shiv包（推荐）
```html
<!--[if lt IE 9]> 
 <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
 <![endif]-->
 ```
&nbsp;
**但是不管使用以上哪种方法,都要初始化新标签的CSS.因为HTML5在默认情况下表现为内联元素，对这些元素进行布局我们需要利用CSS手工把它们转为块状元素方便布局**
```css
/*html5*/
article,aside,dialog,footer,header,section,footer,nav,figure,menu{display:block}
```
&nbsp;

&emsp;&emsp;但是如果ie6/7/8 禁用脚本的用户,那么就变成了无样式的"白板"网页,我们该怎么解决呢?
我们可以参照facebook的做法，即引导用户进入带有noscript标识的“/?_fb_noscript=1”页面，用 html4 标签替换 html5 标签，这要比为了保持兼容性而写大量 hack 的做法更轻便一些。
```html
<!--[if lte IE 8]>
<noscript>
<style>.html5-wrappers{display:none!important;}</style>
<div class="ie-noscript-warning">您的浏览器禁用了脚本，请<a href="">查看这里</a>来启用脚本!或者<a href="/?noscript=1">继续访问</a>.
</div>
</noscript>
<![endif]-->
```
&nbsp;