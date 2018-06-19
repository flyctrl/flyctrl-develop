---
title: 'table和div设置height:100%无效的完美解决方法'
tags:
  - 'height:100%;'
id: 257
categories:
  - 前端兼容
date: 2015-07-13 14:03:36
---

常出现这种情况：设置table和div的高height="100%"无效，使用CSS来设置height:"100%"也无效，为什么会这样呢？解决height:100%无效，table和div的解决方法并不相同。

首先说一下table，他比较容易解决，当我们使用Dreamweaver来制作网页，新建一张网页，通常在代码头部会有类似以下的代码：
`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
没错，你猜对了，问题就出在这里，你试着把这短代码删除，然后再刷新一下网页，你就会看到所有table以你的设置height="100%"的展示！

这段代码是告诉浏览器你的网页是遵循什么标准的，如上面的“W3C”标准，删除掉一般是不影响的。
下面说一下div，div和table一样，如果要实现width:100%是很容易的，但要div的height:"100%"，它就不大听话了，其实不是它不听话，是你不知道让它听话的方法。如下代码：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>测试</title>
</head>
<body>
<div style="height:100%"></div>
</body>
</html>
```
就算和Table一样去掉头部的那段代码也不能100%显示，原因很简单，你让div的height="100%"，执行网页时，css先执行到，而整个网页中的内容还没有完全载入，是获取不到div外面的`<body>`等的高度的，所以height="100%"也就不能如愿显示了。加上
body{height:100%}
就轻松解决啦，一开始就让body以100%显示，他的下级div自然就100%的，不过对于FF浏览器还应该把HTML也先给height:100%，即
html,body{height:100%}
这样div就听话了