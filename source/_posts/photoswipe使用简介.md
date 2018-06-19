---
title: PhotoSwipe使用简介
tags:
  - PhotoSwipe
id: 403
categories:
  - 移动前端
date: 2015-07-14 18:07:28
---

**官方介绍**
PhotoSwipe 是专为移动触摸设备设计的相册/画廊.兼容所有iPhone、iPad、黑莓6+,以及桌面浏览器.底层实现基于HTML/CSS/JavaScript,是一款免费开源的相册产品。

**为谁而用**
让移动站点的相册体验和原生App一样的设计师和开发者。

**绝佳特性**
PhotoSwipe提供给用户一个熟悉又直观的相册交互界面。

**官方网站**
[http://www.photoswipe.com/](http://www.photoswipe.com/)

**源码示例**
[http://github.com/downloads/codecomputerlove/PhotoSwipe/code.photoswipe-3.0.5.zip](http://github.com/downloads/codecomputerlove/PhotoSwipe/code.photoswipe-3.0.5.zip)

**Github**
[https://github.com/codecomputerlove/PhotoSwipe](https://github.com/codecomputerlove/PhotoSwipe)

**在线demo**
[http://www.photoswipe.com/latest/examples/04-jquery-mobile.html](http://www.photoswipe.com/latest/examples/04-jquery-mobile.html)

**兼容特性**
PhotoSwipe兼容大量的移动设备以及所有流行的JavaScript类库/开发框架. 既有基于jQuery的版本,也有不依赖jQuery的版本，还有兼容jQuery Mobile的版本。当然，All In One，全在源码示例包里。

**如何使用**
PhotoSwipe是一个自身独立的JavaScript库，可以很方便地集成进你的网站。针对移动浏览器(webkit)进行了大量的优化,当然，对于桌面浏览器，以及jQueryMobile，在源码包内也提供了相应的版本.

**类库引用**
```html
<!-- photoswipe 之前先引用klass,如果需要提高加载速度,可以给 script 加上 defer 标记/属性-->
<script type="text/javascript" src="klass.min.js"></script>
<!-- 重要提示,如果不使用jQuery版本，在IE下面会出错，当然，使用jQuery版本，则需要引入jQuery-->
<script type="text/javascript" src="code.photoswipe-3.0.5.min.js"></script>
```
**调用代码**

```javascript
/* 添加DOMContentLoaded 事件监听,类似于jQuery的 ready函数.
默认方式 examples/01-default.html
无缩略图模式请查看.examples/09-exclusive-mode-no-thumbnails.html
*/
// PhotoSwipe.attach 方法接收3个参数(HTML元素集合,可选配置信息,可选多实例时string类型的ID)
document.addEventListener('DOMContentLoaded', function(){
//设置 PhotoSwipe绑定为 id为Gallery的容器下的所有<a>标签.点击就会激活
// 此处的对象，就是PhotoSwipe实例，可以使用相应的方法,例如 show(0),hide()等.
var myPhotoSwipe = Code.PhotoSwipe.attach( window.document.querySelectorAll('#Gallery a'), { enableMouseWheel: false , enableKeyboard: false } );
}, false);
```
**如果使用jQuery，则调用代码如下：**
```javascript
//jQuery 版,对应的js文件也需要变化
// 示例详见examples/02-jquery.html
$(document).ready(function(){
// 此处的对象，就是PhotoSwipe实例，可以使用相应的方法,例如 show(0),hide()等.
var myPhotoSwipe = $("#Gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
});
```
**HTML代码**
```html
<!-- ul li 之类是用于显示缩略图的,也可以根据需要调整.<a>下面的<img> 元素,即为缩略图,如果不需要，则src设置为空即可 -->
<ul id="Gallery">
<li><a href="images/full/01.jpg"><img src="images/thumb/01.jpg" alt="Image 01" /></a></li>
<li><a href="images/full/02.jpg"><img src="images/thumb/02.jpg" alt="Image 02" /></a></li>
<li><a href="images/full/03.jpg"><img src="images/thumb/03.jpg" alt="Image 03" /></a></li>
<li><a href="images/full/04.jpg"><img src="images/thumb/04.jpg" alt="Image 04" /></a></li>
<li><a href="images/full/05.jpg"><img src="images/thumb/05.jpg" alt="Image 05" /></a></li>
<li><a href="images/full/06.jpg"><img src="images/thumb/06.jpg" alt="Image 06" /></a></li>
</ul>
```
**参数说明**

```javascript
allowUserZoom: 允许用户双击放大/移动方式查看图片. 默认值 = true
autoStartSlideshow: 当PhotoSwipe激活后,自动播放幻灯片. 默认值 = false
allowRotationOnUserZoom: 只有 iOS 支持 - 允许用户在缩放/平移模式下 用手势旋转图像. 默认值 = false
backButtonHideEnabled: 按返回键隐藏相册幻灯片. 主要是 Android 和 Blackberry使用. 支持 BB6, Android v2.1, iOS 4 以及更新版本. 默认值 = true
captionAndToolbarAutoHideDelay: 标题栏和工具栏自动隐藏的延迟时间. 默认值为 = 5000(毫秒). 如果设为 0 则不会自动隐藏(tap/单击切换显隐)
captionAndToolbarFlipPosition: 标题栏和工具栏切换位置(让 caption显示在底部而 toolbar显示在顶部). 默认值 = false
captionAndToolbarHide: 隐藏 标题栏和工具栏. 默认值 = false
captionAndToolbarOpacity: 标题栏和工具栏 的透明度(0-1). 默认值 = 0.8
captionAndToolbarShowEmptyCaptions: 即使当前图片的标题是空,也显示标题栏. 默认值 = true
cacheMode: 缓存模式,Code.PhotoSwipe.Cache.Mode.normal (默认,正常) 或者 Code.PhotoSwipe.Cache.Mode.aggressive(激进,积极). 决定 PhotoSwipe 如何管理图片缓存 cache.
Aggressive 模式将会积极地地设置非 "当前，上一张,下一张"的图片为空的类型. 对于老版本iOS 浏览器下的大图片内存溢出将会很有用. 大多数情况下，normal模式就可以了。
doubleTapSpeed: 双击的最大间隔. 默认值 = 300(毫秒)
doubleTapZoomLevel: 当用户双击的时候,放大的倍数, 默认的 "zoom-in"(拉近) 级别. 默认值 = 2.5
enableDrag: 允许拖动上一张/下一张图片到当前界面. 默认值 = true
enableKeyboard: 允许键盘操作(左右箭头切换，Esc退出,Enter自动播放,空格键 显/隐标题栏/退出). 默认 = true
enableMouseWheel: 允许鼠标滚轮操作. 默认 = true
fadeInSpeed: 淡入效果元素的速度(持续时间),毫秒. 默认 = 250
fadeOutSpeed: 淡出效果元素的速度(持续时间),毫秒. 默认 = 250
imageScaleMethod: 图片缩放方法(模式). 可选值: "fit", "fitNoUpscale" 和 "zoom". 模式"fit" 保证图像适应屏幕. "fitNoUpscale" 和 "fit"类似但是不会放大图片. "zoom"将图片全屏, 但有可能图片缩放不是等比例的. 默认 = "fit"
invertMouseWheel: 反转鼠标滚轮。默认情况下,鼠标向下滚动将切换到下一张,向上切换到上一张 . 默认 = false
jQueryMobile: 指示 PhotoSwipe 是否集成进了 jQuery Mobile 项目. 默认情况下, PhotoSwipe will try and work this out for you
jQueryMobileDialogHash: jQuery Mobile的window,dialog页面 所使用的hash标签。 默认值 = "&amp;ui-state=dialog"
loop: 相册是否自动循环. 默认 = true
margin: 两张图之间的间隔,单位是像素. 默认 = 20
maxUserZoom: 最大放大倍数. 默认 = 5.0 (设置为0将被忽略)
minUserZoom: 图像最小的缩小倍数. 默认 = 0.5 (设置为0将会忽略)
mouseWheelSpeed: 响应鼠标滚轮的灵敏度. 默认 = 500(毫秒)
nextPreviousSlideSpeed: 当点击上一张,下一张按钮后,延迟多少毫秒执行切换. 默认 = 0 (立即切换)
preventHide: 阻止用户关闭 PhotoSwipe. 同时也会隐藏 工具栏上的"close"关闭按钮. 在独享的页面使用 (示例是源码中的 examples/08-exclusive-mode.html). 默认 = false
preventSlideshow: 阻止自动播放模式. 同时也会隐藏工具栏里的播放按钮. 默认 = false
slideshowDelay: 自动播放模式下，多长时间播放下一张. Default = 3000(毫秒)
slideSpeed: 图片滑进视图的时间. 默认 = 250(毫秒)
swipeThreshold: 手指滑动多少像素才触发一个 swipe 手势事件. 默认 = 50
swipeTimeThreshold: 定义触发swipe(滑动)手势的最大毫秒数,太慢了则不会触发滑动，只会拖动当前照片的位置. 默认 = 250
slideTimingFunction: 滑动时的 Easing function . 默认 = "ease-out"
zIndex: 初始的zIndex值. 默认 = 1000
enableUIWebViewRepositionTimeout: 检查设备的方向是否改变。默认 = false
uiWebViewResetPositionDelay: 定时检查设备的方向是否改变的时间 默认 = 500(毫秒)
preventDefaultTouchEvents: 阻止默认的touch事件，比如页面滚动。 默认 = true
target: 必须是一个合法的DOM元素(如DIV)。默认是window(全页面)。而如果是某个低级别的DOM，则在DOM内显示，可能非全屏。
```
**自定义函数**
```javascript
getToolbar: function(){
/*返回 要在Toolbar之中显示的HTML字符串*/
},
getImageSource: function(el){
/* 告诉 gallery如何获取图片的src,
默认情况下,gallery假设你使用<a>标签包装了<img>缩略图，而<a>标签的href属性即为完整图片的URL。
此时可以使用本方法来返回对应元素的图片的路径。可以是各种各样的。比如rel属性什么的。有jQuery那就更简单了。
*/
return el.getAttribute('rel');
},
getImageCaption: function(el){
/**
如同 getImageSource 方法一样，此方法返回图片的标题，默认情况下gallery查找图片的alt 属性。
*/
},
getImageMetaData: function(el){
/**
如果你监听了 onDisplayImage,那么你可以通过此函数获取额外的元信息.并在 onDisplayImage中使用
*/
return {
longDescription: el.getAttribute(el, 'data-long-description')
}
}
```

**针对android 手机一次点按，会引起一层关闭后,底上的层依然会触发点击事件的问题，我们的解决方案如下:**
```javascript
// 在android 手机上多个层次触发点击,我们采用的是用定时器进行拦截
var event_timeout = 500;// 预防多次事件触发
// 阻止短时间内连续事件
var multiClickPrevent = false;
function preventMultiClick(){
if(multiClickPrevent){
return false;
}
multiClickPrevent = true;
window.setTimeout(function(){
multiClickPrevent = false;
},event_timeout);
return true;
};

// 适配浏览器
var useragent = navigator.userAgent;
var likeIOS = useragent.match(/iPad|iPhone|iPod/i);
var likeAndroid = useragent.match(/android/i);
var specialClick = "click";
if(likeIOS){
specialClick = "touchstart click";
} else if(likeAndroid){
specialClick = "touchstart click";
}

// 示例
$(".t_right").live(specialClick,function(){
if(preventMultiClick()){
// 执行其他操作
} else {
// else 就是拒绝操作啦,可以直接返回 false 之类的
return false;
}
});
// 示例
$("body").live(specialClick,function(){
if(preventMultiClick()){
// 执行其他操作
}
});
```