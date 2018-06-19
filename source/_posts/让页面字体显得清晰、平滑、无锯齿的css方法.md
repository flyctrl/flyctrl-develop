---
title: 让页面字体显得清晰、平滑、无锯齿的CSS方法
tags:
  - '-moz-osx-font-smoothing'
  - '-webkit-font-smoothing'
  - 让页面字体显得平滑的CSS方法
  - 让页面字体显得无锯齿的CSS方法
  - 让页面字体显得清晰的CSS方法
id: 2501
categories:
  - HTML5/CSS3
date: 2016-09-18 16:32:57
---

&emsp;&emsp;近期遇到一个项目，对字体要求十分严格，字体不使用bloder，并且使字体看起来更清晰更平滑无锯齿，我对设计并不在行，对印刷排版也没有研究，但我知道什么字体好看，什么不好看。几年前我就看到过CSS里有一些属性很奇怪，当我设置这些属性或取消这些属性后，字体看起来会变得好看和不那么好看。这就是字体平滑设置的效果。但今天这里，只是介绍分享一下-webkit-font-smoothing它的基本用法：

**1、为了对比明显我就先将-webkit-font-smoothing设置为none，非常模糊。**

![-webkit-font-smoothing](http://www.npm8.com/wp-content/uploads/2016/09/a.png)

**2、将-webkit-font-smoothing设置为antialiased，变得非常平滑，效果非常不错。**

![-webkit-font-smoothing](http://www.npm8.com/wp-content/uploads/2016/09/b.png)

**3、其默认可以支持6个值（如图），暂时我能看到效果的就是三个：**

none | subpixel-antialiased | antialiased
其他的三个，我设置了，好像没什么变化。大家可以自己在控制台调试看看。

![-webkit-font-smoothing](http://www.npm8.com/wp-content/uploads/2016/09/c.png)
```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
在CSS里加入这些设置和不加这些设置，区别是很微妙的：
进行平滑设置的字体效果:
![-webkit-font-smoothing](http://www.npm8.com/wp-content/uploads/2016/09/d.jpg)

无进行平滑设置的字体效果:
![-webkit-font-smoothing](http://www.npm8.com/wp-content/uploads/2016/09/e.jpg)

&emsp;&emsp;区别并不是很大，但前者确实是看着更舒服，更柔和。下一次在设计你的网站显示样式时，可以尝试一下这些字体显示技术，也许会给你带来意想不到的效果！