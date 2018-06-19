---
title: javascript div 遮罩层封锁整个页面
tags:
  - js遮罩层
id: 124
categories:
  - JS/Jq
date: 2015-07-12 18:26:53
---

在客户端浏览器中，可以在某个时机使用javascript把一个div作为遮罩层，来封锁整个页面。

具体解决方案如下：

一、IE和FF下document.body对象的clientHeight，offsetHeight，scrollHeight属性的差别。

clientHeight

在IE和FF下，该属性没什么差别，都是指浏览器的可视区域，即除去浏览器的那些工具栏状态栏剩下的页面展示空间的高度。

offsetHeight

在IE下，offsetHeight也是浏览器可视区域的高（包括边线）

在FF下，offsetHeight是页面具体内容的高度

scrollHeight

在IE下，scrollHeight 是页面具体内容的高度，可以小于clientHeight

在FF下，scrollHeight 是网页内容高度，不过最小值是clientHeight

**二、下面是跨浏览器取得当前页面的高度的解决方法。**

代码如下:
```javascript
function getPageSize()
{
var body = document.documentElement；
var bodyOffsetWidth = 0;
var bodyOffsetHeight = 0;
var bodyScrollWidth = 0;
var bodyScrollHeight = 0;
var pageDimensions = [0,0];
pageDimensions[0]=body.clientHeight;
pageDimensions[1]=body.clientWidth;
bodyOffsetWidth=body.offsetWidth;
bodyOffsetHeight=body.offsetHeight;
bodyScrollWidth=body.scrollWidth;
bodyScrollHeight=body.scrollHeight;
if(bodyOffsetHeight > pageDimensions[0])
{
pageDimensions[0]=bodyOffsetHeight;
}
if(bodyOffsetWidth > pageDimensions[1])
{
pageDimensions[1]=bodyOffsetWidth;
}
if(bodyScrollHeight > pageDimensions[0])
{
pageDimensions[0]=bodyScrollHeight;
}
if(bodyScrollWidth > pageDimensions[1])
{
pageDimensions[1]=bodyScrollWidth;
}
return pageDimensions;
}
```
**三、页面上必须放置一个div，作为遮罩层，下面是这个遮罩层的css样式。**
代码如下:
```css
.lockDiv
{
position:absolute;
left:0;
top:0;
height:0;
width:0;
border:2 solid red;
display:none;
text-align:center;
background-color:#DBDBDB;
filter:Alpha(opacity=60);
}
```
**四、在客户端使用下面的javascript用遮罩层将整个页面封闭。**

代码如下:
```javascript
var sandglassSpan = 1;
var timeHdl;
function DisablePage()
{
var ctrlSandglass = document.getElementById("divSandglass");
if(sandglassSpan==0)
{
window.clearTimeout(timeHdl);
ctrlSandglass.style.display = "none";
document.body.style.cursor = 'auto';
sandglassSpan = 1;
}
else
{
document.body.style.cursor = 'wait';
var pageDimensions = getPageSize();
ctrlSandglass.style.top = 0;
ctrlSandglass.style.left = 0;
ctrlSandglass.style.height = pageDimensions[0];
ctrlSandglass.style.width = pageDimensions[1];
ctrlSandglass.style.display = "block";
timeHdl = window.setTimeout(DisablePage,200);
}
}
```
**五、如果页面上使用了ASP.net的Validator控件，那么应该使用如下的javascript。**
代码如下:
```javascript
var sandglassSpan = 1;
var timeHdl;
function DisablePageHaveValidator()
{
var ctrlSandglass = document.getElementById("divSandglass");
if(false == Page_IsValid)
{
sandglassSpan = 0;
}
if(sandglassSpan==0)
{
window.clearTimeout(timeHdl);
ctrlSandglass.style.display = "none";
document.body.style.cursor = 'auto';
sandglassSpan = 1;
}
else
{
document.body.style.cursor = 'wait';
ctrlSandglass.style.display = "block";
var pageDimensions = getPageSize();
ctrlSandglass.style.top = 0;
ctrlSandglass.style.left = 0;
ctrlSandglass.style.height = pageDimensions[0];
ctrlSandglass.style.width = pageDimensions[1];
timeHdl = window.setTimeout(DisablePageHaveValidator, 200);
}
}
```
六、DisablePage和DisablePageHaveValidator这两个方法可以在按钮的onclick事件或其它时机调用。