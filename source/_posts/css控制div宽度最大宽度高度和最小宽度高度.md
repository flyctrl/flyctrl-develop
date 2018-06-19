---
title: CSS控制div宽度最大宽度/高度和最小宽度/高度
id: 187
categories:
  - HTML5/CSS3
date: 2015-07-12 21:38:21
tags:
---

```css
/* 最小宽度 */
.min_width{min-width:300px;
/* sets max-width for IE */
_width:expression(document.body.clientWidth 600 ? "600px" : "auto");
}

/* 最小高度 */
.min_height{
min-height:200px;
/* sets min-height for IE */
_height:expression(this.scrollHeight 400 ? "400px" : "auto");
}

/* 最大最小宽度 */
.min_and_max_width{
min-width:300px;
max-width:600px;
/* sets min-width &amp; max-width for IE */
_width: expression(
document.body.clientWidth 600 ? "600px" : "auto")
);
}

/* 最大最小高度 */
.min_and_max_height{
min-height:200px;
max-height:400px;
/* sets min-height &amp; max-height for IE */
_height: expression(
this.scrollHeight 400 ? "400px" : "auto")
);
```

最小宽度可以随意设置 要看到上级的最大宽度是多少