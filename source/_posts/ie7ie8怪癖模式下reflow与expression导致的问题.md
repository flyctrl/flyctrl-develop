---
title: 'IE7,IE8怪癖模式下reflow与expression导致的问题'
tags:
  - expression
  - reflow
id: 236
categories:
  - 前端兼容
date: 2015-07-13 13:52:30
---

在一个项目中为遮蔽FLASH,在IE里的一些特定条件下进行了reflow. 另外,为支持IE6和IE7,IE8怪癖模式下的fixed,使用了CSS表达expression 导致了悲剧的出现... 看效果:
```html
<html>
<head>
<meta charset="utf-8" />
<title>test</title>
<style>
html{ background:url(about:blank) fixed;}
#d1{
zoom:expression(fix());
}
</style>
</head>
<body>
<div style ="width:60px;height:500px;border:solid 1px #000;background:#e2e2e2;position:absolute;" id="d1"></div>
<script>
var el = document.getElementById('d1')
function fix() {
el.style.top = document.body.scrollTop + 10 + 'px';
};
onscroll = function () {
document.body.style.zoom = 1;
document.body.style.zoom = null;
}
</script>
</body>
</html>
```

上面的例子, 在滚动条滚动的时候本身expression在执行,而reflow又触发了expression的执行,滚动条狂闪,忽大忽小.（IE7,IE8怪癖模式） 再看个更悲剧的...

```html
<html>
<head>
<meta charset="utf-8" />
<title>test</title>
<style>
html{ background:url(about:blank) fixed;}
#d1{
zoom:expression(fix());
}
</style>
</head>
<body>
<div style ="width:60px;height:500px;border:solid 1px #000;background:#e2e2e2;position:absolute;" id="d1"></div>
<script>
var el = document.getElementById('d1')
function fix() {
document.title = (document.title | 0) + 1;
//el.style.top = (document.documentElement || document.body);
rf();
};
var rf= function () {
document.body.style.zoom = 1;
document.body.style.zoom = null;
}
</script>
</body>
</html>
```

如果在expression执行的代码中有触发reflow的行为...而reflow又触发了expression...悲催的死循环出现了.如果两个问题混在一起搞......严重的甚至导致浏览器挂起。为此,我和我的兄弟Franky牺牲了将近2个小时.