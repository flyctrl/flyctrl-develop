---
title: jquery图片预加载插件 neatshowjs
tags:
  - jq图片预加载
  - neatshowjs
id: 1188
categories:
  - 插件库
date: 2015-08-06 15:27:41
---

[![neatshow](http://www.npm8.com/wp-content/uploads/2015/08/neatshow-650x437.jpg)](http://www.npm8.com/wp-content/uploads/2015/08/neatshow.jpg)

neatShow.js是一个全新的能够控制图片加载方式的jquery插件，它能够让图片在加载过程中预先阻止它们的显示，直到加载完毕后将它们以一种非常平滑的渐变方式显示出来，采用这种方式加载图片可以在一定程度上提升网站的阅览体验，比如淘宝ued图片的加载方式就与此类似。

neatShow.js的使用方法也很简单，首先加载相应的neatshowjs脚本以及jquery库

默认情况下的用法

<script>$(selector).neatShow();</script>

将selector替换为对应的图片标签即可```<script>$('img').neatShow();</script>```

这种方法是对网站所有img标签起作用，如果你只想让一部分图片采用这种加载效果，例如只对类名为container内的img标签起作用可以这么写。

$(.container img).neatShow();
最后你还可以调整图片加载参数

```javascript
$('img').neatShow({speed: 'random', minSpeed: 400, maxSpeed: 4000});
```

&nbsp;
[neatShow.js官方地址](http://stevepapa.com/neatshowjs/)

[查看演示](http://demo.grycheng.com/case/neatshowjs/examples/default.html)[点击下载](http://www.npm8.com/wp-content/uploads/2015/08/neatshowjs.zip)
&nbsp;