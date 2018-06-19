---
title: 利用轮播原理结合hammer.js实现简洁的滑屏功能
tags:
  - hammer.js
  - hammer.js实现简洁的滑屏功能
id: 2196
categories:
  - 插件库
date: 2015-08-11 22:50:00
---

&emsp;&emsp;最近有个任务，做一个非常小的h5的应用，只有2屏，需要做横向的全屏滑动切换和一些简单的动画效果，之前做这种东西用的是fullpage.js和jquery，性能不是很好，于是就想自己动手弄一个简单的东西来实现。最后我用zepto + hammer.js 和轮播的方式解决了这个问题，效果还不错，整个页面不开启Gzip时所有资源请求的数据大小为200KB左右。这篇文章总结下这个方法的实现思路。
效果演示（[代码下载](http://www.npm8.com/wp-content/uploads/2016/03/swipe.zip)）：

![利用轮播原理结合hammer.js实现简洁的滑屏功能](http://www.npm8.com/wp-content/uploads/2016/03/2.gif)

## 1\. 实现要点

1）滑屏借鉴bootstrap的carousel插件，不过完全没有它那个复杂，只需要借鉴它的轮播实现思路即可；

2）滑屏切换的触发，跟PC不一样，PC通常都是通过元素的点击回调来触发，对于滑屏的页面，完全可以利用window的hashchange事件来处理，这样只要通过超链接设置锚点或者通过js改变location.hash就能触发切换；

3）考虑到移动还得支持手势操作，可以使用hammer.js这个手势库，API非常简单易用；

4）动画效果可以用animate.css，不过不用把它所有的代码都弄到代码里，只需要拷贝需要的动画效果相关的代码即可；

5）替代jquery，首选zepto；

6）滑屏效果使用transition动画，为了能够响应动画结束的回调，可以考虑使用transition.js，这个也是Bootstrap提供的工具，不过它默认只能跟jquery使用，要对它稍微改变一下才能跟zepto联合使用。

这些要点说的比较粗糙，后面的内容会一一详细介绍。

## 2\. html结构

空的滑屏页的html结构是这样的：
```html
<div id="container" class="container">
<section id="page-1" class="page page--1">
</section>
<section id="page-2" class="page page--2">
</section>
<section id="page-3" class="page page--3">
</section>
</div>
```
```css
html,
body {
    height: 100%;
    -webkit-tap-highlight-color: transparent;
}

.container,
.page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.page {
    overflow: hidden;
    display: none;
    -webkit-transition: -webkit-transform .4s ease;
    transition: transform .4s ease;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
```
&emsp;.container与.page初始化的时候采用绝对定位，全屏布局。每一个section.page代表一页，并且默认不显示，所有页的定位都相同，也就是说如果所有页都显示的话，这些页会重叠在一块。

demo页的html结构是：
```html
<div id="container" class="container">
<section id="page-1" class="page page--1">
<div class="page__jump"><a href="#page-2" title="">下一页</a></div>
<p class="page__num animated">1</p>
</section>
<section id="page-2" class="page page--2">
<div class="page__jump"><a href="#page-1" title="">上一页</a><a href="#page-3" title="">下一页</a></div>
<p class="page__num animated">2</p>
</section>
<section id="page-3" class="page page--3">
<div class="page__jump"><a href="#page-2" title="">上一页</a></div>
<p class="page__num animated">3</p>
</section>
</div>
```
demo相关的css就不展示了。其中animated是应用animate.css需要的，animate.css是一个动画库，github上有。

## 3\. 滑屏切换的实现思路

&emsp;&emsp;滑屏切换就是通过js控制2个要滑动的页增加和删除以下定义的这一些css类实现的：
```css
.page.page--active,
.page.page--prev,
.page.page--next {
    display: block;
}

.page.page--next,
.page.page--active.page--active-right {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
}

.page.page--prev,
.page.page--active.page--active-left {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}

.page.page--next.page--next-left,
.page.page--prev.page--prev-right,
.page.page--active {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
```
.page--active表示当前显示的页，页面初始化后，通过以下js调用，给第一页加上.page—active:
```javascript
var $activePage;

//初始化显示第一页
(function () {
    $activePage = $('#page-1');
    $activePage.addClass('page--active');
})();
```
这样页面默认就显示了第一页。以向左滑屏说明这些css的使用原理：

**第一步**，找到下一页的section，添加page--next类，将它定位当前页的右边，为滑屏做准备；

**第二步**，找到当前页的section，给它添加page--active-left，由于这个类改变了translate3D属性的值，所以当前页会往左滑动一屏；

在第二步的同时，给下一页的section，添加page--next-left，由于这个类改变了translate3D属性的值，所以下一页会往左滑动一屏；

**第三步**，在当前页跟下一页滑屏动画结束后，找到原来的当前页，移除掉page--active和page--active-left类；

在第三步的同时，找到下一页，移除掉page--next和page--next-left类，添加page--active。

**gif图说明如下：**
![利用轮播原理结合hammer.js实现简洁的滑屏功能](http://www.npm8.com/wp-content/uploads/2016/03/3-660x434.gif)
向右滑屏原理类似：

**第一步**，找到上一页的section，添加page--prev类，将它定位当前页的左边，为滑屏做准备；

**第二步**，找到当前页的section，给它添加page--active-right，由于这个类改变了translate3D属性的值，所以当前页会往右滑动一屏；

在第二步的同时，给上一页的section，添加page--prev-right，由于这个类改变了translate3D属性的值，所以上一页会往右滑动一屏；

**第三步**，在当前页跟上一页滑屏动画结束后，找到原来的当前页，移除掉page--active和page--active-right类；

在第三步的同时，找到上一页，移除掉page--prev和page--prev-right类，添加page--active。

综合以上实现原理，封装成JS函数如下：
```javascript
var TRANSITION_DURATION = 400, sliding = false; 

function getSlideType($targetPage) {
    var activePageId = $activePage.attr('id'),
            targetPageId = $targetPage.attr('id');
    return activePageId < targetPageId ? 'next' : activePageId == targetPageId ? '' : 'prev';
}

function slide(targetPageId) {
    var $targetPage = $('#' + targetPageId);
    if (!$targetPage.length || sliding) return;

    var slideType = getSlideType($targetPage),
            direction = slideType == 'next' ? 'left' : 'right';
    if (slideType == '') return;

    sliding = true;
    $targetPage.addClass('page--' + slideType);
    $targetPage[0].offsetWidth;
    $activePage.addClass('page--active-' + direction);
    $targetPage.addClass('page--' + slideType + '-' + direction);

    $activePage
            .one($.transitionEnd.end, function () {
                $targetPage.removeClass(['page--' + slideType, 'page--' + slideType + '-' + direction].join(' ')).addClass('page--active');
                $activePage.removeClass(['page--active', 'page--active-' + direction].join(' '));
                $activePage = $targetPage;
                sliding = false;
            })
            .emulateTransitionEnd(TRANSITION_DURATION);
}
```
&emsp;&emsp;由于$activePage在页面初始化的时候默认指定为第一页，在每次滑屏结束后都会更新成最新的当前页，所以调用的时候只要把目标页的ID传给slide函数即可。以上代码可能会有疑问的是：

1）$targetPage[0].offsetWidth的作用，这个代码用来触发浏览器的重绘，因为目标页原来是display: none的，如果不触发重绘的话，下一步添加css类后将看不到动画效果；

2）$.transitionEnd.end以及emulateTransitionEnd的作用，这个在下一部分说明。

## 4\. 浏览器css动画结束的回调及模拟

&emsp;&emsp;bootstrap提供了一个工具，transition.js，用来判断浏览器是否支持css动画回调事件，以及在浏览器没有在动画结束后自动触发回调的特殊情况下通过模拟的方式来手动触发回调，原先这个工具只能配合jquery使用，为了在zepto中使用，必须稍微改变一下，下面就是改变之后的代码：
```javascript
(function(){
    var transition = $.transitionEnd =  {
        end: (function () {
            var el = document.createElement('transitionEnd'),
                transEndEventNames = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                };

            for (var name in transEndEventNames) {
                if (el.style[name] !== undefined) {
                    return transEndEventNames[name];
                }
            }
            return false;
        })()
    };

    $.fn.emulateTransitionEnd = function (duration) {
        var called = false,
            _this = this,
            callback = function () {
                if (!called) $(_this).trigger(transition.end);
            };

        $(this).one(transition.end, function () {
            called = true;
        });

        setTimeout(callback, duration);
        return this;
    };
})();
```
&emsp;&emsp;$.transitionEnd.end表示当前浏览器支持的动画结束事件的名称。$.fn.emulateTransitionEnd是一个扩展了Zepto原型的一个方法，传入一个动画的过渡时间，当这个时间段过完之后，如果浏览器没有自动触发回调事件，called就始终是false，setTimeout会导致callback被调用，然后callback内部就会手动触发动画结束的回调。为什么要通过这个方式来模拟动画结束，是因为浏览器即使支持动画结束事件的回调，但是有些时候并不会触发这个事件，或者在动画结束后不能立即触发，影响回调的准确性。传入的duration应该与执行动画的元素，在css上设置的transtion-duration相同，注意以下代码中标黄的部分：
```javascript
var TRANSITION_DURATION = 400;
$activePage
            .one($.transitionEnd.end, function () {
                $targetPage.removeClass(['page--' + slideType, 'page--' + slideType + '-' + direction].join(' ')).addClass('page--active');
                $activePage.removeClass(['page--active', 'page--active-' + direction].join(' '));
                $activePage = $targetPage;
                sliding = false;
            })
            .emulateTransitionEnd(TRANSITION_DURATION);
```
```css
.page {
    overflow: hidden;
    display: none;
    -webkit-transition: -webkit-transform .4s ease;
    transition: transform .4s ease;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
```

## 5\. hashchange事件

&emsp;&emsp;PC端滑屏都是给元素添加点击事件触发的，移动端可以利用window的hashchange事件：
```javascript
$(window).on('hashchange', function (e) {
    var hash = location.hash;
    if (!hash) hash = '#page-1';
    slide(hash.substring(1));
});

location.hash = '#page-1';
```
&emsp;&emsp;hashchange事件，在js代码中通过改变loaction.hash或者是点击[下一页](#page-2)这样的超链接时，都会触发，所以只要在这个事件的回调去做滑屏切换即可。这样那些上一页和下一页的链接元素都不用加事件了。

## 6\. hammer.js使用简介

&emsp;&emsp;hammer.js是一个手势库，支持常用的手势操作，使用简单，引入它的js之后，通过以下的方式来支持手势滑屏：
```javascript
//初始化手势滑动
var container = document.getElementById('container'),
        mc = new Hammer.Manager(container),
        Swipe = new Hammer.Swipe();

mc.add(Swipe);

mc.on('swipeleft', function (e) {
    swipteTo('next', e);
});
mc.on('swiperight', function (e) {
    swipteTo('prev', e);
});

function swipteTo(slideType, e) {
    var $targetPage = $activePage[slideType]('.page');
    $targetPage.length &amp;&amp; (location.hash = '#' + $targetPage.attr('id'));
}
```
&emsp;&emsp;把整个container元素作为滑屏的stage，监听到swipeleft事件，就表示向左滑，页面应该显示下一页；监听到swiperight事件，就表示向右滑，页面应该显示下一页。

## 7\. 结束语

&emsp;&emsp;animate.css的使用就不详细介绍了，比较简单，这是它的github地址：[https://github.com/daneden/animate.css](https://github.com/daneden/animate.css)，是一个非常好用的动画库。本文把最近的一点工作经验记录了下来，技术上的东西，有的时候一些文字不能完全讲的清楚，所以我只能尽自己的能力去把一些问题讲地稍微细致一点，说的不对和有问题的尽管在评论区与我说明，我会认真查看，另外我自己对移动端这一块入门不深，您有更好的见解，欢迎与我们一起分享。