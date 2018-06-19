---
title: 多屏复杂动画CSS技巧三则
tags:
  - 多屏复杂动画
id: 433
categories:
  - HTML5/CSS3
date: 2015-07-15 13:08:36
---

[![1](http://www.npm8.com/wp-content/uploads/2015/07/15.png)](http://www.npm8.com/wp-content/uploads/2015/07/15.png)

&emsp;&emsp;当下CSS3应用已经相当广泛，其中重要成员之一就是CSS3动画。并且，随着CSS动画的逐渐深入与普及，更复杂与细腻的动画场景也如雨后春笋般破土而出。例如「企业QQ-新年祝福」活动：

[![dd](http://www.npm8.com/wp-content/uploads/2015/07/dd1.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/dd1.jpg)

&emsp;&emsp;感谢shirley帮忙录制上面的视频，虽然视频内容是手机上的显示效果，但是，这个“企业新年祝福活动”原本只针对桌面端，移动端是后来辅助增强（增加了相当于活动页面UV 5.7%的点击）。而目前大多数类似页面只针对移动端，例如其他同事实现的QQ空间5.0预约页第二版：

[![2](http://www.npm8.com/wp-content/uploads/2015/07/21.gif)](http://www.npm8.com/wp-content/uploads/2015/07/21.gif)

扫码(需登录)或者链接二选一：

[![经验分享：多屏复杂动画CSS技巧三则](http://isux.tencent.com/wp-content/uploads/2015/03/20150309180730154.png)](http://isux.tencent.com/wp-content/uploads/2015/03/20150309180730154.png)

[访问demo戳这里](http://qzs.qq.com/qzone/qzact/act/qzapp/qzone5.0/mobile/index.html)

&emsp;&emsp;因此，需要多一点适配的技巧。但是，对于动画效果实现，其实都是一脉相承的，最终的实现需要很多点滴积累，我这里讲三个部分同学可能不知道的相关CSS技巧。

注：示例代码的私有前缀均省略，大家自行脑补

## 技巧一、使用animation-play-state控制每屏动画播放

**1\. 类名active与动画触发**

首先，使用`active`触发每一屏的动画，几乎已经约定俗成，应该也建议成为默认的行业规范。

一般做法是，当对应一屏内容进入的时候，使用JS给容器添加类名`active`:
```javascriptcontainer.classList.add("active");```
如果你做的动画逼格较高，希望每次浏览这一屏内容的时候，动画都走一遍，可以使用reflow重新触发一下`animation`:
```javascript
container.classList.remove("active");
container.offsetWidth = container.offsetWidth;
container.classList.add("active");
```
**2\. 类名active与动画控制技巧**

&emsp;&emsp;如何具体控制动画的播放呢？我们通常第一反应是使用下面的方法实现，动画的完整CSS代码在active状态下呈现，如：
```css
.element1 { /* 尺寸与定位 */ }
.element2 { /* 尺寸与定位 */ }
.element3 { /* 尺寸与定位 */ }
...

.active .element1 { animate: name1 1s; }
.active .element2 { animate: name2 1s; }
.active .element3 { animate: name2 1s; }
...
```
&emsp;&emsp;从实现和功能上将，上面方法是很不错的，通俗易懂，不易犯错。不过我个人更喜欢使用配合CSS3的`animation-play-state`属性对每屏动画进行控制，实现如下：

1.  动画相关CSS代码直接写在元素上：
```css.element1 { /* 尺寸与定位 */ animate: name1 1s; }
.element2 { /* 尺寸与定位 */ animate: name2 1s; }
.element3 { /* 尺寸与定位 */ animate: name3 1s; }
...
```

2.  创建一个类名，如`.animate`，凡是使用到了`animation`动画的元素都添加这个类名；
3.  如下CSS代码：
```css
.animate {
    animation-play-state: paused;
}
.active .animate {
    animation-play-state: running;
}
```
之所以个人更喜欢后面的方法，是因为有一种“无侵入”的感觉，代码层次清晰，控制关系明确。有利于后期的维护与扩展。

然而，使用`animation-play-state`还是有些需要注意的，对于IE10/IE11浏览器，`animation-play-state`是不能简写的。如：
```css
.element { animate: shake 4s 2s both infinite paused; }
```
只会让整个CSS声明挂掉的！如下写法支持：
```css
.element {
    animate: shake 4s 2s both infinite;
    animation-play-state: paused;
}
```
有人可能要奇怪了，怎么突然IE浏览器乱入了？ ![经验分享：多屏复杂动画CSS技巧三则](http://mat1.gtimg.com/www/mb/images/face/32.gif)

首先，我们不能无视主流手机之Windows Phone. 其次，帅气的翻屏动画并不是移动端专有，桌面端也适用。稍稍用力，桌面移动全适配，何乐而不为！

## 技巧二、不同状态下的连续动画

有时候，动画可能不是一波流，分状态。

例如，我们的小火箭，先是淡出动画，然后无限上下悬浮。怎么实现呢？

[![3](http://www.npm8.com/wp-content/uploads/2015/07/31.png)](http://www.npm8.com/wp-content/uploads/2015/07/31.png)

关键点就是动画分解与延时。

&emsp;&emsp;据我所知，没办法只使用一个`keyframes`关键帧声明就实现这个效果，因为，这里有动画状态的变化：一个只执行一次的动画和一个无限循环动画。

怎么办？我们可以将动画分解，写2个`animation` `keyframes`动画关键帧描述。
```css
@keyframes fadeIn { /* ... */ }
@keyframes float { /* ... */ }
```
然后，再分别应用这些关键帧动画。如何应用呢？有2个小技巧：

**1\. 逗号与多animation动画值**

如下：
```html
<div class="element">小火箭</div>

.element { animation: fadeIn 1s, float .5s 1s infinite; }
/* 我淡出, 需要1秒；我1秒后开始无限漂浮 */
```
&emsp;&emsp;其中`float .5s 1s infinite`这里的`1s`就是无限漂浮动画执行延迟的时间，于是，两个动画完美配合，感觉就像是一个动画。实际上，就是一个动画，所有CSS3 animation动画走同一个UI线程，这也是为何推荐使用CSS实现动画效果的原因。

此写法没有兼容性问题，大家可以开开心心地使用。

**2\. 标签嵌套与独立动画**

我们还可以通过嵌套标签的形式实现连续动画，例如：
```html
<div class="element-wrap"><div class="element">小火箭</div></div>

.element-wrap { animation: fadeIn 1s; }
/* 我淡出, 需要1秒 */
.element { animation: float .5s 1s infinite; }
/* 我1秒后开始无限漂浮 */
```
&emsp;&emsp;有人可能会奇怪了。`animation`本身就支持多动画并行，你还搞个标签嵌套，没有任何使用的理由啊！没错，单纯看我们这个例子，确实是这样。但是：

**① 提取公用动画**

&emsp;&emsp;这类多屏动画是有N多元素同时执行不同的动画。比方说，火箭是淡出，然后上下漂浮；火箭的火焰是淡出，然后大小变化；黑洞是淡出，然后左右随波。你如何实现？

如果纯粹借助`animation`语法，应该是：
```css
.element1 { animation: fadeIn 1s, float .5s 1s infinite; }
/* 我淡出, 需要1秒；我1秒后开始无限漂浮 */
.element2 { animation: fadeIn 1s, size .5s 1s infinite; }
/* 我淡出, 需要1秒；我1秒后开始大小变化 */
.element3 { animation: fadeIn 1s, move .5s 1s infinite; }
/* 我淡出, 需要1秒；我1秒后开始左右移动 */
```
可以看到，淡出是公用的动画效果，我们可以借助嵌套标签，实现公用语法的合并，方面后期维护：
```css
.element-wrap { animation: fadeIn 1s; }
/* 大家都1秒淡出 */
.element1 { animation: float .5s 1s infinite; }
/* 我1秒后无限漂浮 */
.element2 { animation: size .5s 1s infinite; }
/* 我1秒后忽大忽小 */
.element3 { animation: move .5s 1s infinite; }
/* 我1秒后左右移动 */
```
**②避免变换冲突**

&emsp;&emsp;有个元素动画是边360度旋转、边放大(从0放大到100%)，像这种具有典型特征的动画我们显然要独立提取与公用的：
```css
@keyframes spin { /* transform: rotate... */ }
@keyframes zoomIn { /* transform: scale... */ }
```
好了，现在问题来了，变放大边旋转：
```css
.element { animation: spin 1s, zoomIn 1s; }
/* 旋转：啊，完蛋啦，我被放大覆盖啦！ */
```
&emsp;&emsp;由于都是使用transform, 发生了残忍的覆盖。当然，有好事的人会说，你使用`zoom`不就好了！确实，如果只是移动端，使用`zoom`确实棒棒哒！但是，我们这个企业活动，PC是主战场，因此，FireFox浏览器（FF不识zoom）是不能无视的。

怎么办？重新建一个名为`spinZoomIn`的动画关键帧描述还是？

对啊，你直接外面套一层标签不就万事大吉了
```css
.element-wrap { animation: spin 1s; }   /* 我转转转 */
.element { animation: zoomIn 1s; }      /* 我大大大 */
```

## 技巧三、无侵入定位和居中定位准则
1\. 这里的“**无侵入定位**”指不受`animation`影响的元素定位，包含两部分：一是不使用`keyframes`关键帧决定初始位置；二是不要使用`keyframes`中出现的属性定位。

**①. 不使用`keyframes`决定初始位置**

&emsp;&emsp;应该都知道，CSS3 `animation`的`fill-mode`可以决定元素动画结束前后的位置，也就是也具有定位的作用。此时，可能就会有小伙伴，故作聪明，利用`animation` `keyframes` `0% {}`或`form {}`去做定位，貌似，还省了写代码。看上去很赞，实际上狭隘了，这对于对`animation`支持不佳或不支持的浏览器实际上是不友好的，例如Android2.3不支持`animation-fill-mode`, IE6-IE9不支持CSS3 `animation`，于是乎，当遭遇这些浏览器的时候，页面动画元素的布局实际上是毁掉的。所以，这些动画元素定位的时候，需要使用“无侵入定位”，也就是，就算页面没有`animation`, 我也是个“标致人儿”。

**②. 不使用`keyframes`中出现的属性定位**

&emsp;&emsp;举个例子，有个球，正好定位在模块的中心，同时有个无限旋转效果。使用`transform: translate(-50%,-50%)`居中定位再合适不过了，不用我心里难受，于是，使用了`transform`定位。此时，冲突发生，旋转动画也是需要`transform`变换的。
```css
@keyframes spin {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
}
```
要么使用业界约定俗成`spin`覆盖，要么另起炉灶没法重用：
```css
@keyframes spin-trans {
    0% { transform: rotate(0) translate(-50%,-50%); }
    100% { transform: rotate(360deg) translate(-50%,-50%); }
}
```
显然，都是不合适的。建议使用传统`left/top/margin`进行定位，与`transform`变换动画“无侵入”。

2\. 这里的“**居中定位准则**”包含两部分：一是元素定位在容器中间位置；二是元素的定位方式为居中定位。

**①. 元素定位在容器中间**
容器以及容器内的动画元素可以看成是一个动画模块，为了这个模块可以轻松驾驭水平布局和垂直局部，里面的动画元素形成的整体一定要在容器的中间，不要被设计稿或周围环境影响。

举个简单例子，本文一开始展示的「企业QQ-新年祝福」活动。

&emsp;&emsp;企业产品用户特点比较鲜明：一是访问主要集中在桌面端，二是有70~80%用户使用的是webkit/blink内核浏览器。所以，大家可以理解为何设计稿明明针对桌面端，却有如此多细腻的动画设计了。

&emsp;&emsp;故事是这样的，桌面版做好了，1024-1224自适应，IE7以上都兼容（无侵入定位准则）（除了没动画），好棒!此时负责视觉的晓玲同学希望也能适配移动端，可以增加一定的传播，我觉得挺好的，于是，决定通过技术手段，让活动页面能游走于桌面和移动之间，同时，保证各种动画效果棒棒哒！

&emsp;&emsp;结果，发现自己留了一个坑，拿第2屏举例，桌面版，长这样，右侧动画内容并不是完全居中的：

[![4](http://www.npm8.com/wp-content/uploads/2015/07/42.png)](http://www.npm8.com/wp-content/uploads/2015/07/42.png)

本着高度还原设计稿的原则，所有动画元素都经过测量定位，按照PSD中的参考线左上角(left/top)，结果整体左侧冒出60像素：

[![5](http://www.npm8.com/wp-content/uploads/2015/07/51.png)](http://www.npm8.com/wp-content/uploads/2015/07/51.png)

&emsp;&emsp;于是，问题来了，当移动端做响应式适配时候，由于容器内的动画元素不是居中的，所以——![经验分享：多屏复杂动画CSS技巧三则](http://mat1.gtimg.com/www/mb/images/face/1.gif)

[![6png](http://www.npm8.com/wp-content/uploads/2015/07/6png.png)](http://www.npm8.com/wp-content/uploads/2015/07/6png.png)

&emsp;后来，进行了修改，内部动画元素整体居中，外部容器桌面端做左侧60像素偏移，于是，适配移动端时候，就正好是居中的啦。

[![7](http://www.npm8.com/wp-content/uploads/2015/07/71.png)](http://www.npm8.com/wp-content/uploads/2015/07/71.png)

**②. 定位方式为居中定位**
所谓“居中定位”是相对“传统定位”而言的。Web页面中的模块、文字什么的默认都是相对于左上角堆砌的，所以，很自然地，我们在重构页面，做布局，写交互效果的时候，也都是相对左上角定位。活用元素本身的定位特性，这是很赞的也推荐这么做！但是，如果你和多元素CSS动画打交道，可能就需要改变下惯性思维了，很重要的一点就是“**从以左上角为参考点变成以中心点为参考点**”。

[![8](http://www.npm8.com/wp-content/uploads/2015/07/81.png)](http://www.npm8.com/wp-content/uploads/2015/07/81.png)[![9](http://www.npm8.com/wp-content/uploads/2015/07/9.png)](http://www.npm8.com/wp-content/uploads/2015/07/9.png)

&emsp;&emsp;我们在实现多元素动画效果时候，会出现两类角色：一是容器；二是容器里面诸多动画元素。

其中，对于容器元素，尤其在做移动端产品时候，我们很自然会让其居中定位：
```css
.container {
    position: absolute; left: 50%; top: 50%;
    transform: translate3d(-50%, -50%, 0);
}
```
这样，各种尺寸的手机，我们都能让其居中显示（大尺寸可能需要一定的缩放）。

但是，我们有没有想过让容器里面的诸多动画元素也居中定位显示呢？

用代码来解释就是从左上角定位（或右上角定位）：
```css
.example {
    position: absolute; left: 100px; top: 100px;
}
```
变成中心点定位+ `margin`偏移：
```css
.example {
    position: absolute; left: 50%; top: 50%;
    margin-left: -100px; margin-top: -100px;
}
```
有同学可能要疑问了，why? 前面一步到位不挺好的，后面这样分两步走岂不是多余？

&emsp;在大多数情况下，我们的应用场景比较单一，或只需要玩转移动端，或只需要驾驭桌面端，此时，上面两种定位的优劣是看不出来的。

但是，遇到一些复杂的应用场景，尤其涉及到容器尺寸或定位方式改变的时候，后面的定位优势就可以看出来。

比方说一开始提到的qzone5.0的例子，如果我们把容器宽度加大（实际是不会的，示意目的），如`414`像素：

[![10](http://www.npm8.com/wp-content/uploads/2015/07/10.png)](http://www.npm8.com/wp-content/uploads/2015/07/10.png)

会发现，宇航员和飞船在小行星之外了，也就是动画元素不是聚拢状态了。

所以，大家看出居中定位的优势来了没有：

1.  动画元素之间的位置关系不受容器尺寸影响；
2.  居中特性遭遇多场景时适应性更强；
还是拿去年年底做的「企业QQ-新年祝福」活动举例，第8屏：

[![11](http://www.npm8.com/wp-content/uploads/2015/07/111.png)](http://www.npm8.com/wp-content/uploads/2015/07/111.png)

&emsp;&emsp;其中，中间的“王强”和“马老板”这些数据有可能是没有的，也就是很有可能这一屏只有文字和宇航员，但同时还要保持整体垂直居中。很显然，宇航员和火箭所在的容器不能是绝对定位，否则脱离文档流，不能和上面元素保持合适垂直间距同时垂直居中。我们仍然有2种实现方法：

1.  固定容器宽度，例如`350`像素宽，然后，里面左上角定位等，本身`margin: auto`水平居中；
2.  容器不设定`width`大小，直接里面动画元素居中定位；
方法1问题在于：

1.  第7屏是类似结构，但是其动画容器宽度不是`350`像素，没法重用；
2.  当在iPhone5/iPhone5s下，屏幕`320`像素宽(小于`350`像素)，由于左上角定位，因此，整体不是居中效果；
而方法2，屏幕尺寸再小，也是居中的，只不过两侧有所剪裁。最终，移动端适配时候，我们不必关心定位问题，只要合适缩放就可以了 ![经验分享：多屏复杂动画CSS技巧三则](http://mat1.gtimg.com/www/mb/images/face/14.gif)：

[![12](http://www.npm8.com/wp-content/uploads/2015/07/121.png)](http://www.npm8.com/wp-content/uploads/2015/07/121.png)

[以上两屏示意demo戳这里](http://demo.grycheng.com/case/new-opp/)

## 结语

&emsp;&emsp;首先，大家要明白，本文所展示的三个技术技巧属于个人经验建议，注意，是建议。里面所提到的所有解决方法都有更加直观、通俗的实现，对于大多数的产品而言，技术的价值体现已经足够；同时应用场景千千万，没有什么一方通行的方法，例如居中定位准则，有时候，可能就是需要非居中定位。

&emsp;&emsp;但是，作为一个有技术追求的技术从业人员，对技术的精益求精一定是有价值的，无论是对自己，还是公司。有人可能会反驳，我们这个项目明明只会针对移动端，你还花心思考虑低配的事情，岂不是白白浪费时间和人力成本。古人有云：“不以善小而不为”，这种去粗取精的小经验虽然看上去没什么实质性成长，对眼前项目也没多少价值体现，但是积累足够多，会产生质变的，填坑的事情少了，工作也更轻松与快乐，对公司产生的价值也更大。

&emsp;&emsp;高瞻远瞩积跬步，登峰造极至千里。

&emsp;&emsp;好了，以上就是自己对于多屏CSS动画方面的一些技巧体会，希望可以对大家的学习有所帮助。当然，资历有限，要是文中有什么表述不准确的地方，欢迎指正；也欢迎针锋相对的讨论，共同成长。