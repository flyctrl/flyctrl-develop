---
title: 十个前端CSS3实用的动效库（工具）
tags:
  - CSS3动效库
id: 2344
categories:
  - 前端杂货
date: 2016-05-03 14:05:13
---

&emsp;&emsp;现在的网站和App的设计中**越来越重视用户体验**，而优秀的动效则能使你的应用更具交互性，从而吸引更多用户的使用。我一般会在网站中加入一些**简单而一致**的动效，我所用的技术则是用**[SASS](http://sass-lang.com/)+[bourbon](http://bourbon.io/)**来生成出那些基于CSS3的动画效果来。但如果你对CSS3中定义动效还不熟练，或希望采用更加简单直接的方式在你的应用中引入动效的话，你可以参考并使用下面的这10个优秀动效库（工具）。
&nbsp;

### 1\. [Animate.css](http://daneden.github.io/animate.css/)

&emsp;&emsp;Animate.css是我比较喜欢的一个CSS3动效库，非常适合那些对CSS3动画效果不熟悉，但又希望给自己所做的网站或基于H5的APP引入动效的朋友。因为，你只需要给需要实现动效的元素添加上Animate.css中预定义的那些动效名称就可以了。比如常见的：bounce，flash，fadeIn，fadeOut等等，加起来有75种不同的动效，完全能够满足你的基本需要了。
![CSS3动效库1](http://www.npm8.com/wp-content/uploads/2016/05/1-660x430.png)
&emsp;&emsp;当然对于这个库也有一些使用注意事项，比如你最好在给元素添加动效样式完成动效后，马上将这个动效样式去掉。另外，对于动效的时长，振动幅度等，你也需要做一些调整。因为，我感觉它默认设置中的动效过于快速和强烈了。Animate.css已经提供了详细的文档告诉你应该如何做这些调整。
&nbsp;

### 2\. [Bounce.js](http://bouncejs.com/)

&emsp;&emsp;Bounce.js是一个能够生成CSS3动效的小工具，它是用JavaScript编写的，提供了一个Web界面，你可以添加一个组件然后就可以选择包括Scale，Translate，Rotate，Skew这些动效类型，然后分别设置它们的参数，当达到你想要的效果后，你可以将这个动效以CSS的方式导出，这样你就可以将它应用到你的应用中了。
![CSS3动效库2](http://www.npm8.com/wp-content/uploads/2016/05/2-660x396.png)
&nbsp;

### 3\. [CSS3 Animation](http://css3gen.com/css3-animation/)

&emsp;&emsp;CSS3 Animation是一个非常简单易用的动效工具，你可以在它提供的简单图形界面里，通过拖拽一些进度条来控制你的动效，生成的CSS代码会自动显示在下面的一个文本框里，你可以拷贝粘贴到你的应用中直接使用。
![css3动画效果库3](http://www.npm8.com/wp-content/uploads/2016/05/3.png)
&nbsp;

### 4\. [CSS Animate](http://cssanimate.com/)

&emsp;&emsp;如果你觉得上面的工具还无法做出你想要的动效，那么可以看看CSS Animate这个工具。它能让你设置更多的动效参数，比如你可以同时设置动效起始和终止状态的坐标，大小，以及透明度，这样你就能够做出更加复杂的动效来。
![css3动效库4](http://www.npm8.com/wp-content/uploads/2016/05/4-660x512.png)
&nbsp;

### 5.[Magic Animations](http://www.minimamente.com/example/magic_animations/)

&emsp;&emsp;Magic Animations与Animate.css十分类似，也是一个预定义了一系列动效的CSS库。但与Animate.css的最大区别可能是，它定义的那些动效更炫也更酷一些，如果你的网站也很新潮，那可以考虑使用这个CSS动效库。
![css3动效库5](http://www.npm8.com/wp-content/uploads/2016/05/5-660x339.png)
&nbsp;

### 6.[AniJS](http://anijs.github.io/)

&emsp;&emsp;AniJS是一个通过JavaScript控制的动效库。它允许你通过它的链式语法来定义动效。比如下面这个例子：当用户点击时这个元素会沿Y轴翻转。
```html<div data-anijs="if: click, do: flipInY, to: .container-box"></div>```
![css3动效库6](http://www.npm8.com/wp-content/uploads/2016/05/6-660x298.png)
&nbsp;

### 7.[Single Element CSS Spinners](http://projects.lukehaas.me/css-loaders/)

&emsp;&emsp;我们经常会需要一些动效来表达系统处于加载或处理数据的过程中。Single Element CSS Spinners这个在GitHub上的项目，提供了一组非常漂亮的可用于加载的CSS3动效。
![css3动效库7](http://www.npm8.com/wp-content/uploads/2016/05/7-660x337.png)
&nbsp;

### 8.[Snabbt.js](http://daniel-lundin.github.io/snabbt.js/)

&emsp;&emsp;Sanbbt.js是我很喜欢的一个动效库，它非常小巧只有5K，所以可以被用在移动应用中。而且它也支持链式语法，你可以很方便地写出复杂的动效组合。
```javascript
snabbt(element, {
position: [200, 0, 0],
easing: function(value) {
return value + 0.3 * Math.sin(2*Math.PI * value);
}
}).snabbt({
position: [0, 0, 0],
easing: 'easeOut'
});
```
![css3动效库8](http://www.npm8.com/wp-content/uploads/2016/05/8-660x292.png)
&nbsp;

### 9.[Odometer](http://github.hubspot.com/odometer/docs/welcome/)

&emsp;&emsp;Odometer是用来给数字作动效的，比如通过它你可以很好地呈现网站人数的增加，倒计时等与数字相关的动画效果。
![css3动效库9](http://www.npm8.com/wp-content/uploads/2016/05/9-660x338.png)
&nbsp;

### 10.[Hover.css](http://ianlunn.github.io/Hover/)

&emsp;&emsp;Hover.css提供了大量的Hover效果，包括2D变换，图标变换，背景变换等等。而且几乎可以应用于所有元素，包括链接，按钮，logo，SVG甚至图片等等。
![css3动效库10](http://www.npm8.com/wp-content/uploads/2016/05/10-660x212.png)