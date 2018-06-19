---
title: border-radius 移动之伤
tags:
  - border-radius
id: 1544
categories:
  - 移动前端
date: 2015-09-06 23:36:20
---

`border-radius`我相信对于老一辈的前端们有着特殊的感情，在经历了没有圆角的蛮荒时代，到如今 CSS3 遍地开花，我们还是很幸福的。

然而即使到了三星大脸流行时代，`border-radius`在移动端的表现依旧差强人意，主要有以下几点问题：

## 一、Android 2.3 自带浏览器不支持 %

通常我们实现一个正圆只需要`border-radius: 50%`即可，大致代码如下：

```css
.foo {
 width: 100px;
 height: 100px;
 border-radius: 50%;
 border: 1px solid blue;
}
```
然而 Android 2.3 是不支持百分比的，要兼容我们只能使用一个较大值，比如`border-radius: 999px;`

## 二、Android 及 Safari 低版本 img 圆角问题

当 img 元素有border 时设置border-radius 会导致圆角变形，需要在img 外面嵌套一个元素并设置border 和border-radius。

[查看演示](http://demo.grycheng.com/case/wp-border-radius.html)

[![a](http://www.npm8.com/wp-content/uploads/2015/09/a1-650x488.jpg)](http://www.npm8.com/wp-content/uploads/2015/09/a1.jpg)

图一：左侧是小米2S（Android 4.1），右侧是红米（Android 4.2）

## 三、Android 4.2.x 背景色溢出及不支持 border-radius 缩写

### 3.1 Android 4.2.x 背景色溢出

测试发现，在 Android 4.2.x 系统自带浏览器中，同时设置`border-radius`和背景色的时候，背景色会溢出到圆角以外部分，需要是使用`background-clip: padding-box;`来修复，但是如果`border-color`为半透明时，背景直角部分依然会露出来（参见图一）。

[![b](http://www.npm8.com/wp-content/uploads/2015/09/b1.png)](http://www.npm8.com/wp-content/uploads/2015/09/b1.png)

### 3.2 Android 4.2.x 不支持`border-radius`缩写

这个 [BUG](https://bugs.dojotoolkit.org/ticket/17665)在小米上测试并未发现，国外有人反映三星 Galaxy S4 中自带浏览器不支持。

解决方案就是使用border-radius的四个**扩写**属性，缩写属性放到最后。

以上两个问题影响到 Android 4.2.x 内核的系统以及在其基础上定制的系统的自带浏览器，比如：红米，小米3，阿里云OS 等，安卓版 Chrome 不受影响。

完整代码应该是这样的：
```css
.foo {
 width: 100px;
 height: 100px;
 border: 5px solid blue;
 border-top-left-radius: 999px; /* 左上角 */
 border-top-right-radius: 999px; /* 右上角 */
 border-bottom-right-radius: 999px; /* 右下角 */
 border-bottom-left-radius: 999px; /* 左下角 */
 border-radius: 999px;
 background-color: #ccc;
 background-clip: padding-box;
}
```

## 四、其他问题

1.  IE9 中`fieldset`元素不支持`border-radius`。

2.  IE9 中带有背景渐变(gradient)的时候背景溢出。
全部 Demo 截图：

[![c](http://www.npm8.com/wp-content/uploads/2015/09/c-650x488.jpg)](http://www.npm8.com/wp-content/uploads/2015/09/c.jpg)