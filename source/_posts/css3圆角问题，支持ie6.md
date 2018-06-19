---
title: CSS3圆角问题，支持IE6
tags:
  - css3圆角 IE6
id: 19
categories:
  - HTML5/CSS3
date: 2015-07-11 16:06:33
---

页中圆角应用时比较常见的，但css3的border-radius属性只有IE9才能支持，让人非常的恼火啊~~~现在给大家一解决方法~~

**第一步先加样式，我以行内样式说明：**
```css
<style type="text/css">
.yJ {
-moz-border-radius:4px; /* Firefox */
-webkit-border-radius:4px; /* Safari and Chrome */
border-radius:4px; /* Opera 10.5+, future browsers, and now also Internet Explorer 6+ using IE-CSS3 */
behavior: url(ie-css3.htc);
}
</style>
```
**第二步，还需要一个文件，记得放在服务器根目录，这个是下载地址 [ie-css3.zip](http://www.npm8.com/wp-content/uploads/2015/07/ie-css3.zip)**


**第三步，记得应用样式，有圆角的标签加上class=“yJ”；**

大功告成，感觉不错记得顶我~~
兼容主流浏览器，大家可以亲自测试，