---
title: Phaser中TextBox的运用
tags:
  - phaser TextBox
id: 1707
categories:
  - Phaser
date: 2015-09-21 14:40:19
---

使用Phaser有一段时间的,越来越喜欢这个游戏引擎，但是它不像egret那样有专业的公司和团队去维护，并提供大量的工具，所以Phaser没有那么多的工具，但是真的很好用。

在做游戏登录界面的时候，发现Phaser没有提供TextBox的控件，在官方的论坛进行搜索以后得到了如下的结论

![1](http://www.npm8.com/wp-content/uploads/2015/09/13.png)

大部分的情况都是采用DOM的方式来去实现textbox。
本文采用DOM的方式实现了可以自适应Phaser画布的TextBox，效果图如下：

![2](http://www.npm8.com/wp-content/uploads/2015/09/21.png)

2.创建一个名为HtmlTextBox.js的js文件

3.在该文件中定义function 
HtmlTextBox(game,x,y,width,height,text,style)，作为使用类

4.实现主要内容
```javascript
this.game = game;this.parentElement = game.canvas.parentNode;//创建一个inputElement
this.textBoxElement = document.createElement('input');
this.textBoxElement.style.position = 'absolute';
this.textBoxElement.style.left = x+'px';
this.textBoxElement.style.top = y+'px';
this.textBoxElement.style.width = width;
this.textBoxElement.style.height = height;
this.parentElement.insertBefore(this.textBoxElement,game.canvas);上述代码添加了一个html的input。
```

5.自适应屏幕

上述代码实现了update的时候，根据新的位置计算dom的位置和大小，从而自动适应了屏幕大小。

//更新函数，用来重新计算TextBox的位置
```javascript
HtmlTextBox.prototype.update  = function()
{
    var canvas = this.game.canvas;

    var canvasX = canvas.offsetLeft;
    var canvasY =  canvas.offsetTop;
    var canvasWidth = canvas.offsetWidth;
    var canvasHeight = canvas.offsetHeight;

    if(this.oldCanvasWidth == canvasWidth &amp;&amp; this.oldCanvasHeight == canvasHeight
        &amp;&amp; this.oldCanvasX == canvasX &amp;&amp; this.oldCanvasY == canvasY)return;

    var gameWidth = this.game.world.width;
    var gameHeight = this.game.world.height;

    var widthScanle = canvasWidth/gameWidth;
    var heightScanle = canvasHeight/gameHeight;

    var xScanle = this._x/gameWidth;
    var yScanle = this._y/gameHeight;

    var newX = canvasX + canvasWidth * xScanle;
    var newY = canvasY + canvasHeight * yScanle;
    var newWidth = this._width * widthScanle;
    var newHeight = this._height * heightScanle;

    this.setX(newX);
    this.setY(newY);
    this.setWidth(newWidth);
    this.setHeight(newHeight);
    this.oldCanvasWidth = canvasWidth;
    this.oldCanvasHeight = canvasHeight;
    this.oldCanvasX = canvasX;
    this.oldCanvasY = canvasY;
}
```
最后附上这个TextBox的完整的源码。

[HtmlTextBox.js](http://www.npm8.com/wp-content/uploads/2015/09/HtmlTextBox.js)