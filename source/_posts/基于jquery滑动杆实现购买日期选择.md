---
title: 基于jQuery滑动杆实现购买日期选择
tags:
  - jq日期选择
  - sidebarDateSelect
id: 1639
categories:
  - 插件库
date: 2015-09-15 16:34:37
---

&emsp;&emsp;这是一款基于jQuery的滑动杆购买日期选择插件，它的外观仿的是阿里云的服务器购买日期选择界面。这款jQuery插件非常适合在一些虚拟产品购买页面上使用，它可以帮助你的用户快速选择产品的购买日期，十分方便。效果图如下：

[![8](http://www.npm8.com/wp-content/uploads/2015/09/8-660x325.png)](http://www.npm8.com/wp-content/uploads/2015/09/8.png)

实现的代码。

html代码：
```html
<center>
<div class="slider-date" id="slider-date-1">

<!--底层-->
<ul class="slider-bg clearfix">
<li>1</li>
<li>2</li>
<li>3</li>
<li>4</li>
<li>5</li>
<li>6</li>
<li>7</li>
<li>8</li>
<li>9</li>
<li>1年</li>
<li>2年</li>
<li>3年</li>
</ul>

<!--互动层-->
<div class="slider-bar">
<ul class="slider-bg clearfix">
<li>1<span>1个月</span></li>
<li>2<span>2个月</span></li>
<li>3<span>3个月</span></li>
<li>4<span>4个月</span></li>
<li>5<span>5个月</span></li>
<li>6<span>6个月</span></li>
<li>7<span>7个月</span></li>
<li>8<span>8个月</span></li>
<li>9<span>9个月</span></li>
<li>1年<span>1年</span></li>
<li>2年<span>2年</span></li>
<li>3年<span>3年</span></li>
</ul>
<!--滑块按钮-->
<a href="javascript:;" class="slider-bar-btn"><i></i><i></i></a>
</div>

</div>

<br />
<br />

<div class="slider-date" id="slider-date-2">

<!--底层-->
<ul class="slider-bg clearfix">
<li>1</li>
<li>2</li>
<li>3</li>
<li>4</li>
<li>5</li>
<li>6</li>
<li>7</li>
<li>8</li>
<li>9</li>
<li>1年</li>
<li>2年</li>
<li>3年</li>
</ul>

<!--互动层-->
<div class="slider-bar">
<ul class="slider-bg clearfix">
<li>1<span>1个月</span></li>
<li>2<span>2个月</span></li>
<li>3<span>3个月</span></li>
<li>4<span>4个月</span></li>
<li>5<span>5个月</span></li>
<li>6<span>6个月</span></li>
<li>7<span>7个月</span></li>
<li>8<span>8个月</span></li>
<li>9<span>9个月</span></li>
<li>1年<span>1年</span></li>
<li>2年<span>2年</span></li>
<li>3年<span>3年</span></li>
</ul>
<!--滑块按钮-->
<a href="javascript:;" class="slider-bar-btn"><i></i><i></i></a>
</div>

</div>

<br />
<br />

<div class="slider-date" id="slider-date-3">

<!--底层-->
<ul class="slider-bg clearfix">
<li>1</li>
<li>2</li>
<li>3</li>
<li>4</li>
<li>5</li>
<li>6</li>
<li>7</li>
<li>8</li>
<li>9</li>
<li>1年</li>
<li>2年</li>
<li>3年</li>
</ul>

<!--互动层-->
<div class="slider-bar">
<ul class="slider-bg clearfix">
<li>1<span>1个月</span></li>
<li>2<span>2个月</span></li>
<li>3<span>3个月</span></li>
<li>4<span>4个月</span></li>
<li>5<span>5个月</span></li>
<li>6<span>6个月</span></li>
<li>7<span>7个月</span></li>
<li>8<span>8个月</span></li>
<li>9<span>9个月</span></li>
<li>1年<span>1年</span></li>
<li>2年<span>2年</span></li>
<li>3年<span>3年</span></li>
</ul>
<!--滑块按钮-->
<a href="javascript:;" class="slider-bar-btn"><i></i><i></i></a>
</div>

</div>
</center>
```
css代码：
```css
ul, li {
padding: 0;
margin: 0;
list-style-type: none;
}

.clearfix:after {
display: block;
content: "";
clear: both;
}

.slider-date {
height: 36px;
line-height: 36px;
background: #e8e8e8;
display: inline-block;
position: relative;
}

.slider-date .slider-bg li {
position: relative;
float: left;
width: 50px;
border-left: solid 1px #ddd;
font-size: 12px;
text-align: center;
}

.slider-date .slider-bg span {
display: none;
}

.slider-date .slider-bg li:first-child {
border-left: none;
}

.slider-date .slider-bar {
position: absolute;
top: -2px;
left: 0;
overflow: hidden;
height: 40px;
width: 50px;
}

.slider-date .slider-bar ul {
margin-top: 1px;
background: #43bfe3;
color: #fff;
height: 36px;
width: 1000px;
}

.slider-date .slider-bar-btn {
line-height: 40px;
text-align: center;
position: absolute;
top: -2px;
right: 0px;
display: block;
width: 16px;
height: 40px;
background: #2dacd1;
color: #fff;
}

.slider-date .slider-bar-btn i {
display: inline-block;
margin: 12px 2px;
width: 2px;
height: 12px;
background: #68c3de;
}
```
js代码：
```javascript
//滑动插件 by - mantou qq:676015863
; (function ($) {
$.fn.sliderDate = function (setting) {
var defaults = {
callback: false //默认回调函数为false
}
//如果setting为空，就取default的值
var setting = $.extend(defaults, setting);
this.each(function () {
//插件实现代码
//var $sliderDate = $(".slider-date");
var $sliderDate = $(this);
var $sliderBar = $sliderDate.find(".slider-bar");
var $sliderBtn = $sliderDate.find(".slider-bar-btn");
var liWid = 50 + 1; //单个li的宽度

//滚动指定的位置
var sliderToDes = function (index) {

//最大不能超过11
if (index > 11) {
index = 11;
}

//最小不能小于 0
if (index < 0) {
index = 0;
}

//背景动画
$sliderBar.animate({
"width": liWid * (index + 1)
}, 500);

//执行回调
if (setting.callback) {
setting.callback(index);
}

};

//点击 - 滚动到指定位置
$sliderDate.on('click', "li", function (e) {
//执行滚动方法
sliderToDes($(this).index());
});

//拖动 - 滚动到指定位置
$sliderBtn.on('mousedown', function (e) {
var $this = $(this);
var pointX = e.pageX - $this.parent().width();
var wid = null;

//拖动事件
$(document).on('mousemove', function (ev) {
wid = ev.pageX - pointX
if (wid > 20 &amp;&amp; wid < 620) {
$sliderBar.css("width", wid);
}
}).on('mouseup', function (e) {
$(this).off('mousemove mouseup');
var index = Math.ceil(wid / liWid) - 1;
sliderToDes(index);
});
});
});
}
})(jQuery);

$(function () {
function a(index) {
console.log(index + 1);
}
$("#slider-date-1").sliderDate({ callback: a });

function b(index) {
console.log(index + 1);
}
$("#slider-date-2").sliderDate({ callback: b });

function c(index) {
console.log(index + 1);
}
$("#slider-date-3").sliderDate({ callback: c });
});
```
[查看演示](http://demo.grycheng.com/case/sidebarDateSelect/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/09/sidebarDateSelect.zip)