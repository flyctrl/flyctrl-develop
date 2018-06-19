---
title: CSS3兼容IE的神器
tags:
  - css3兼容IE
id: 1387
categories:
  - 前端兼容
date: 2015-08-27 23:06:07
---

经过长久以来的不懈努力，我终于成功的将selectivizr与PIE这两个解决css3的利器进行了深度的整合，大大降低了使用难度

```html
<!--[if lte IE 9]><script src="/js/selectivizr.js"></script><![endif]-->
```

只要在你的页面上加入这一行代码，整个页面全部兼容css3，不要忘了将文件下载回来放进/js/文件夹
兼容圆角border-radius，盒阴影box-shadow、渐变色linear-gradient()，相对长度单位(rem vh vw vmax vmin)等

项目主页[http://gucong3000.github.io/selectivizr/](http://gucong3000.github.io/selectivizr/)

所有*.js、*.htc需要放进同一文件夹内 [打包下载](https://github.com/keithclark/selectivizr/archive/master.zip)

如需css3伪对象等选择符功能，只需加载任意一个你喜欢的js选择符引擎即可。支持[NWMatcher](http://javascript.nwbox.com/NWMatcher/)、 [MooTools](http://mootools.net/)、[jQuery](http://jquery.com/)等

注：如果本地运行静态文件正常，而php服务器环境下不正常，请添加此行到 .htaccess文件

```html
AddType text/x-component .htc
```
&nbsp;