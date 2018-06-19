---
title: CSS伪元素before、after妙用：制作时尚焦点图相框
tags:
  - css after
  - css before
id: 673
categories:
  - HTML5/CSS3
date: 2015-07-18 18:38:58
---

[![css-before-after](http://www.npm8.com/wp-content/uploads/2015/07/css-before-after.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/css-before-after.jpg)

&emsp;&emsp;在css标签中有这样子的标签`div:before`、`div:after`，对于before、after来说有部分人是相当陌生的，那么这两个标签是什么呢？有什么用处？
**:befor、:after是CSS的伪元素**，什么是伪元素呢？伪元素用于向某些选择器设置特殊效果。
我们用CSS手册可以查询到其基本的用法：

*   :before/::before 设置在对象前（依据对象树的逻辑结构）发生的内容。用来和content属性一起使用
*   :after/::after 设置在对象后（依据对象树的逻辑结构）发生的内容。用来和content属性一起使用
*   Ie6-7 不支持
既然说到了before、after，那么我们也要大概的了解下content，`content`用来和`:after`及`:before`伪元素一起使用，在对象前或后显示内容。

**基本的用法如下：**

```cssdiv:after{content:'任意字符串';}```
现在我们大概知道before和after的大概用法了，那么我们就可以在元素的内容之前或者之后插入新内容。而插入的内容我们也可以用css样式来加以控制和美化。也许在平常中这样子的标签用处不大，但是存在即是真理，哈哈，肯定有他的妙用之处，今天就来看看利用before和after制作的一个创意的时尚焦点图相框，以后制作这种边框线的时候我们可以完全抛弃图片的做法，而且做出来的非常的精美。

### 制作思路以及方法：

1、 在图片层加多一层div，设置1像素的边框线，边框线有上下左右四条边框，而我们想要的只是每两条边框线组成的类似小三角形的形状，那么我们只要把四条边框线的中间部分去掉，那不就实现了我们的效果。那我们应该怎么把四条边框线中间部分去掉？或者用什么东西把他盖住，不让他显示出来？解决办法就是，我们知道before和after伪元素可以在元素之前或者之后添加新的内容，那我们就利用这两个伪元素来盖住四条边框线的中间部分。

2、 我们先去掉左右两边的边框线，在边框层，利用before伪元素，使用css样式的定位，设置白色边框，为什么要白色的边框呢？因为要把之前的左右边框中间部分遮掉，颜色设置成和背景色（本例的背景为白色背景）一致，这样子看起来就相当于中间部分被裁剪掉了。

3、我们继续去掉上下两条边框线，方法同上，利用after伪元素，使用css样式的定位，设置为白色边框，遮掉上下边框线的中间部分。这样子一来，基本的形状就出现了

4、美化步骤，调整我们的细节，边框线调整为虚线。

了解了基本的思路和方法，是不是很简单呢？那我们就开始动手写代码吧。

### HTML代码：

```html
<div class="content">
<ul>
  <li><a href="http://www.npm8.com" target="_blank"><img src="jiawin_1.jpg" />
  <p class="focus"></p></a></li>
  <li><a href="http://www.npm8.com" target="_blank"><img src="jiawin_2.jpg" />
  <p class="focus"></p></a></li>
  <li><a href="http://www.npm8.com" target="_blank"><img src="jiawin_3.jpg" />
  <p class="focus"></p></a></li>
  <li id="noborder"><a href="http://www.npm8.com" target="_blank"><img src="jiawin_4.jpg" />
  <p class="focus"></p></a></li>
</ul>
</div>
```

### CSS样式代码

```css
.content {width:788px; margin:auto; height:auto; overflow:hidden; padding:30px; }
.content ul li {float:left; height:176px; border-right:1px solid #DDDDDD; position:relative; padding:10px;}
.focus {background:rgba(250,250,250,0.25); width:174px; height:174px; border:1px dashed #666; position:absolute; left:10px; top:10px; display:none;}
.focus:before {width:174px; height:134px; border-left:1px solid #fff; border-right:1px solid #fff; content:''; position:absolute; left:-1px; top:20px;}
.focus:after {width:134px; height:174px; border-top:1px solid #fff; border-bottom:1px solid #fff; content:''; position:absolute; top:-1px; left:20px;}
.content ul li:hover .focus {display:block;}
#noborder {border-right:0 none;}
```
&emsp;&emsp;通过这个例子是不是很方便的把这个效果做出来了呢？而且看看我们的代码，是不是很简洁呢！哈哈……或许还有更好的方法来实现，我们可以一起探讨。我个人感觉其实`div+css`是很好的一门很容易手上但是功能性很强的技术，而且他很好玩很有趣。利用你的奇思妙想， 你可以做出各种意想不到的效果。期待你的作品哦。

[DEMO演示](http://demo.grycheng.com/case/css-before-after/)

[点此下载](http://www.npm8.com/wp-content/uploads/2015/07/CSS-before-after.zip)

&nbsp;

&nbsp;