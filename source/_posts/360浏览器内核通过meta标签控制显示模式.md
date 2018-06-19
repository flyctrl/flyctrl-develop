---
title: 如何让360、遨游、猎豹等双核浏览器默认以webkit内核渲染网页？
tags:
  - 360Meta控制显示模式
  - meta renderer
id: 1982
categories:
  - 前端杂货
date: 2015-12-22 23:46:33
---

## 前言
众知目前国内不少浏览器都自称双核，一般是 IE(Trident)+Webkit。因为 webkit 急速的体验和对 HTML5 的支持，有些情况下开发者可能希望用户优先甚至只使用 webkit 内核渲染，比如通过 Meta 标签来指定。然而目前还没有任何一个公认的标准来实现。大多数用户根本分不清浏览器双核之间的区别。所以把决定权交给开发者，以此给用户带来更好的浏览体验，不失为一件好事。

在这方面360就做的不错，我们也建议其它浏览器厂商一起支持这个实现。让这个控制标签成为行业标准。

在360内核控制meta标签说明文档中就有详细说明

## 背景介绍

由于众所周知的情况，国内的主流浏览器都是双核浏览器：基于Webkit内核用于常用网站的高速浏览。基于IE的内核用于兼容网银、旧版网站。以360的几款浏览器为例，我们优先通过Webkit内核渲染主流的网站，只有小量的网站通过IE内核渲染，以保证页面兼容。在过去很长一段时间里，我们主要的控制手段是一个几百k大小网址库，一个通过长期人工运营收集的网址库。
尽管我们努力通过用户反馈、代码标签智能判断技术提高浏览器的自动切核准确率。但是在很多情况下，我们仍然无法达到百份百正确。因此，我们新增加了一个控制手段：内核控制Meta标签。只要你在自己的网站里增加一个Meta标签，告诉360浏览器这个网址应该用哪个内核渲染，哪么360浏览器就会在读取到这个标签后，立即切换对应的内核。并将这个行为应用于这个二级域名下所有网址。
目前该功能已经在所有的360安全浏览器实现。我们也建议其它浏览器厂商一起支持这个实现。让这个控制标签成为行业标准。
## 代码示例
关于X-UA-Compatible的讲解，请看上一篇文章：[HTML Meta中添加X-UA-Compatible和IE=Edge,chrome=1的作用](http://www.npm8.com/?p=1978)

在head标签中添加一行代码：
```html
<meta name="renderer" content="webkit|ie-comp|ie-stand">
```
## 完美HTML代码：
```html
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<meta name="renderer" content="webkit">
</head>
<body>
</body>
</html>
```
content的取值为webkit,ie-comp,ie-stand之一，区分大小写，分别代表用webkit内核，IE兼容内核，IE标准内核。
若页面需默认用极速核，增加标签：
```html
<meta name="renderer" content="webkit">
```
若页面需默认用ie兼容内核，增加标签：
```html
<meta name="renderer" content="ie-comp">
```
若页面需默认用ie标准内核，增加标签：
```html
<meta name="renderer" content="ie-stand">
```
在实际使用中有人会发现已经添加
```html
<meta name="renderer" content="webkit">
```
为什么浏览器有时还是以IE内核渲染？这应该是浏览器的缓存问题，如果关闭浏览器之前的内核是IE，那么第一次打开还是以IE内核渲染，但刷新一下就变为极速模式了（webkit内核）

## 各渲染内核的技术细节
内核 | 文档模式 | HTML5支持 | ActiveX控件支持
------------ | ---------- | ---------- | ---------- | ----------
Webkit | Chrome21 | IE6/7 | IE9/IE10/IE11(取决于用户的IE)
IE兼容 | YESE | NO | YES
IE标准 | NO | YES | YES

## 各内核UA示例
![UAshili](http://www.npm8.com/wp-content/uploads/2015/12/UAshili-660x245.png)
## 备注
这个功能其实和IE9的X-UA-Compatible很类似，关于IE几个内核的实现介绍，请看：
[https://blogs.msdn.microsoft.com/ie/2010/06/16/ies-compatibility-features-for-site-developers/](https://blogs.msdn.microsoft.com/ie/2010/06/16/ies-compatibility-features-for-site-developers/)