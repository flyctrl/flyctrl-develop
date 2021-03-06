---
title: jQuery延迟加载图片插件(懒加载插件 LazyLoad)
tags:
  - jq LazyLoad
  - LazyLoad.js
  - 延迟加载图片插件
  - 懒加载插件
id: 1850
categories:
  - 插件库
date: 2015-10-22 10:00:54
---

**Lazy Load** 是一个用 JavaScript 编写的 jQuery 插件. 

它可以**延迟加载长页面中的图片**. 在浏览器可视区域外的图片不会被载入, 直到用户将页面滚动到它们所在的位置. 这与图片预加载的处理方式正好是相反的。

在包含很多大图片长页面中延迟加载图片可以加快页面加载速度. 浏览器将会在加载可见图片之后即进入就绪状态. 在某些情况下还可以帮助降低服务器负担。

![jquery-lazy-load-plugin](http://www.npm8.com/wp-content/uploads/2015/10/jquery-lazy-load-plugin.png)

#### <span style="color: #993300;">使用方法：</span>

Lazy Load 依赖于 jQuery. 请将下列代码加入页面 head 区域:
```html
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.lazyload.js" type="text/javascript"></script>
```
你必须修改 HTML 代码. 在 src 属性中设置展位符图片, demo 页面使用 1x1 像素灰色 GIF 图片. 并且需要将真实图片的 URL 设置到 data-original 属性. 这里可以定义特定的 class 以获得需要延迟加载的图片对象. 

通过这种方法你可以简单地控制插件绑定。
```html
<img class="lazy" src="img/grey.gif" data-original="img/example.jpg"  width="640" heigh="480">
```
处理图片的代码如下:
```javascript
$("img.lazy").lazyload();
```
这将使所有 class 为 lazy 的图片将被延迟加载。

&nbsp;

#### 设置敏感度

几乎所有浏览器的 JavaScript 都是激活的. 然而可能你仍希望能在不支持 JavaScript 的客户端展示真实图片. 当浏览器不支持 JavaScript 时优雅降级, 你可以将真实的图片片段在写`<noscript>`标签内。
```html
<img class="lazy" src="img/grey.gif" data-original="img/example.jpg"  width="640" heigh="480">
<noscript><img src="img/example.jpg" width="640" heigh="480"></noscript>
```
可以通过 CSS 隐藏占位符：
```css
.lazy {
  display: none;
}
```
在支持 JavaScript 的浏览器中, 你必须在 DOM ready 时将占位符显示出来, 这可以在插件初始化的同时完成。
```javascript
$("img.lazy").show().lazyload();
```
这些都是可选的, 但如果你希望插件平稳降级这些都是应该做的。

&nbsp;

#### 设置延时度

默认情况下图片会出现在屏幕时加载. 如果你想提前加载图片, 可以设置 threshold 选项, 设置 threshold 为 200 令图片在距离屏幕 200 像素时提前加载。
```$("img.lazy").lazyload({ threshold : 200 });```
&nbsp;

#### 占位图片

你还可以设定一个占位图片并定义事件来触发加载动作. 这时需要为占位图片设定一个 URL 地址. 透明, 灰色和白色的 1x1 象素的图片已经包含在插件里面。

&nbsp;

#### 事件触发加载

事件可以是任何 jQuery 时间, 如: click 和 mouseover. 你还可以使用自定义的事件, 如: sporty 和 foobar. 默认情况下处于等待状态, 直到用户滚动到窗口上图片所在位置. 在灰色占位图片被点击之前阻止加载图片, 你可以这样做:
```javascript
$("img").lazyload({
	placeholder : "img/grey.gif",
	event : "click"
});
```
&nbsp;

#### <span style="color: #993300;">使用特效</span>

当图片完全加载的时候, 插件默认地使用 show() 方法来将图显示出来. 其实你可以使用任何你想用的特效来处理. 下面的代码使用 FadeIn 效果. 这是效果演示页面。
```javascript$("img.lazy").lazyload({ 
    effect : "fadeIn"
});
```
&nbsp;

#### 图片在容器里面

你可以将插件用在可滚动容器的图片上, 例如带滚动条的 DIV 元素. 你要做的只是将容器定义为 jQuery 对象并作为参数传到初始化方法里面。
```javascript
#container {
    height: 600px;
    overflow: scroll;
}
$("img.lazy").lazyload({         
     container: $("#container")
});
```
&nbsp;

#### 当图片不顺序排列

滚动页面的时候, Lazy Load 会循环为加载的图片.

在循环中检测图片是否在可视区域内. 

默认情况下在找到第一张不在可见区域的图片时停止循环. 图片被认为是流式分布的, 图片在页面中的次序和 HTML 
代码中次序相同. 但是在一些布局中, 这样的假设是不成立的. 不过你可以通过 failurelimit 选项来控制加载行为。
```javascript
$("img.lazy").lazyload({ 
    failure_limit : 10
});
```
将 failurelimit 设为 10 令插件找到 10 个不在可见区域的图片是才停止搜索. 如果你有一个猥琐的布局, 请把这个参数设高一点。

&nbsp;

#### 延迟加载图片

Lazy Load 插件的一个不完整的功能, 但是这也能用来实现图片的延迟加载.

下面的代码实现了页面加载完成后再加载. 页面加载完成 5 秒后, 指定区域内的图片会自动进行加载. 

这是延迟加载演示页面。
```javascript
$(function() {          
    $("img:below-the-fold").lazyload({
        event : "sporty"
    });
});
$(window).bind("load", function() { 
    var timeout = setTimeout(function() {$("img.lazy").trigger("sporty")}, 5000);
});
```
&nbsp;

#### 加载隐藏的图片

可能在你的页面上埋藏可很多隐藏的图片. 比如插件用在对列表的筛选, 你可以不断地修改列表中各条目的显示状态. 为了提升性能, Lazy Load 默认忽略了隐藏图片. 如果你想要加载隐藏图片, 请将 skip_invisible 设为 false
```javascript
$("img.lazy").lazyload({ 
    skip_invisible : false
});
```
&nbsp;

#### 参数应用设置

```javascript
$("img.lazy").lazyload({
  placeholder : "img/grey.gif", //用图片提前占位
    // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
  effect: "fadeIn", // 载入使用何种效果
    // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
  threshold: 200, // 提前开始加载
    // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
  event: 'click',  // 事件触发时才加载
    // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
  container: $("#container"),  // 对某容器中的图片实现效果
    // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
  failurelimit : 10 // 图片排序混乱时
     // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
});
```

[下载lazyload](http://www.npm8.com/wp-content/uploads/2015/10/jqlazyload.zip)