---
title: 理解事件捕获，在限制范围内拖拽div+吸附+事件捕获
tags:
  - js事件捕获
  - js限制范围内吸附
  - js限制范围内拖拽
id: 1753
categories:
  - JS/Jq
date: 2015-09-22 23:16:48
---

### 一、实现的效果是在限制范围内拖拽div+吸附+事件捕获。

&emsp;&emsp;这里需要理解的是事件捕获，这个事件捕获也是为了兼容div在拖拽过程中，文本不被选中这个问题。

如此良辰美景，拖拽也可以很洒脱哈。先看看图

![1](http://www.npm8.com/wp-content/uploads/2015/09/16.png)

### 二、一步步的实现这个拖拽过程的几个要求

**（一）拖拽起来**

![2](http://www.npm8.com/wp-content/uploads/2015/09/24.png)

里面的边框是表示页面哦（我们的屏幕所能看到的东东）。

**获取移动距离的思路：**

&emsp;&emsp;记录鼠标按下和鼠标抬起两次的坐标，然后相减，再加上div跟边缘之间的间距。就得到移动距离。

&emsp;&emsp;之前我也在这里困惑了，不明白为什么还要再加上offsetLeft。原因就是clientX获取到的是数值是不加上div跟边缘的距离，不是marin，也不是padding，而是浏览器渲染的问题。

==下面是我自己的理解：==

终于明白这个移动距离是如何计算出来的：

&emsp;&emsp;将式子化简之后，得到的就是移动后的Div  clientX-移动前clientX，然后再加上offsetLeft，因为这个clientX是没有把边缘计算下去，为了获取准确的数值，要把浏览器默认的边缘计算下去。

&emsp;&emsp;如图所以：鼠标移动过的距离就是我用红色画出部分再加上div跟边缘之间的offsetLeft（X轴方向）和offsetTop（Y轴方向）。

&emsp;如果上面式子不好理解，就把他化简之后来看，就明白了。

距离获取完成，
现在就可以通过鼠标的三个事件onmousedown、onmousemove、onmouseup来拖拽鼠标。当鼠标移动时，就不断地更改div的left和top属性
```javascript
oDiv2.style.left = l +'px';
Div2.style.top = t +'px';
```
最后，当鼠标抬起时，要释放onmousedown和onmousemove事件。
```javascript
this.onmousedown = null;
this.onmousemove = null;
```
**（二）边缘吸附**

边缘吸附的原理so easy。

&emsp;&emsp;给一个判断条件，当div运动到距离上下左右边缘的距离小于某一个值时，这时就把left和top的值更改为边缘的值。这样div就贴到边缘上去。
```javascript
var l1= oDiv1.offsetWidth - oDiv2.offsetWidth; //限制小div在大div中拖拽,计算能拖拽的max距离
var t1 = oDiv1.offsetHeight - oDiv2.offsetHeight;
if(l > l1-50)
{
l = l1;
}
if(l < 50)
{
l = 0;
}
if(t > t1-50)
{
t = t1;
}
if(t < 50)
{
t = 0;
}
```
**（三）拖拽过程不被文字选中**

&emsp;&emsp;div在拖拽过程中，在div中的文本文字总是会被选中，为了解决这个问题，要使用一个叫做事件捕获的知识。

1、先理解一下什么是事件捕获

![3](http://www.npm8.com/wp-content/uploads/2015/09/32.png)

是跟事件冒泡相反的一种模型。事件捕获的是最后获得事件的是最小的子元素。事件冒泡最后获得事件的是父元素。

&emsp;&emsp;之所以在拖拽过程中，div中的文字会被选中就是因为我没有处理好事件冒泡的问题。要解决这个问题，解铃还须系铃人，就把事件冒泡的问题处理好久ok。
```javascript
if(oDiv2.setCapture) //IE
{
document.onmousemove = moveFn;
document.onmouseup = upFn;

oDiv2.setCapture(); //事件捕获后，所有事件都集中到这个div

return false; //FF、Chrome、IE9
}else //FF、chrome
{
document.onmousemove = moveFn; //！！！！根源所在，在优化版1中，设置为oDiv2.onmousemove时拖拽一次后无法再拖拽
document.onmouseup = upFn;
}
```
**记得事件捕获后，当鼠标抬起时，也好释放**

oDiv2.releaseCapture();

### 三、div拖拽的详细代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>限制范围内拖拽</title>
<style>
*
{
margin: 0;
padding: 0;
}
#div1
{
width: 500px;
height: 500px;
background: #CCC;
position: relative;
}
#div2
{
width: 100px;
height: 100px;
background: green;
position: absolute;
left: 0;
top: 0;
}
</style>
<script>
window.onload = function()
{
var oDiv1 = document.getElementById('div1');
var oDiv2 = document.getElementById('div2');

var disX,disY;
/*--------------开始拖拽div2-----------------*/
oDiv2.onmousedown = function(evt) //oDiv2.onmousedown表示按下这个对象，， document.onmouseup整个文档对象(这里把div改成document是防止弄丢div)
{
var oEvent = evt || window.event; //evt兼容FF/Chrome

disX = oEvent.clientX - oDiv2.offsetLeft; //-oDiv2.offsetLeft的距离是为了减去div与视口边框的距离
disY = oEvent.clientY - oDiv2.offsetTop;

if(oDiv2.setCapture) //IE
{
document.onmousemove = moveFn;
document.onmouseup = upFn;

oDiv2.setCapture(); //事件捕获后，所有事件都集中到这个div

return false; //FF、Chrome、IE9
}else //FF、chrome
{
document.onmousemove = moveFn; //！！！！根源所在，在优化版1中，设置为oDiv2.onmousemove时拖拽一次后无法再拖拽
document.onmouseup = upFn;
}

function moveFn(evt) //把document重新改为div，利用setCapture事件捕获，把事件都集中在一个物体上
{
var oEvent = evt || window.event;
var l = oEvent.clientX - disX; //计算鼠标移过的距离
var t = oEvent.clientY - disY;

var l1= oDiv1.offsetWidth - oDiv2.offsetWidth; //限制小div在大div中拖拽,计算能拖拽的max距离
var t1 = oDiv1.offsetHeight - oDiv2.offsetHeight;
if(l > l1-50)
{
l = l1;
}
if(l < 50)
{
l = 0;
}
if(t > t1-50)
{
t = t1;
}
if(t < 50)
{
t = 0;
}

oDiv2.style.left = l +'px';
oDiv2.style.top = t +'px';
}

function upFn()
{
this.onmousedown = null;
this.onmousemove = null;

if(oDiv2.releaseCapture) //如果事件捕获存在，则释放事件捕获
{
oDiv2.releaseCapture();
}
}

return false; //阻止浏览器默认事件
};
};
</script>
</head>
<body>
<div id="div1">使用了事件捕获后，现在拖拽div中的问题可不应该被选中了哦</div>
<div id="div2">helloworld helloworld</div>
</body>
</html>
```