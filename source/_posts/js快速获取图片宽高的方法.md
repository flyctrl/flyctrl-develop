---
title: JS快速获取图片宽高的方法
tags:
  - js快速获取图片宽高
id: 1052
categories:
  - JS/Jq
date: 2015-07-31 13:40:34
---

快速获取图片的宽高其实是为了预先做好排版样式布局做准备，通过快速获取图片宽高的方法比onload方法要节省很多时间，甚至一分钟以上都有可能，并且这种方法适用主流浏览器包括IE低版本浏览器。

## 一、简陋的获取图片方式

```javascript
// 图片地址 后面加时间戳是为了避免缓存
var img_url = ‘http://www.qttc.net/static/upload/2013/13643608813441.jpg?’+Date.parse(new Date());
// 创建对象
var img = new Image();
// 改变图片的src
img.src = img_url;
// 打印
alert(‘width:’+img.width+‘,height:’+img.height);
```
结果如下：

[![1](http://www.npm8.com/wp-content/uploads/2015/07/123.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/123.jpg)

宽高都是0的这个结果很正常，因为图片的相关数据都没有被加载前它的宽高默认就是0 于是可以这么优化！

&nbsp;

## 二、onload后在打印

```javascript
// 图片地址 后面加时间戳是为了避免缓存
var img_url = ‘http://www.qttc.net/static/upload/2013/13643608813441.jpg?’+Date.parse(new Date());
// 创建对象
var img = new Image();
// 改变图片的src
img.src = img_url;
// 加载完成执行
img.onload = function(){
// 打印
alert(‘width:’+img.width+‘,height:’+img.height);
};
```
结果如下:

[![2](http://www.npm8.com/wp-content/uploads/2015/07/211.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/211.jpg)

通过onload就能获取到图片的宽高了。但onload大一点的图通常都比较慢，不实用，但只要图片被浏览器缓存，那么图片加载几乎就不用等待即可触发onload，我们要的是占位符。所以有些人通过缓存获取也可以这么写。

&nbsp;

## 三、通过complete与onload一起混合使用

为了测试缓存效果，注意以下测试图片的url都不加时间戳
```javascript
// 图片地址
var img_url = ‘http://www.qttc.net/static/upload/2013/13643608813441.jpg’;
// 创建对象
var img = new Image();
// 改变图片的src
img.src = img_url;
// 判断是否有缓存
if(img.complete){
// 打印
alert(‘from:complete : width:’+img.width+‘,height:’+img.height);
}else{
// 加载完成执行
img.onload = function(){
// 打印
alert(‘from:onload : width:’+img.width+‘,height:’+img.height);
};
}
```
第一次执行，永远是onload触发

[![3](http://www.npm8.com/wp-content/uploads/2015/07/36.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/36.jpg)

你再刷新，几乎都是缓存触发了

[![4](http://www.npm8.com/wp-content/uploads/2015/07/45.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/45.jpg)

从缓存里读取图片的宽高不用说，非常方便快捷，今天我们要解决的是没有缓存而又快速的相比onload更快的方式去获取图片的宽高。我们常常知道有些图片虽然没有完全down下来，但是已经先有占位符，然后一点一点的加载。既然有占位符那应该是请求图片资源服务器响应后返回的。可服务器什么时候响应并返回宽高的数据没有触发事件，比如onload事件。于是催生了第四种方法

四、通过定时循环检测获取

看看以下例子，为了避免从缓存里读取数据，每一次请求都带时间戳：
```javascript
// 图片地址
var img_url = ‘http://www.qttc.net/static/upload/2013/13643608813441.jpg?’+Date.parse(new Date());
// 创建对象
var img = new Image();
// 改变图片的src
img.src = img_url;
// 定时执行获取宽高
var check = function(){
document.body.innerHTML += ‘
from:check : width:‘+img.width+’,height:‘+img.height+’
‘;
};
var set = setInterval(check,40);
// 加载完成获取宽高
img.onload = function(){
document.body.innerHTML += ‘
from:onload : width:‘+img.width+’,height:‘+img.height+’
‘;
// 取消定时获取宽高
clearInterval(set);
};
```
FireFox

[![5](http://www.npm8.com/wp-content/uploads/2015/07/53.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/53.jpg)

IE7 8 9 10

[![6](http://www.npm8.com/wp-content/uploads/2015/07/62.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/62.jpg)

Chrome

[![7](http://www.npm8.com/wp-content/uploads/2015/07/73.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/73.jpg)

通过以上测试，我们发现定时检测图片宽高的方式要比onload快多了，打印的行数越多表示onload时间越长，40毫秒执行一次，基本100毫秒内就能获取图片的宽高，chrome甚至在第一次循环的时候就已经获得数据。从以上数据来分析，其实我们可以在定时函数里判断只要图片的宽高都大于0就表示已经获得正确的图片宽高。我们把时间打上，来看看通过定时获取宽高或者onload获取宽高所需要多少时间。
```javascript
// 记录当前时间戳
var start_time = new Date().getTime();
// 图片地址
var img_url = ‘http://b.zol-img.com.cn/desk/bizhi/image/2/2560×1600/1365477614755.jpg?’+start_time;
// 创建对象
var img = new Image();
// 改变图片的src
img.src = img_url;
// 定时执行获取宽高
var check = function(){
// 只要任何一方大于0
// 表示已经服务器已经返回宽高
if(img.width>0 || img.height>0){
var diff = new Date().getTime() - start_time;
document.body.innerHTML += ‘
from:check : width:‘+img.width+’,height:‘+img.height+’, time:‘+diff+’ms
‘;
clearInterval(set);
}
};
var set = setInterval(check,40);
// 加载完成获取宽高
img.onload = function(){
var diff = new Date().getTime() - start_time;
document.body.innerHTML += ‘from:onload : width:’+img.width+‘,height:’+img.height+‘, time:’+diff+‘ms’;
};
```
FireFox：

[![8](http://www.npm8.com/wp-content/uploads/2015/07/82.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/82.jpg)

IE

[![9](http://www.npm8.com/wp-content/uploads/2015/07/92.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/92.jpg)

Chrome

[![10](http://www.npm8.com/wp-content/uploads/2015/07/101.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/101.jpg)

这是一张2560 * 1600大小的图片，各浏览器执行结果都能看到通过快速获取图片大小的方法几乎都在200毫秒以内，而onload至少五秒以上，这差别之大说明快速获取图片宽高非常实用。