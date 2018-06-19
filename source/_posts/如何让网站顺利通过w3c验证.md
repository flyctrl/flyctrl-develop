---
title: 如何让网站顺利通过W3C验证
tags:
  - w3c验证
id: 217
categories:
  - 前端杂货
date: 2015-07-12 22:02:06
---

1、官方的检查机制有些问题。背景色与字体色相同的情况下会有错误提示。这是不合理的检测报错机制。

2、图片的 alt="" 属性必须每张图片都加上，而且对齐属性用CSS来定义。不加不能通过XHTML 1.0的验证。

3、每个文档必须加上DTD声明。
```<!DOCTYPE html PUBLIC "-//W3C//DTDXHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">```
去掉后能通过验证，但有警告：No DOCTYPE found! Checking with default XHTML 1.0 Transitional Document Type.

4、RSS的XML通过时其中的域名地址必须与检测的地址一致，否则会报错。
因为有两个域名在使用，所以代码中曾经用[www.donzhi.com](http://www.donzhi.com/)，实际页面是[www.baidu.com](http://www.baidu.com/)，这样就出错了。

5、```<a>```标签的链接属性加上JAVASCRIPT事件时必须为#空链,不能为javascript:;或javascript:void(null);

6、在同一个页面当中，同名的ID会产生冲突。所以以ID定义样式的必须改成类引用。如果不用W3C来检测的话，在CSS设计里是允许这样做的。
那是程序的角度不能相同，CSS上是可以相同的！
之前就是相同的产生问题，后面就改成类引用了！
7、不可省略双引号或单引号。
这个是指属性，标准是双引号~
单引号也能通过验证。

8、标签之间不可错位嵌套。
```<div class="CaseDetaListSS">原文链接：<a href='/html/cases/cases_61.html'>798艺术区官方网站</div></a>```
这是不允许的。

9、所有的标签都使用小写。
```<div>ok<DIV>```
NO，提示错误为：
Line 56, Column 16: there is no attribute "class"
```<DIV class="CaseDetaListSS">原文链接：<a href='/html/cases/cases_61.html'>798艺术区```

10、FLASH的标签代码中不能含有```<embed>```,必须采用其它的方法实现。

11、所有的标签中含有的属性必须有值（官方的说法）。
这里说的意思是，如果应用到某个属性，这个属性就比如赋予值，比如width="12",不能在标签中出现width=""
但是对于```<img src="/UserFiles/cases/1225087801-jLThs.jpg" width="193" height="94" alt="" width=""/>```一样能通过W3C的验证来说，又矛盾了。

12、标签必须配对完成,单标签必须以/关闭。
```<br>no```
```<br />YES。并且<br/>```也能通过，但不规范。
养成好的习惯吧，即使开始的时候有点难，还记得我们上小学的时候，都用田字格来写字，规范我们的习惯后，我们就可以离开田字格写出漂亮的文字了。

13、JS和CSS外部引入文件必须加上类型定义。

```<script>CDFooter();</script>``` NO

```<script type="text/javascript">CDFooter();</script>``` YES

我在做程序员的时候经常性的为了省事，写成：```<script>CDFooter();</script>``` ，程序都没有任何问题，现在要我写规范，真不习惯。

14、所有的样式全部写在外部文件。用类名定义。在使用的地方引用。

看了这么多，你是否有写过不符合W3C标准的呢？但是，我不明白其中一点：

”FLASH的标签代码中不能含有```<embed>```,必须采用其它的方法实现。“我一般都用这个标签来出入flash的，没出现什么异常呀！是不是考虑到兼容性的问题呢？还是……大家发表下意见吧！