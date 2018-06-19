---
title: css 左右两栏 左边固定右边自适应
tags:
  - 左右自适应
id: 314
categories:
  - HTML5/CSS3
date: 2015-07-13 15:27:52
---

两个div并排，左边为绝对宽度，右边为相对宽度，这个问题，我也经常遇到，我一般的处理方法是将最大的容器padding-left固定宽度，左边的固定宽度的一块position:absolute，然后right的一块width为百分百

今天学习到人家有三种解决方法，转载过来

两个div并排，很容易实现。如何让左边的div为固定宽度，右边的div为相对宽度呢？需要用到这种布局的情况比较多见，如左边为导航，右边为内容的页面。暂时想到了两种实现办法。

**方法一**，使用position:absolute。代码如下。
```html
body{ margin:0; height:100%}
html{ height:100%} /*兼容firefox的div高度100%*/
#left{ **position:absolute**; top:0; left:0; width:200px; height:100%; background-color:#CCCCCC}
#right{ **margin-left:200px**; height:100%; background-color:#0099FF}
</style>
<div id="left">left</div>
<div id="right">right</div>
```

这段代码主要涉及到以下两点点比较重要的：

（1）兼容firefox实现div高度100%；

（2）div绝对定位的妙用；在页面布局的时候，position:absolute如果灵活的应用，可以达到很好的效果。

**方法二** 使用float解决div左右布局，左为绝对宽度，右为相对宽度问题

```html
<style type="text/css">
body{ margin:0; height:100% }
html{ height:100% }
#left{ width:150px; height:100%; float:left; _margin-right:-3px; background-color: yellow }
#main{ height:100%; background-color: green }
</style>
<div align="left"><div id="left"></div>
<div id="main"></div></div>
<div align="left">
```

**方法三**，代码如下。方法二可能没有按照题目要求，但是可以达到一样的页面效果。主要是使用了div的float属性。
```html
<style>
body{ margin:0; height:100%}
html{ height:100%} /*兼容firefox的div高度100%*/
#left{ width:200px; height:100%; background-color:#CCCCCC; float:left}
#main{ width:100%; height:100%; background-color:#0099FF}
</style>
<div id="main">
<div id="left">left</div>
Right
</div></div>
```