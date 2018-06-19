---
title: 轻松使用px为单位开发移动端页面
tags:
  - px开发移动端页面
  - 轻松使用px为单位开发移动端页面
id: 2107
categories:
  - 移动前端
date: 2016-01-28 23:59:13
---

&emsp;&emsp;研究移动端页面已经有许久了，一直执着于rem来开发，不谈性能怎么样，单从工作效率上看影响了不少，首先要固定设计稿的宽度，一般都是固定在640px，然后在根据根目录的字体大小来计算出每个元素的rem的值，无疑在开发中切图，每个元素都要去计算一边，是不是感觉很麻烦，有没有一种方法，像切PC端页面一样，切了直接写css，不用去计算这么麻烦，答案是肯定有的！好吧，先给大家看一下，我以前用rem来开发的技术文章吧(由于之前博客的迁移，博客地址已经改变，请自行去搜索栏进行搜索相应的文章)！

**rem相关资料文档：**
[手机端页面rem自适应脚本]

[CSS中常用的字体单位：px、em、rem和%的区别]

[使用rem布局手机页面（自适应各种分辨率手机）]

[用rem做响应式开发]

[详解移动端rem变革]

[使用rem设置文字大小]

&emsp;&emsp;好了，废话不多说，进入今天的正题，轻松使用px开发移动端页面！就在前天浏览微信的“天天酷跑”的活动主题的时，发现他全部是采用的px的单位，于是便仔细看了他的核心js代码，猛然一看，恍然大悟！天天酷跑活动页面地址：[http://iwan.qq.com/act/kp3dxz/index.htm?&amp;ptag=4_4.5.5.10729_wxf#](http://iwan.qq.com/act/kp3dxz/index.htm?&amp;ptag=4_4.5.5.10729_wxf#)

&emsp;&emsp;上面的具体代码大家可以前往自行研究，下面我把关键性的代码拷贝出来，一看就懂，以后大家只需要直接引入这些js代码就ok了，就不管他设计稿是640、720、750了，直接拿过来直接切，然后修改参数就大功告成了，就完全可以当pc端页面来切了，并且还适应pc端和移动端，万事大吉啊！关键是还适配各个手机，各个分辨率，不用它感觉很浪费，用了它又感觉虚伪地牛逼着，其实也就几行代码的事情，一看就懂只是你没有去深入的往这方面研究罢了！

meta默认设置（其他的meta就根据项目需求定）：
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```
CSS代码：
```css
.wrap{width:320px;margin:0 auto;}
//width：320px，可以根据当前设计稿来定，可以是640、750等尺寸
```
下面一段js代码放入网页头部,例如：设计稿尺寸是640只需要把320全部改成640就ok了：
```javascript
(function(){
	var width = 750, pw = parseInt(window.screen.width), scale = pw / width, ua = navigator.userAgent;
	if(/Android (\d+\.\d+)/.test(ua)){
		var version = parseFloat(RegExp.$1);
		if(version > 2.3){
			document.write('<meta name="viewport" content="width=' + width + ',minimum-scale=' + scale + ',maximum-scale=' + scale + ',target-densitydpi=device-dpi" />');
		}else{
			document.write('<meta name="viewport" content="width=' + width + ',target-densitydpi=device-dpi" />');
		}
	}else{
		document.write('<meta name="viewport" content="width=' + width + ',user-scalable=no,target-densitydpi=device-dpi" />');
	}
})();
```
&emsp;&emsp;为兼容性考虑，在页面下面加入下面js，其中wrap为包裹结构最外层的ID，wrap给它320的宽度居中就ok了：
```javascript
if(navigator.appVersion.indexOf('Android') != -1){
	document.addEventListener('DOMContentLoaded', function(e){
 		document.getElementById('main').style.zoom = e.target.activeElement.clientWidth / 750;
	});
}
```