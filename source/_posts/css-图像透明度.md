---
title: CSS 图像透明度
tags:
  - 图像透明
id: 166
categories:
  - HTML5/CSS3
date: 2015-07-12 21:23:38
---

定义透明效果的 CSS3 属性是 opacity
```css
.transparent_class {
filter:alpha(opacity=50);
-moz-opacity:0.5;
-khtml-opacity: 0.5;
opacity: 0.5;
    
}
```

*   **opacity: 0.5;** 这是最重要的，因为它是CSS标准.该属性支持Firefox, Safari和 Opera.
*   
*   **filter:alpha(opacity=50);** 这个是为IE6设的，可取值在0-100，其它三个0到1.
*   
*   **-moz-opacity:0.5;** 这个是为了支持一些老版本的Mozilla浏览器。
*   
*   **-khtml-opacity: 0.5;** 这个为了支持一些老版本的Safari浏览器。
```css
img{opacity:0.4;filter:alpha(opacity=40);

hover:img{opacity:0.4;filter:alpha(opacity=40);

/* 针对 IE8 以及更早的版本 */
img:hover{opacity:1.0;filter:alpha(opacity=100)};
```

对应的 CSS 是：opacity=1。

IE8 以及更早的浏览器：filter:alpha(opacity=100)。