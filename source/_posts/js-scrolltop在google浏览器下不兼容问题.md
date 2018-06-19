---
title: js scrollTop在GOOGLE浏览器下不兼容问题
tags:
  - scrolltop
id: 255
categories:
  - 前端兼容
date: 2015-07-13 14:02:56
---

解决方法1:
```javascript
var top = document.body.scrollTop | document.documentElement.scrollTop;
```

解决方法2:
```javascript
isCSS1 = /CSS1Compat/.test( document.compatMode ),
isWebkit = /webkit/ig.test( navigator.userAgent ),
wrap = isCSS1 &amp;&amp; !isWebkit  ? document.documentElement : document.body,
wrap.scrollTop....

```