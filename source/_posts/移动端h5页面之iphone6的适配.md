---
title: 移动端H5页面之iphone6的适配
tags:
  - iphone6自适应
id: 415
categories:
  - 移动前端
date: 2015-07-15 10:08:09
---

&emsp;&emsp;iphone6 及 iphone 6 plus 已经出来一段时间了。很多移动端网站，以前写死body 为320px的，现在估计也忙着做适配了。

&emsp;&emsp;大屏幕手机其实一直有，只是以前大家没怎么重视，移动端的H5页面大部分都以320px为基准宽度进行布局，那些大屏屌丝android用户也懒得去理，而现在iphone也搞起多屏幕，老板们重视程度就不一样了。

&emsp;&emsp;回归正题，兼容iphone各版本机型最佳的方式就是**自适应**。

### 1、viewport 简单粗暴的方式：

```html
<meta name="viewport" content="width=320,maximum-scale=1.3,user-scalable=no">
```
直接设置viewport为320px的1.3倍，将页面放大1.3倍。

**为什么是1.3？**

&emsp;&emsp;目前大部分页面都是以320px为基准的布局，而iphone6的宽度比是375/320 = 1.171875，iphone6+则是 414/320 = 1.29375
那么以1.29倍也就约等于1.3了。

### 2、ip6+ 的CSS media query

```css
@media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){ /*iphone 6*/ } @media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){ /*iphone 6 plus*/ }
```
PS: 也可以直接使用实际的device-width：如`device-width : 375px`

在原有页面的基础上，再针对相应的屏幕大小单独写样式做适配。

### 3、REM布局

&emsp;&emsp;REM是CSS3新增的一种单位，并且移动端的支持度很高，android2.x+，ios5+ 都支持。
REM是相对于dom结构的根元素来设置大小，也就是html这个元素。相较于em单位，rem使用上更容易理解及运用。

REM与PX的换算可以查看网址：[https://offroadcode.com/prototypes/rem-calculator/](https://offroadcode.com/prototypes/rem-calculator/)

假设，html我们设置font-size:12px; 也就是说12px相对于1rem，那么18px也就是 18/12 = 1.5rem。

**那么我们以320px的设计布局为基准，将html设置为font-size:100px**，即100px = 1rem。(设置100px是为了方便计算)那么可以将大部分px单位除以100就可以直接改成rem单位了。

**REM如何做响应式布局？**

**1、如果仅仅是适配ip6+设备，那么使用media query就行。**
伪代码如下：
```css
/*320px布局*/
html{font-size: 100px;}
body{font-size: 0.14rem /*实际相当于14px*/}
/* iphone 6 */
@media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
html{font-size: 117.1875px;}
}
/* iphone6 plus */
@media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
html{font-size: 129.375px;}
}
```
这样，在ip6下，也就将页面内的元素放大了1.17倍，ip6+下也就是放大了1.29倍。

**2、如果是完全自适应，那么可以通过JS来控制。**
```javascript
(function (doc, win) {
var docEl = doc.documentElement,
resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
recalc = function () {
var clientWidth = docEl.clientWidth;
if (!clientWidth) return;
docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
};
// Abort if browser does not support addEventListener
if (!doc.addEventListener) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```
页面初始化的时候计算font-size，然后再绑定resize事件。这种效果就和百分比布局一样了。

**那么用REM做单位与百分比做单位有什么优势？**

&emsp;&emsp;主要优势在于能更好的控制元素大小。（一般百分比应用在布局层，一般常见设置为50%，33.3%，25%之类的整数居多，难以运用在复杂的页面小部件内）。
但是相比百分比布局，需要借助JS或media query实现，略有一点瑕疵。

### 4、图片自适应

&emsp;&emsp;刚说完REM布局，那么用百分比布局也能实现一样的效果，但是用百分比布局，必须要面临一个问题：**图片宽度100%，页面加载时会存在高度塌陷的问题。**.

如图：页面加载时图片高度默认不存在。

[![a](http://www.npm8.com/wp-content/uploads/2015/07/a1.png)](http://www.npm8.com/wp-content/uploads/2015/07/a1.png)

那么可以用padding-top设置百分比值来实现自适应。

公式如下：
```javascript
padding-top = (Image Height / Image Width) * 100%
```
**原理：padding-top值为百分比时，取值是是相对于宽度的。**

相关代码实现：

```css
.cover{position: relative; padding-top: 100%; height: 0; overflow: hidden;}
.cover img{position: absolute; top: 0; width: 100%;}
```

### 5、图片高清化

&emsp;&emsp;大家都知道，iphone6 plus 是3倍高清图了，它的devicePixelRatio = 3。 关于DPR的介绍可以查看这篇文章《[设备像素比devicePixelRatio简单介绍](http://www.npm8.com/?p=421)》

&emsp;&emsp;在ios8下，已经开始支持img的`srcset` 属性了（目前移动端也就ios8开始支持），也就是说，可以对一张图片设置2个URL，浏览器自动加载对应的图片。

支持程度如下：

[![b](http://www.npm8.com/wp-content/uploads/2015/07/b-650x231.png)](http://www.npm8.com/wp-content/uploads/2015/07/b.png)

**黄色表示仅支持旧的srcset规范，绿色表示支持全新的srcset规范，包括sizes属性，w描述符。** 这里不展开，详细了解可自行google。

如下DEMO，请切换devicePixelRatio值进行查看：

[![c](http://www.npm8.com/wp-content/uploads/2015/07/c.png)](http://www.npm8.com/wp-content/uploads/2015/07/c.png)

不过目前前端这边图片的实现基本都用lazyload的方式实现。srcset的图片加载方式在实际项目中运用还比较少。

### 6、背景图高清化

**media query 实现高清化**

&emsp;&emsp;img标签的高清化，可以通过JS判断devicePixelRatio的值来加载不同尺寸的图片，但是对于背景图，写在CSS中的，用JS来判断就略麻烦了，还好CSS通过media query也能判断dpr。

&emsp;&emsp;目前兼容性最好的背景图高清化实现方式，使用media query的`-webkit-min-device-pixel-ratio`做判断：
```css
/* 普通显示屏(设备像素比例小于等于1)使用1倍的图 */
.css{
background-image: url(img_1x.png);
}
/* 高清显示屏(设备像素比例大于等于2)使用2倍图 */
@media only screen and (-webkit-min-device-pixel-ratio:2){
.css{
background-image: url(img_2x.png);
}
}
/* 高清显示屏(设备像素比例大于等于3)使用3倍图 */
@media only screen and (-webkit-min-device-pixel-ratio:3){
.css{
background-image: url(img_3x.png);
}
}
```
**进一步，可以通过工具生成相应的3x，2x，1x的图片及css，在使用时直接引用即可。谁搞一个？**

关于移动设备的`-webkit-min-device-pixel-ratio`值，可以查看该网页的整理：[http://bjango.com/articles/min-device-pixel-ratio/](http://bjango.com/articles/min-device-pixel-ratio/)

**image-set 实现高清化**

image-set，它是Webkit的私有属性，也是Css4的一个属性，它是为了解决Retina屏幕下的图像显示而生。

使用方式也很简单。伪代码如下：
```css
.css {
background-image: url(1x.png); /*不支持image-set的情况下显示*/
background: -webkit-image-set(
url(1x.png) 1x,/* 支持image-set的浏览器的[普通屏幕]下 */
url(2x.png) 2x,/* 支持image-set的浏览器的[2倍Retina屏幕] */
url(3x.png) 3x/* 支持image-set的浏览器的[3倍Retina屏幕] */
);
}
```
目前移动端的支持程度来看，ios7+，android 4.4+ 下已经支持了。如果仅仅是做ip6+的高清适配方案。`image-set`也是一种实现方案。

**使用image-set 与 media query 实现有什么区别及好处？**

这篇文章里面做了很详细的阐述，大家可以看看：[http://blog.cloudfour.com/safari-6-and-chrome-21-add-image-set-to-support-retina-images/](http://blog.cloudfour.com/safari-6-and-chrome-21-add-image-set-to-support-retina-images/)

&emsp;&emsp;大体的意思是：image-set不需要告诉浏览器使用什么图像，而是直接提供了图像让浏览器选择。这就意味着，如果在低网速下，浏览器可以选择加载低分辨率的图片。（PS：好智能的样子）

&emsp;&emsp;但是相比如media query的实现，image-set仅支持单个图片的高清化，不适合在css sprite下使用。 并且兼容性也是一大硬伤。

**但是一般来说，用在LOGO区域，单个图片图标的区域下，也是个不错的选择。**

### 7、图片列表的自适应

&emsp;&emsp;关于适配，也就是要让布局更灵活，在电商网站里面，商品列表是一个非常常见的结构。

一种比较智能的列表方式是：**两端对齐，间距自适应。**

&emsp;&emsp;那么可以使用FLEXBOX布局来实现两端对齐的效果，也可以使用`text-align:justify`的方式实现。

&emsp;&emsp;先看个flex实现的例子，主要通过`justify-content:space-between`，来实现：

&emsp;&emsp;flexbox的布局方式，在PC端就不合适了，ie9以下都不支持，那么更友好的方式可以使用`text-align:justify`来实现，兼容各大主流浏览器，包括IE6。

详情请移步我以前写的博文：《[inline-block + justify实现列表两端对齐](http://www.npm8.com/?p=426)》

&emsp;&emsp;但是这2种布局方式都有一定的局限性。就是列表个数必须凑整。目前还没找到一种能够兼容不限个数的实现方案，如果各位看官有更好的实现方式，也欢迎提出，一起交流。

### 总结

&emsp;&emsp;移动端ip6的适配方案有很多，没有固定的套路及方法，请根据自身业务的特点，选择其中的一些方法组合使用。

&nbsp;