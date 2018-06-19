---
title: IE6中文字溢出问题-多出文字
tags:
  - IE6文字溢出
id: 265
categories:
  - 前端兼容
date: 2015-07-13 14:09:24
---

页面代码：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "[<span style="color: black;">http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html</span>](http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd)<span style="color: black;">xmlns="</span>[<span style="color: black;">http://www.w3.org/1999/xhtml</span>](http://www.w3.org/1999/xhtml)<span style="color: black;">">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>多了一只猪</title>
</head>
<body>
<div style="width:400px">
<div style="float:left"></div>
<!-- -->
<div style="float:right;width:400px">↓这就是多出来的那只猪</div>
</div>
</body>
</html>
```

**1.IE6的BUG**

经测试，只有IE6中有文字溢出bug,ie7 8火狐正常。

**2.与浮动有关**

去除中的“float:left;”，你会发现多出来的“猪”字不见了，页面正常显示。同样去除中的“float:right;”，多余的“猪”字也同样消失，页面正常显示。

**3.与注释“<---->”的位置有关**

将注释转移到前面，多余的“猪”字消失，页面正常显示。将注释转移到↓这就是多出来的那只猪下面，多余的“猪”字也同样消失，页面正常显示。

**4.与固定宽度有关**

去除中的“width:400px”，多余的“猪”字消失，页面正常显示。

**5.溢出字数与注释条数有关**

增加注释的条数：当1条注释时，则多出来 1 个字；2 条注释时，则多出来 3 个字；3 条注释时，则多出来 5 个字……我们会从上面的规律中得到这样一个公式：溢出文字的字数=注释的条数 *2-1，这里的字数在中文或英文数字时都成立。当溢出的文字字数大于文本的字数时，文字区块将会消失。

**解决方法：**

a.不放置注释。最简单、最快捷的解决方法

b.注释不要放置于 2 个浮动的区块之间

c.将文字区块包含在新的 之间，如：
↓这就是多出来的那只猪

d.去除文字区块的固定宽度，与 3 有相似之处